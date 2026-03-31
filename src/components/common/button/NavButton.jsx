import styles from './NavButton.module.css';
export default function NavButton({ children, disabled = false, onClick, position = '' }) {
    return (
        <button disabled={disabled} className={`${styles.button} ${position}`} onClick={onClick}>
            {children} <img src="/common/button/arrow-right.png" />
        </button>
    );
}
