import { useRef, useState, useEffect } from 'react';
import styles from './Kebab.module.css';
export default function Kebab({ isRejected, onReject, onDelete, onEditClick, isEdit }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);
    return (
        <div className={styles['kebab-button-container']} ref={ref}>
            <button
                onClick={() => {
                    setIsOpen((prev) => !prev);
                }}
            >
                <img src="/Answer/more.png" />
            </button>
            {isOpen && (
                <div className={styles['kebab-container']}>
                    <button
                        className={styles['kebab-button']}
                        onClick={() => {
                            onEditClick();
                            setIsOpen(false);
                        }}
                    >
                        <img src={isEdit ? '/Answer/active-edit.png' : '/Answer/Edit.png'} />
                        <span className={isEdit ? styles['kebab-active-word'] : styles['kebab-word']}>
                            {isEdit ? '수정취소' : '수정하기'}
                        </span>
                    </button>
                    <button className={styles['kebab-button']} onClick={onDelete}>
                        <img src="/Answer/delete.png" />
                        <span className={styles['kebab-word']}>삭제하기</span>
                    </button>
                    <button
                        className={styles['kebab-button']}
                        onClick={
                            isRejected
                                ? () => {
                                      onReject(false);
                                      setIsOpen(false);
                                  }
                                : () => {
                                      onReject(true);
                                      setIsOpen(false);
                                  }
                        }
                    >
                        <img src="/Answer/delete.png" />
                        <span className={styles['kebab-word']}>{isRejected ? '수락하기' : '거절하기'}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
