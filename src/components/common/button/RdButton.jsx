import styles from './RdButton.module.css';

export default function RdButton({ children, onClick, size = '', position, disabled = false }) {
    return (
        <button
            className={`${styles.button} ${size ? styles[size] : ''} ${position}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
