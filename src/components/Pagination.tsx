'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pageNumbers = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4 && totalPages > 5) {
        if (startPage === 1) {
            endPage = Math.min(5, totalPages);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - 4);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center space-x-2 my-6">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-4 py-2 rounded"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 rounded ${
                        currentPage === number ? 'bg-red-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    {number}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-2">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-4 py-2 rounded bg-gray-200"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}