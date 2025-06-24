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
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2">
        <button
          className="btn btn-sm px-3"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          «
        </button>

        {generatePages().map((page, i) =>
          typeof page === "number" ? (
            <button
              key={i}
              className={`btn btn-sm px-4 font-semibold ${
                page === currentPage
                  ? "btn-primary border text-green"
                  : "bg-base-100 hover:bg-base-200"
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ) : (
            <span key={i} className="px-2 text-gray-400 select-none">...</span>
          )
        )}

        <button
          className="btn btn-sm px-3"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
