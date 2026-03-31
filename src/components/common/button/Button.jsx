import styles from './Button.module.css';

export default function Button({ children, disabled }) {
    return (
        <div>
            <button disabled={disabled} className={styles.button} type="submit">
                {children}
            </button>
        </div>
    );
}
