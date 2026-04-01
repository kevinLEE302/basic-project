import styles from './SubjectCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/ko.js';
import { postReaction } from '../../../api/postApi';
import { useState, useRef } from 'react';
dayjs.extend(relativeTime);
dayjs.locale('ko');

function SubjectCard({ subject, item }) {
    const [reactionType, setReactionType] = useState(null);
    const [likeCount, setLikeCount] = useState(item.like);
    const [dislikeCount, setDislikeCount] = useState(item.dislike);

    const reactionRef = useRef(false);

    const handleLikeClick = async (id) => {
        if (reactionRef.current) {
            return;
        }
        try {
            reactionRef.current = true;
            setReactionType('like');
            setLikeCount((prev) => prev + 1);
            const response = await postReaction({ qd: id, type: 'like' });
            setLikeCount(response.like);
            setDislikeCount(response.dislike);
        } catch (e) {
            setReactionType(null);
            setLikeCount((prev) => Math.max(item.like, prev - 1));
            console.log(e.message);
        } finally {
            reactionRef.current = false;
        }
    };
    const handleDisLikeClick = async (id) => {
        if (reactionRef.current) {
            return;
        }
        try {
            reactionRef.current = true;
            setReactionType('dislike');
            setDislikeCount((prev) => prev + 1);
            const response = await postReaction({ qd: id, type: 'dislike' });
            setLikeCount(response.like);
            setDislikeCount(response.dislike);
        } catch (e) {
            setReactionType(null);
            setDislikeCount((prev) => Math.max(item.dislike, prev - 1));
            console.log(e.message);
        } finally {
            reactionRef.current = false;
        }
    };
    return (
        <div className={styles['card-container']}>
            <div className={item.answer === null ? styles['card-noAnswerBox'] : styles['card-answerBox']}>
                {item.answer === null ? '미완료' : '답변 완료'}
            </div>
            <div className={styles['card-title-wrapper']}>
                <p className={styles['card-questionday']}>질문 · {dayjs(item.createdAt).fromNow()}</p>
                <h1 className={styles['card-question-content']}>{item.content}</h1>
            </div>
            {item.answer !== null && (
                <div className={styles['card-content-container']}>
                    <img src={subject.imageSource} className={styles['card-photo']} />
                    <div className={styles['card-content-wrapper']}>
                        <h1 className={styles['card-content-name']}>
                            {subject.name}
                            <span className={styles['card-answerday']}>{dayjs(item.createdAt).fromNow()}</span>
                        </h1>
                        <p
                            className={
                                item.answer.isRejected ? styles['card-noAnswer-content'] : styles['card-answer-content']
                            }
                        >
                            {item.answer.isRejected ? '답변 거절' : item.answer.content}
                        </p>
                    </div>
                </div>
            )}
            <div className={styles['card-like-wrapper']}>
                <button
                    className={styles['card-like']}
                    onClick={() => {
                        handleLikeClick(item.id);
                    }}
                >
                    <img src={reactionType === 'like' ? '/Subject/active-thumbs-up.png' : '/Subject/thumbs-up.png'} />
                    <span className={reactionType === 'like' ? styles['card-activethumbs'] : styles['card-thumbs']}>
                        {reactionType === 'like' ? `좋아요 ${likeCount}` : '좋아요'}
                    </span>
                </button>
                <button
                    className={styles['card-like']}
                    onClick={() => {
                        handleDisLikeClick(item.id);
                    }}
                >
                    <img src={'/Subject/thumbs-down.png'} />
                    <span className={reactionType === 'dislike' ? styles['card-activethumbs'] : styles['card-thumbs']}>
                        {reactionType === 'dislike' ? `싫어요 ${dislikeCount}` : '싫어요'}
                    </span>
                </button>
            </div>
        </div>
    );
}
export default SubjectCard;
