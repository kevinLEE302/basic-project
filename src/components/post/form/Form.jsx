import Button from '../../common/button/Button';
import styles from './Form.module.css';

export default function Form({ children, isLoading, onSubmit, onChange, value, placeholder, disabled = false }) {
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <textarea placeholder={placeholder} className={styles.textarea} value={value} onChange={onChange} />
            <Button disabled={disabled}>{isLoading ? '로딩중...' : children}</Button>
        </form>
    );
}
