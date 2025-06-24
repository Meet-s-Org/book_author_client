/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_AUTHOR, ADD_BOOK } from "@/graphql/mutations";
import { GET_AUTHORS } from "@/graphql/queries";

type Props = {
  type: "author" | "book";
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
};

export default function AddModal({ type, open, onClose, onRefresh }: Props) {
    const [formData, setFormData] = useState<any>({});
    
    const {
        data: authorsData,
        refetch: refetchAuthors,
        loading: loadingAuthors,
    } = useQuery(GET_AUTHORS, {
        skip: type !== "book" || !open,
    });
    
    useEffect(() => {
        if (open && type === "book") {
            refetchAuthors(); // force fetch when modal opens
        }
    }, [open, type, refetchAuthors]);


    const [createAuthor] = useMutation(ADD_AUTHOR);
    const [createBook] = useMutation(ADD_BOOK);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleCreate = async () => {
    try {

      if (type === "author") {
        await createAuthor({
          variables: {
            input: {
              name: formData.name,
              biography: formData.biography,
              bornDate: formData.bornDate,
            },
          },
        });
      } else {
        await createBook({
          variables: {
            input: {
              title: formData.title,
              description: formData.description,
              published_date: formData.published_date,
              author_id: authorsData?.getAuthors?.data?.find((record: any) => record.name === formData.author)?.id,
            },
          },
        });
      }

      onRefresh();
      onClose();
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Add New {type}</h2>
        <form className="space-y-4">
          {(type === "author"
            ? ["name", "biography", "bornDate"]
            : ["title", "description", "published_date", "author"]
          ).map((key) => {
            const isDateField = key.toLowerCase().includes("date");

            return (
              <div key={key} className="form-control w-full mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                {key === "author" ? (
                    <select
                        name="author"
                        value={formData.author || ""}
                        onChange={handleChange}
                        disabled={loadingAuthors}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="" disabled>
                            {loadingAuthors ? "Loading authors..." : "Select author"}
                        </option>
                        {authorsData?.getAuthors?.data?.map((author: any) => (
                            <option key={author.id} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                    ) : (
                    <input
                        type={isDateField ? "date" : "text"}
                        name={key}
                        value={formData[key] || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                )}
              </div>
            );
          })}
        </form>

        <div className="mt-6 flex justify-end gap-3">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
