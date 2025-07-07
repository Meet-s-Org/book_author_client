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
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          «
        </button>

        {generatePages().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-ghost"}`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-400">...</span>
          )
        )}

        <button
          className="btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
