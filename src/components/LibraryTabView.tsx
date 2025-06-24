/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUTHORS, GET_BOOKS } from "@/graphql/queries";
import { FaPlus } from "react-icons/fa";
import Pagination from "./Pagination";
import EditModal from "./EditModal";
import DeleteConfirm from "./DeleteConfirm";
import AddModal from "./AddModal";
import LibraryCard from "./LibraryCard";


export default function LibraryTabView() {
  const [activeTab, setActiveTab] = useState<"authors" | "books">("authors");
  const [limit, setLimit] = useState(10);
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
   <div className="bg-gradient-to-br from-base-100 to-base-200 shadow-2xl rounded-2xl border border-base-300 p-8 sm:p-10 max-w-full transition-all duration-300">
      
      <div className="tabs tabs-boxed justify-center mb-6">
        {["authors", "books"].map((tab) => (
          <a
            key={tab}
            className={`tab ${activeTab === tab ? "tab-active text-primary font-bold" : ""}`}
            onClick={() => setActiveTab(tab as "authors" | "books")}
          >
            {tab === "authors" ? "👤 Authors" : "📖 Books"}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-[auto_1fr_auto] items-center gap-4 mb-6 px-6">
      <h2 className="text-lg md:text-xl font-semibold text-primary whitespace-nowrap">
        {activeTab === "authors" ? "Author List" : "Book List"}
      </h2>

      <div className="w-full">
        <div className="join w-full max-w-xl ml-auto">
          <input
            type="text"
            placeholder={`Search by ${activeTab === "authors" ? "Author Name" : "Book Title"}`}
            className="input input-sm input-bordered join-item w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="btn btn-sm btn-primary join-item"
            onClick={() => {
              setOffset(0);
              setSearchApplied(searchText);
            }}
          >
            Search
          </button>
          <button
            className="btn btn-sm join-item"
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

      <div className="justify-self-end">
        <button
          className="btn btn-sm btn-success gap-2 shadow-md whitespace-nowrap"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus />
          Add {modalType === "author" ? "Author" : "Book"}
        </button>
      </div>
    </div>

      <div className="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 py-10">
        {(loadingAuthors || loadingBooks) && (
          <div className="col-span-full text-center py-10 text-lg">Loading...</div>
        )}

        {currentData.map((item: any) => (
          <LibraryCard
            key={item.id}
            item={item}
            type={modalType}
            onEdit={setEditRecord}
            onDelete={setDeleteRecordId}
          />
        ))}
      </div>


      <div className="mt-16 px-6">
        <div className="card bg-base-100 shadow-md rounded-xl p-6">
          <Pagination
            limit={limit}
            offset={offset}
            totalCount={totalCount}
            onPageChange={(newOffset) => setOffset(newOffset)}
          />
        </div>
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
