import Card from './Card';
import styles from './CardList.module.css';
export default function CardList({ data, onClick }) {
    return (
        <div className={styles['cardList-container']}>
            {data.map((item) => (
                <Card
                    key={item.id}
                    name={item.name}
                    imageSource={item.imageSource}
                    questionCount={item.questionCount}
                    onClick={() => {
                        onClick(item.id);
                    }}
                />
            ))}
        </div>
    );
}
