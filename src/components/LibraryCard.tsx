/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaBook, FaEdit, FaInfoCircle, FaTrash, FaUser } from "react-icons/fa";

type Props = {
  item: any;
  type: "author" | "book";
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
};

export default function LibraryCard({ item, type, onEdit, onDelete }: Props) {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  return (
    <>
      <div className="w-full h-full bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 hover:-translate-y-1 p-4 flex flex-col justify-between">
        <div className="card-body p-0 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-primary text-sm mb-1 truncate">
              {type === "author" ? (
                <>
                  <FaUser className="inline mr-1" /> {item.name}
                </>
              ) : (
                <>
                  <FaBook className="inline mr-1" /> {item.title}
                </>
              )}

            </h3>

            {type === "author" ? (
              <>
                <p className="text-xs text-gray-500 line-clamp-2">{item.biography}</p>
                <p className="text-xs font-medium text-gray-600 mt-1">Born: {item.bornDate}</p>
                {item.books?.length > 0 ? (
                  <p className="text-xs font-medium text-blue-600 underline" onClick={() => setShowBookModal(true)}> {item.books.length} Book <FaInfoCircle/></p>
                ) : (
                  <p className="text-xs font-medium text-blue-600" >No books available</p>
                )}
              </>
            ) : (
              <>
                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                <p className="text-xs font-medium text-gray-600 mt-1">
                  Published: {item.published_date}
                </p>
                {item.author && (
                  <p className="text-xs font-medium text-blue-600 underline" onClick={() => setShowAuthorModal(true)}>Author Info <FaInfoCircle/></p>
                )}
              </>
            )}
          </div>

          <div className="card-actions justify-end mt-2 gap-2">
            <button
              className="btn btn-xs btn-outline btn-success"
              onClick={() => onEdit(item)}
              title="Edit"
            >
              <FaEdit size={12} />
            </button>
            <button
              className="btn btn-xs btn-outline btn-error"
              onClick={() => onDelete(item.id)}
              title="Delete"
            >
              <FaTrash size={12} />
            </button>
          </div>
        </div>
      </div>

      {type === "author" && showBookModal && (
        <>
          <input type="checkbox" id={`bookModal-${item.id}`} className="modal-toggle" checked readOnly />
          <div className="modal">
            <div className="modal-box max-w-md">
              <h3 className="font-bold text-lg mb-4"> <FaBook/> | Books by {item.name}</h3>
              {item.books.map((book: any) => (
                <div key={book.id} className="mb-3 border-t pb-2">
                  <p className="text-sm font-semibold"><span className="font-bold text-lg mb-4 text-primary">Title: </span>{book.title}</p>
                  <p className="text-xs text-gray-500"><span className="font-bold text-lg mb-4 text-primary">Description: </span>{book.description}</p>
                  <p className="text-xs text-gray-600"><span className="font-bold text-lg mb-4 text-primary">Published On: </span>{book.published_date}</p>
                </div>
              ))}
              <div className="modal-action">
                <button className="btn" onClick={() => setShowBookModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {type === "book" && showAuthorModal && (
        <>
          <input type="checkbox" id={`authorModal-${item.id}`} className="modal-toggle" checked readOnly />
          <div className="modal">
            <div className="modal-box max-w-md">
              <h3 className="font-bold text-lg mb-4"> <FaUser/> | {item.author.name}</h3>
              <div className="mb-3 border-t pb-2">
                <p className="text-sm text-gray-700 mb-1"><span className="font-bold text-lg mb-4 text-primary">Bio: </span> {item.author.biography}</p>
                <p className="text-sm text-gray-700 mb-4"><span className="font-bold text-lg mb-4 text-primary">Born: </span> {item.author.bornDate}</p>
              </div>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowAuthorModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
