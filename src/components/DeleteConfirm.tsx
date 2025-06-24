import { useMutation } from "@apollo/client";
import { DELETE_AUTHOR, DELETE_BOOK } from "@/graphql/mutations";

type Props = {
  recordId: string;
  type: "author" | "book";
  open: boolean;
  onClose: () => void;
  onRefresh: () => void;
};

export default function DeleteConfirm({ recordId, type, open, onClose, onRefresh }: Props) {
  const [deleteAuthor] = useMutation(DELETE_AUTHOR);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleDelete = async () => {
    try {
      if (type === "author") {
        await deleteAuthor({ variables: { id: recordId } });
      } else {
        await deleteBook({ variables: { id: recordId } });
      }
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/75 shadow-md mx-auto hover:shadow-lg transition-shadow">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg border border-red-100">
        <h3 className="text-xl font-semibold text-red-600 mb-3">Delete {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <p className="text-gray-700 mb-5">Are you sure you want to delete this {type}? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
