import styles from './Button.module.css';

export default function Button({ children, disabled, onClick }) {
    return (
        <div>
            <button disabled={disabled} className={styles.button} type="submit" onClick={onClick}>
                {children}
            </button>
        </div>
    );
}
