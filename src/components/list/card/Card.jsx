import styles from './Card.module.css';
export default function Card({ name, imageSource, questionCount, onClick }) {
    return (
        <button className={styles['card-container']} onClick={onClick}>
            <div className={styles['card-wrapper']}>
                <div className={styles['card-title-wrapper']}>
                    <img src={imageSource} className={styles['card-photo']} />
                    <h1 className={styles['card-title']}>{name}</h1>
                </div>
                <div className={styles['card-count-wrapper']}>
                    <div className={styles['card-count']}>
                        <img src="/List/message.png" />
                        <p className={styles.count}>받은 질문</p>
                    </div>
                    <p className={styles.count}>{questionCount}개</p>
                </div>
            </div>
        </button>
    );
}
