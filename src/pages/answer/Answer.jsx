import { useOutletContext } from 'react-router-dom';
import styles from './Answer.module.css';
import AnswerCardList from '../../components/post/answer-card/AnswerCardList';
import deleteQuestion from '../../api/deleteApi';
import { useEffect, useState } from 'react';
function Answer() {
    const { subject, data, totalCount } = useOutletContext();
    const [items, setItems] = useState(data);

    useEffect(() => {
        setItems(data);
    }, [data]);

    const onDelete = async (id) => {
        try {
            await deleteQuestion(id);
            setItems((prev) => prev.filter((k) => k.id !== id));
        } catch (e) {
            console.log(e.message);
        }
    };
    const onAllDelete = async () => {
        try {
            await Promise.all(items.map((item) => deleteQuestion(item.id)));
            setItems([]);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <div className={styles['subject-container']}>
            <AnswerCardList
                subject={subject}
                items={items}
                totalCount={totalCount}
                onDelete={onDelete}
                onAllDelete={onAllDelete}
            />
        </div>
    );
}
export default Answer;
