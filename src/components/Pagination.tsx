type Props = {
  limit: number;
  offset: number;
  totalCount: number;
  onPageChange: (newOffset: number) => void;
};

export default function Pagination({ limit, offset, totalCount, onPageChange }: Props) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  const goToPage = (page: number) => {
    const newOffset = (page - 1) * limit;
    onPageChange(newOffset);
  };

  const generatePages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 4) {
            pages.push("...");
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
            pages.push(i);
            }

            if (currentPage < totalPages - 3) {
            pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };


  return (
  <div className="flex justify-center mt-10 px-4">
    <div className="flex flex-wrap items-center gap-2">
      {/* Previous Button */}
      <button
        className="btn btn-sm px-4 rounded-md shadow-sm hover:shadow transition-all disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        «
      </button>

      {/* Page Buttons */}
      {generatePages().map((page, i) =>
        typeof page === "number" ? (
          <button
            key={i}
            className={`btn btn-sm px-4 rounded-md font-semibold shadow-sm transition-all ${
              page === currentPage
                ? "btn-primary border border-primary"
                : "bg-base-100 text-gray-700 hover:bg-base-200"
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ) : (
          <span key={i} className="px-3 text-gray-400 select-none">...</span>
        )
      )}

      <button
        className="btn btn-sm px-4 rounded-md shadow-sm hover:shadow transition-all disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        »
      </button>
    </div>
  </div>
);
}
