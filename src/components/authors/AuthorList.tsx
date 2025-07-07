/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_AUTHORS } from "@/graphql/queries";
import LibraryCard from "@/components/common/LibraryCard";
import Pagination from "@/components/common/Pagination";
import AddModal from "@/components/common/modals/AddModal";
import EditModal from "@/components/common/modals/EditModal";
import DeleteConfirm from "@/components/common/modals/DeleteConfirm";
import { FaPlus } from "react-icons/fa";

export default function AuthorList() {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [searchApplied, setSearchApplied] = useState("");
    const [editRecord, setEditRecord] = useState(null);
    const [deleteRecordId, setDeleteRecordId] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);

    const { data, loading, refetch } = useQuery(GET_AUTHORS, {
        variables: { limit, offset, searchByName: searchApplied },
    });

    useEffect(() => {
        refetch();
    }, [refreshCounter]);

    const authors = data?.getAuthors?.data || [];
    const totalCount = data?.getAuthors?.totalCount || 0;

    const triggerRefresh = () => {
        setRefreshCounter((prev) => prev + 1);
    };

    return (
        <>
            <div className="grid grid-cols-3 md:grid-cols-[auto_1fr_auto] items-center gap-4 mb-10 px-6">
                <h2 className="text-lg md:text-xl font-semibold text-primary whitespace-nowrap">👤 Authors</h2>
                <div className="w-full">
                    <div className="flex gap-2 items-center w-full max-w-md mx-auto">
                        <input
                            className="input input-xs flex-grow"
                            placeholder="Search by name"
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
                        <FaPlus /> Add Author
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 py-10">

                {loading && (
                    <div className="col-span-full text-center py-10 text-lg">Loading...</div>
                )}

                {!loading && authors?.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        <div className="text-3xl font-semibold mb-2">
                            No authors found!
                        </div>
                        <p className="text-sm mb-4">
                            You haven’t added any authors yet.
                        </p>
                        <button
                            className="btn btn-sm btn-success gap-2 shadow-md whitespace-nowrap btn-outline"
                            onClick={() => setShowAddModal(true)}
                        >
                            <FaPlus className="mr-2" />
                            Add Author
                        </button>
                    </div>
                )}

                {authors.map((author: any) => (
                    <LibraryCard
                        key={author.id}
                        item={author}
                        type="author"
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

            {showAddModal && (
                <AddModal type="author" open={showAddModal} onClose={() => setShowAddModal(false)} onRefresh={triggerRefresh} />
            )}
            {editRecord && (
                <EditModal record={editRecord} type="author" open={!!editRecord} onClose={() => setEditRecord(null)} onRefresh={triggerRefresh} />
            )}
            {deleteRecordId && (
                <DeleteConfirm recordId={deleteRecordId} type="author" open={!!deleteRecordId} onClose={() => setDeleteRecordId(null)} onRefresh={triggerRefresh} />
            )}
        </>
    );
}
