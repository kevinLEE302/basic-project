import styles from './AnswerCard.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/ko.js';
import { postReaction } from '../../../api/postApi';
import { useState, useRef } from 'react';
import Form from '../form/Form';
import { postAnswer } from '../../../api/postApi';
import Kebab from '../kebab/Kebab';
import putAnswer from '../../../api/putApi';
dayjs.extend(relativeTime);
dayjs.locale('ko');

function AnswerCard({ subject, item, onDelete }) {
    const [reactionType, setReactionType] = useState(null);
    const [likeCount, setLikeCount] = useState(item.like);
    const [dislikeCount, setDislikeCount] = useState(item.dislike);
    const [answer, setAnswer] = useState(item.answer);
    const [createValue, setCreateValue] = useState({});
    const [editValue, setEditValue] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);

    const reactionRef = useRef(false);

    //
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
    //

    //
    const handleCreateChange = (e) => {
        setCreateValue((prev) => ({ ...prev, [item.id]: e.target.value }));
    };

    const onSubmit = async (variable) => {
        try {
            setIsLoading(true);
            const created = await postAnswer(variable);
            if (created) {
                setAnswer(created);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    //
    const onReject = async (boolean) => {
        if (!answer?.id) return;
        try {
            await putAnswer({ ad: answer.id, isRejected: boolean, content: answer.content });
            setIsRejected(boolean);
        } catch (e) {
            console.log(e.message);
        }
    };

    const handleEditChange = (e) => {
        setEditValue((prev) => ({ ...prev, [answer.id]: e.target.value ?? answer.content }));
    };

    const onEdit = async (variable) => {
        try {
            setIsEditLoading(true);
            const edited = await putAnswer(variable);
            if (edited) {
                setAnswer(edited);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsEditLoading(false);
        }
        setIsEdit(false);
    };

    //
    return (
        <div className={styles['card-container']}>
            <div className={styles['card-box-wrapper']}>
                <div className={answer === null ? styles['card-noAnswerBox'] : styles['card-answerBox']}>
                    {answer === null ? '미완료' : '답변 완료'}
                </div>
                <Kebab
                    isRejected={isRejected}
                    onReject={onReject}
                    onDelete={() => onDelete(item.id)}
                    onEditClick={() => {
                        if (!answer?.id) return;
                        setEditValue((prev) => ({
                            ...prev,
                            [answer.id]: prev[answer.id] ?? answer.content ?? '',
                        }));
                        setIsEdit((prev) => !prev);
                    }}
                    isEdit={isEdit}
                />
            </div>
            <div className={styles['card-title-wrapper']}>
                <p className={styles['card-questionday']}>질문 · {dayjs(item.createdAt).fromNow()}</p>
                <h1 className={styles['card-question-content']}>{item.content}</h1>
            </div>
            {answer !== null ? (
                <div className={styles['card-content-container']}>
                    <img src={subject.imageSource} className={styles['card-photo']} />
                    <div className={styles['card-content-wrapper']}>
                        <h1 className={styles['card-content-name']}>
                            {subject.name}
                            <span className={styles['card-answerday']}>{dayjs(item.createdAt).fromNow()}</span>
                        </h1>
                        {isEdit ? (
                            <Form
                                onChange={handleEditChange}
                                value={editValue[answer.id] ?? answer.content ?? ''}
                                disabled={!(editValue[answer.id] ?? answer.content ?? '').trim()}
                                variable={{
                                    ad: answer.id,
                                    isRejected,
                                    content: editValue[answer.id] ?? answer.content ?? '',
                                }}
                                onSubmit={onEdit}
                                isLoading={isEditLoading}
                            >
                                수정 완료
                            </Form>
                        ) : (
                            <p className={styles['card-answer-content']}>{answer.content}</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles['card-content-container']}>
                    <img src={subject.imageSource} className={styles['card-photo']} />
                    <div className={styles['card-content-wrapper']}>
                        <h1 className={styles['card-content-name']}>
                            {subject.name}
                            <span className={styles['card-answerday']}>{dayjs(item.createdAt).fromNow()}</span>
                        </h1>
                        <Form
                            placeholder="답변을 입력해주세요"
                            onChange={handleCreateChange}
                            value={createValue[item.id]}
                            disabled={!createValue[item.id]}
                            variable={{ qd: item.id, isRejected, content: createValue[item.id] }}
                            onSubmit={onSubmit}
                            isLoading={isLoading}
                        >
                            답변 완료
                        </Form>
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
                    <img src={reactionType === 'like' ? '/Answer/active-thumbs-up.png' : '/Answer/thumbs-up.png'} />
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
                    <img src={'/Answer/thumbs-down.png'} />
                    <span className={reactionType === 'dislike' ? styles['card-activethumbs'] : styles['card-thumbs']}>
                        {reactionType === 'dislike' ? `싫어요 ${dislikeCount}` : '싫어요'}
                    </span>
                </button>
            </div>
        </div>
    );
}
export default AnswerCard;
