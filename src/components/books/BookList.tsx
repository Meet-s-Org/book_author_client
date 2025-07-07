/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_BOOKS } from "@/graphql/queries";
import LibraryCard from "@/components/common/LibraryCard";
import Pagination from "@/components/common/Pagination";
import AddModal from "@/components/common/modals/AddModal";
import EditModal from "@/components/common/modals/EditModal";
import DeleteConfirm from "@/components/common/modals/DeleteConfirm";
import { FaPlus } from "react-icons/fa";

export default function BookList() {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [searchApplied, setSearchApplied] = useState("");
    const [editRecord, setEditRecord] = useState(null);
    const [deleteRecordId, setDeleteRecordId] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);

    const { data, loading, refetch } = useQuery(GET_BOOKS, {
        variables: { limit, offset, searchByTitle: searchApplied },
    });

    useEffect(() => {
        refetch();
    }, [refreshCounter]);

    const books = data?.getBooks?.data || [];
    const totalCount = data?.getBooks?.totalCount || 0;

    const triggerRefresh = () => {
        setRefreshCounter((prev) => prev + 1);
    };

    return (
        <>
            <div className="grid grid-cols-3 md:grid-cols-[auto_1fr_auto] items-center gap-4 mb-10 px-6">
                <h2 className="text-lg md:text-xl font-semibold text-primary whitespace-nowrap">📖 Books</h2>
                <div className="w-full">
                    <div className="flex gap-2 items-center w-full max-w-md mx-auto">
                        <input
                            className="input input-xs flex-grow"
                            placeholder="Search by title"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="btn btn-sm btn-ghost" onClick={() => setSearchApplied(searchText)}>
                            Search
                        </button>
                        <button className="btn btn-sm btn-outline" onClick={() => {
                            setSearchText("");
                            setSearchApplied("");
                        }}>
                            Clear
                        </button>
                    </div>
                </div>
                <div className="justify-self-end">
                    <button className="btn btn-sm btn-success btn-outline" onClick={() => setShowAddModal(true)}>
                        <FaPlus /> Add Book
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 py-10">

                {loading && (
                    <div className="col-span-full text-center py-10 text-lg">Loading...</div>
                )}

                {!loading && books?.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        <div className="text-3xl font-semibold mb-2">
                            No books found!
                        </div>
                        <p className="text-sm mb-4">
                            You haven’t added any books yet.
                        </p>
                        <button
                            className="btn btn-sm btn-success gap-2 shadow-md whitespace-nowrap btn-outline"
                            onClick={() => setShowAddModal(true)}
                        >
                            <FaPlus className="mr-2" />
                            Add Book
                        </button>
                    </div>
                )}

                {books.map((book: any) => (
                    <LibraryCard
                        key={book.id}
                        item={book}
                        type="book"
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


            {/* {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {books.map((book: any) => (
                            <LibraryCard
                                key={book.id}
                                item={book}
                                type="book"
                                onEdit={setEditRecord}
                                onDelete={setDeleteRecordId}
                            />
                        ))}
                    </div>
                    <Pagination
                        limit={limit}
                        offset={offset}
                        totalCount={totalCount}
                        onPageChange={(newOffset) => setOffset(newOffset)}
                    />
                </>
            )} */}

            {showAddModal && (
                <AddModal type="book" open={showAddModal} onClose={() => setShowAddModal(false)} onRefresh={triggerRefresh} />
            )}
            {editRecord && (
                <EditModal record={editRecord} type="book" open={!!editRecord} onClose={() => setEditRecord(null)} onRefresh={triggerRefresh} />
            )}
            {deleteRecordId && (
                <DeleteConfirm recordId={deleteRecordId} type="book" open={!!deleteRecordId} onClose={() => setDeleteRecordId(null)} onRefresh={triggerRefresh} />
            )}
        </>
    );
}
