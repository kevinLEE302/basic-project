import RdButton from '../../common/button/RdButton';
import AnswerCard from './AnswerCard';
import styles from './AnswerCardList.module.css';
function AnswerCardList({ subject, items, totalCount, onDelete, onAllDelete }) {
    return (
        <div className={styles['list-container']}>
            <RdButton size="small" onClick={onAllDelete} position={styles['RdButton']}>
                삭제하기
            </RdButton>
            <div className={styles['list-count-wrapper']}>
                <img src="/Subject/message.png" className={styles['list-icon']} />
                <p className={styles['list-count']}>
                    {totalCount === 0 ? '아직 질문이 없습니다' : `${totalCount}개의 질문이 있습니다`}
                </p>
            </div>
            {items.length === 0 ? (
                <picture className={styles['list-empty']}>
                    <source srcSet="/List/mobile-empty.png" media="(max-width:375px)" />
                    <img src="/List/empty.png" />
                </picture>
            ) : (
                <div className={styles['list-card-container']}>
                    {items.map((item) => (
                        <AnswerCard key={item.id} item={item} subject={subject} onDelete={onDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
export default AnswerCardList;
