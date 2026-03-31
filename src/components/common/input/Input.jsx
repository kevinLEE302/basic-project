import styles from './Input.module.css';
export default function Input({ value, onChange }) {
    return (
        <div className={styles.input}>
            <img src="/common/input/person.png" />
            <input value={value} onChange={onChange} placeholder="이름을 입력하세요" />
        </div>
    );
}
