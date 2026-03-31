import styles from './Toast.module.css';

export default function Toast({ children }) {
    return (
        <div className={styles['toast-container']}>
            <p className={styles['toast-content']}>{children}</p>
        </div>
    );
}
