/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS } from "@/graphql/queries";
import { FaPlus } from "react-icons/fa";
import Pagination from "./Pagination";
import EditModal from "./EditModal";
import DeleteConfirm from "./DeleteConfirm";
import AddModal from "./AddModal";

export default function LibraryTabView() {
  const [activeTab, setActiveTab] = useState<"authors" | "books">("authors");
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchApplied, setSearchApplied] = useState("");

  useEffect(() => {
    setOffset(0);
  }, [activeTab]);

  const triggerRefresh = () => {
    setOffset(0);
    setRefreshCounter((prev) => prev + 1);
  };

  const {
    data: authorsData,
    loading: loadingAuthors,
    refetch: refetchAuthors,
  } = useQuery(GET_AUTHORS, {
    variables: { limit, offset, searchByName: searchApplied },
    skip: activeTab !== "authors",
  });

  const {
    data: booksData,
    loading: loadingBooks,
    refetch: refetchBooks,
  } = useQuery(GET_BOOKS, {
    variables: { limit, offset, searchByTitle: searchApplied },
    skip: activeTab !== "books",
  });

  const currentData =
    activeTab === "authors" ? authorsData?.getAuthors?.data || [] : booksData?.getBooks?.data || [];

  const totalCount =
    activeTab === "authors"
      ? authorsData?.getAuthors.totalCount || 0
      : booksData?.getBooks?.totalCount || 0;
 
  useEffect(() => {
    if (activeTab === "authors") {
      refetchAuthors();
    } else {
      refetchBooks();
    }
  }, [refreshCounter, activeTab, refetchAuthors, refetchBooks]);

  const [editRecord, setEditRecord] = useState<any>(null);
  const [deleteRecordId, setDeleteRecordId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const modalType = activeTab.slice(0, -1) as "author" | "book";

  return (
    <div className="card shadow-xl bg-base-100 p-6 rounded-xl max-w-full">
      {/* Tab Switcher */}
      <div className="flex space-x-2 bg-base-100 rounded-lg w-max p-1 mb-6">
        {["authors", "books"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "authors" | "books")}
              className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                isActive
                  ? "bg-primary text-gray-600 shadow border border-primary"
                  : "text-gray-500 hover:bg-base-200"
              }`}
            >
              {tab === "authors" ? "👤 Authors" : "📖 Books"}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">
          {activeTab === "authors" ? "Author List" : "Book List"}
        </h2>
        <div className="flex justify-center">
          <div className="flex items-center rounded-lg shadow-sm border border-primary overflow-hidden">
            <input
              type="text"
              placeholder={`Search by ${activeTab === "authors" ? "Author Name" : "Book Title"}...`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
            <button
              className="h-full px-4 py-2 text-sm font-semibold bg-primary text-black hover:bg-primary/90 transition-colors"
              onClick={() => {
                setOffset(0);
                setSearchApplied(searchText);
              }}
            >
              Apply
            </button>
            <button
              className="ml-2 h-full px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 rounded-md"
              onClick={() => {
                setSearchText("");
                setSearchApplied("");
                setOffset(0);
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <button className="btn btn-xs btn-primary px-4 py-3 shadow-sm hover:shadow-md border rounded-md gap-2" onClick={() => setShowAddModal(true)}>
          <FaPlus />
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-fixed border-separate border-spacing-y-2 border-base-200 text-sm">
          <thead>
            <tr className="bg-base-200 text-base-content">
              {(activeTab === "authors"
                ? ["Name", "Bio", "Born"]
                : ["Title", "Description", "Published", "Author"]
              ).map((col) => (
                <th key={col} className="text-left px-4 py-3 font-semibold">
                  {col}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(loadingAuthors || loadingBooks) && (
              <tr>
                <td colSpan={activeTab === "authors" ? 4 : 5} className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {currentData.map((row: any) => (
              <tr key={row.id} className="shadow-sm hover:shadow-md transition-shadow rounded-md">
                {(activeTab === "authors"
                  ? [row.name, row.biography, row.bornDate]
                  : [row.title, row.description, row.published_date, row.author?.name]
                ).map((cell, i) => (
                  <td key={i} className="px-4 py-3 align-top rounded-md">{cell}</td>
                ))}
                <td className="px-4 py-3 rounded-md text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      className="btn btn-xs btn-outline btn-success"
                      onClick={() => setEditRecord(row)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => setDeleteRecordId(row.id)}
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination
          limit={limit}
          offset={offset}
          totalCount={totalCount}
          onPageChange={(newOffset) => setOffset(newOffset)}
        />
      </div>

      {editRecord && (
        <EditModal
          record={editRecord}
          type={modalType}
          open={!!editRecord}
          onClose={() => setEditRecord(null)}
          onRefresh={triggerRefresh}
        />
      )}

      {deleteRecordId && (
        <DeleteConfirm
          recordId={deleteRecordId}
          type={modalType}
          open={!!deleteRecordId}
          onClose={() => setDeleteRecordId(null)}
          onRefresh={triggerRefresh}
        />
      )}

      {showAddModal && (
        <AddModal
          open={showAddModal}
          type={modalType}
          onClose={() => setShowAddModal(false)}
          onRefresh={triggerRefresh}
        />
      )}

    </div>
  );
}
