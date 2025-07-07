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

  const { data: authorsData, refetch: refetchAuthors, loading: loadingAuthors } = useQuery(GET_AUTHORS, {
    skip: type !== "book" || !open,
  });

  useEffect(() => {
    if (open && type === "book") {
      refetchAuthors();
    }
  }, [open, type, refetchAuthors]);

  const [createAuthor] = useMutation(ADD_AUTHOR);
  const [createBook] = useMutation(ADD_BOOK);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
              author_id: authorsData?.getAuthors?.data?.find(
                (record: any) => record.name === formData.author
              )?.id,
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
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-lg">
        <h4 className="font-bold text-xl mb-4 text-primary">
          Add New {type === "author" ? "Author" : "Book"}
        </h4>

        <form className="space-y-4">

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-8">
              <legend className="fieldset-legend capitalize p-8">{type === "author" ? 'Author Details..' : 'Book Details..'}</legend>

            {(type === "author"
              ? ["name", "biography", "bornDate"]
              : ["title", "description", "published_date", "author"]
            ).map((key) => {
              const isDateField = key.toLowerCase().includes("date");
              const isAreaField = key.toLowerCase().includes("biography") || key.toLowerCase().includes("description");

              return (
                <div key={key}>
                  <label className="label w-full capitalize"><span>{key.replace(/_/g, " ")}</span></label>

                  {key === "author" ? (
                    
                    <select className="select select-ghost select-sm" name="author" value={formData.author || ""} onChange={handleChange} disabled={loadingAuthors}>
                      <option disabled={true} value="">{loadingAuthors ? "Loading authors..." : "Select Author"}</option>
                      {authorsData?.getAuthors?.data?.map((author: any) => (
                        <option key={author.id} value={author.name}>
                          {author.name}
                        </option>
                      ))}
                    </select>

                  ) : (
                    isAreaField ?
                      <textarea
                        name={key}
                        className="textarea textarea-sm textarea-ghost"
                        placeholder={`Enter ${key.replace(/_/g, " ")}`}
                        onChange={handleChange}
                        value={formData[key] || ""}
                      />
                      :
                      <input
                        type={isDateField ? "date" : "text"}
                        name={key}
                        className="input input-sm input-ghost"
                        placeholder={`Enter ${key.replace(/_/g, " ")}`}
                        onChange={handleChange}
                        value={formData[key] || ""}
                      />
                  )}
                </div>
              );
            })}
          </fieldset>
        </form>

        <div className="modal-action mt-6">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCreate}>
            Add
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
