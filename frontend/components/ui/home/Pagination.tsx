type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
};

export default function Pagination({ currentPage, totalPages, paginate }: PaginationProps) {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}