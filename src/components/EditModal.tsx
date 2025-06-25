/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR, UPDATE_BOOK } from "@/graphql/mutations";

type Props = {
  record: any;
  type: "author" | "book";
  onClose: () => void;
  open: boolean;
  onRefresh: () => void;
};

export default function EditModal({ record, type, open, onClose, onRefresh }: Props) {
  const [formData, setFormData] = useState({ ...record });

  useEffect(() => {
    setFormData({ ...record });
  }, [record]);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const [updateBook] = useMutation(UPDATE_BOOK);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (type === "author") {
        await updateAuthor({
          variables: {
            id: record.id,
            input: {
              name: formData.name,
              biography: formData.biography,
              bornDate: formData.bornDate,
            },
          },
        });
      } else {
        await updateBook({
          variables: {
            id: record.id,
            input: {
              title: formData.title,
              description: formData.description,
              published_date: formData.published_date,
              author_id: formData.author_id,
            },
          },
        });
      }

      onRefresh();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-xl">
        <h4 className="text-xl font-semibold text-primary mb-4">Edit {type}</h4>

        <form className="space-y-4">

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-8">
            <legend className="fieldset-legend capitalize p-8">{type === "author" ? 'Author Details..' : 'Book Details..'}</legend>

          {Object.entries(formData).map(([key, value]) => {
            if (["id", "__typename", "author_id", "author", "books"].includes(key)) return null;

            const isDate = key.toLowerCase().includes("date");
            const isAreaField = key.toLowerCase().includes("biography") || key.toLowerCase().includes("description");

            return (
              <div key={key}>
                <label className="label w-full capitalize"><span>{key.replace(/_/g, " ")}</span></label>
                {isAreaField ?
                    <textarea
                      name={key}
                      className="textarea textarea-sm textarea-ghost"
                      placeholder={`Enter ${key.replace(/_/g, " ")}`}
                      onChange={handleChange}
                      value={formData[key] || ""}
                    />
                    :
                    <input
                      type={isDate ? "date" : "text"}
                      name={key}
                      className="input input-sm input-ghost"
                      placeholder={`Enter ${key.replace(/_/g, " ")}`}
                      onChange={handleChange}
                      value={isDate ? String(value).slice(0, 10) : String(value ?? "")}
                    />
                  }

              </div>
            );
          })}

          </fieldset>
        </form>

        <div className="modal-action mt-6">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
