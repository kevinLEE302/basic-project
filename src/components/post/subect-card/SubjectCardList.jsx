import SubjectCard from './SubjectCard';
import styles from './SubjectCardList.module.css';

function SubjectCardList({ subject, data, totalCount }) {
    return (
        <div className={styles['list-container']}>
            <div className={styles['list-count-wrapper']}>
                <img src="/Subject/message.png" className={styles['list-icon']} />
                <p className={styles['list-count']}>{totalCount}개의 질문이 있습니다</p>
            </div>
            <div className={styles['list-card-container']}>
                {data.map((item) => (
                    <SubjectCard key={item.id} item={item} subject={subject} />
                ))}
            </div>
        </div>
    );
}
export default SubjectCardList;
