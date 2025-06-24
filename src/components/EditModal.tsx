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
        await updateAuthor({ variables: { id: record.id, input: { name: formData.name, biography: formData.biography, bornDate: formData.bornDate } } });
      } else {
        await updateBook({ variables: { id: record.id, input: { title: formData.title, description: formData.description, published_date: formData.published_date, author_id: formData.author_id } } });
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Edit {type}</h2>

        <form className="space-y-4">
          {Object.entries(formData).map(([key, value]) => {
            if (["id", "__typename", "author_id", "author"].includes(key)) return null;

            const isDateField = key.toLowerCase().includes("date");

            return (
              <div key={key} className="form-control w-full mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                  {key.replace(/_/g, " ")}
                </label>
                {key === "description" || key === "biography" ? (
                  <input
                    type={isDateField ? "date" : "text"}
                    name={key}
                    value={isDateField ? String(value || "").slice(0, 10) : String(value ?? "")}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                ) : (
                  <input
                    type={isDateField ? "date" : "text"}
                    name={key}
                    value={isDateField ? String(value || "").slice(0, 10) : String(value ?? "")}
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
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}