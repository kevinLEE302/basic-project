import Button from '../../common/button/Button';
import styles from './Form.module.css';

export default function Form({ children, onSubmit, onChange, value, placeholder }) {
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit();
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <textarea
                placeholder={placeholder}
                className={styles.textarea}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button disabled={!value}>{children}</Button>
        </form>
    );
}
