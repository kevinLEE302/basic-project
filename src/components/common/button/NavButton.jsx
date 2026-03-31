import styles from './NavButton.module.css';
export default function NavButton({ children, disabled, onClick }) {
    return (
        <div>
            <button disabled={disabled} className={styles.button} onClick={onClick}>
                {children} <img src="/common/button/arrow-right.png" />
            </button>
        </div>
    );
}
