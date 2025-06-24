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
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-md">
        <h3 className="text-xl font-bold text-red-600 mb-2">
          Delete {type === "author" ? "Author" : "Book"}
        </h3>
        <p className="mb-4 text-gray-700">
          Are you sure you want to delete this {type}? This action cannot be undone.
        </p>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
