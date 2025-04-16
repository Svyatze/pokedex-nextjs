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

    const buttonStyles = {
        base: {
            border: '2px solid #3B5BA7',
            borderRadius: '0.375rem',
            padding: '0.625rem 1.25rem',
            fontWeight: 'bold',
            color: 'black'
        },
        active: {
            backgroundColor: '#FFCB05',
            color: 'black',
            border: '2px solid #3B5BA7'
        },
        inactive: {
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid #3B5BA7'
        },
        disabled: {
            opacity: 0.5
        }
    };

    return (
        <div className="flex justify-center items-center space-x-3 my-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                    ...buttonStyles.base,
                    ...(currentPage === 1 ? buttonStyles.disabled : {}),
                    backgroundColor: '#e5e7eb'
                }}
            >
                Previous
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        style={{
                            ...buttonStyles.base,
                            ...buttonStyles.inactive
                        }}
                    >
                        1
                    </button>
                    {startPage > 2 && <span style={{ color: 'black', fontWeight: 'bold' }}>...</span>}
                </>
            )}

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    style={{
                        ...buttonStyles.base,
                        ...(currentPage === number ? buttonStyles.active : buttonStyles.inactive)
                    }}
                >
                    {number}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span style={{ color: 'black', fontWeight: 'bold' }}>...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        style={{
                            ...buttonStyles.base,
                            ...buttonStyles.inactive
                        }}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                    ...buttonStyles.base,
                    ...(currentPage === totalPages ? buttonStyles.disabled : {}),
                    backgroundColor: '#e5e7eb'
                }}
            >
                Next
            </button>
        </div>
    );
}