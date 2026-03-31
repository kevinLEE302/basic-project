import styles from './Pagination.module.css';
export default function Pagination({ currentPage, startIndex, lastIndex, totalPage, onPageChange }) {
    const handleNextClick = () => {
        if (currentPage < totalPage) {
            onPageChange((prev) => prev + 1);
        }
    };
    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange((prev) => prev - 1);
        }
    };
    return (
        <div className={styles['pagination-container']}>
            <button onClick={handlePrevClick} className={styles['pagination-button']} disabled={currentPage === 1}>
                <img src="/List/prev-arrow.png" />
            </button>
            {Array.from({ length: lastIndex - startIndex + 1 }, (_, i) => startIndex + i).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={currentPage === page ? styles['pagination-activebutton'] : styles['pagination-button']}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={handleNextClick}
                className={styles['pagination-button']}
                disabled={currentPage === totalPage}
            >
                <img src="/List/next-arrow.png" />
            </button>
        </div>
    );
}
