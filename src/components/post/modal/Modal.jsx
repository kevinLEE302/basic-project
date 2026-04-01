import { useState } from 'react';
import { postQuestion } from '../../../api/postApi';
import Form from '../form/Form';
import styles from './Modal.module.css';
import { useParams } from 'react-router-dom';

function Modal({ subject, onClick, func }) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const handleChange = (e) => {
        setContent(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await postQuestion({ content, id });
            func(false);
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-container']}>
                <div className={styles['modal-wrapper']}>
                    <div className={styles['modal-title-wrapper']}>
                        <div className={styles['modal-title']}>
                            <img src="/Subject/message.png" />
                            <h1 className={styles['modal-word']}>질문을 작성하세요</h1>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                        >
                            <picture>
                                <source srcSet="/Subject/mobile-close.png" media="(max-width:375px)" />
                                <img src="/Subject/close.png" />
                            </picture>
                        </button>
                    </div>
                    <div className={styles['modal-form']}>
                        <div className={styles['modal-subject']}>
                            <p className={styles['modal-to']}>To.</p>
                            <img className={styles['modal-image']} src={subject.imageSource} />
                            <p className={styles['modal-name']}>{subject.name}</p>
                        </div>
                        <Form
                            disabled={!content}
                            value={content}
                            onChange={handleChange}
                            placeholder="질문을 입력해주세요"
                            onSubmit={handleSubmit}
                            isLoading={isLoading}
                        >
                            질문 보내기
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;
