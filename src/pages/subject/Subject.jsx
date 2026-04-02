import { useOutletContext } from 'react-router-dom';
import SubjectCardList from '../../components/post/subect-card/SubjectCardList';
import styles from './Subject.module.css';
import RdButton from '../../components/common/button/RdButton';
import { createPortal } from 'react-dom';
import Modal from '../../components/post/modal/Modal';
import { useState } from 'react';

function Subject() {
    const { subject, data, totalCount, refetchQuestions } = useOutletContext();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles['subject-container']}>
            <SubjectCardList subject={subject} data={data} totalCount={totalCount} />
            {isOpen &&
                createPortal(
                    <Modal
                        subject={subject}
                        onClick={() => setIsOpen(false)}
                        func={setIsOpen}
                        isOpen={isOpen}
                        onSuccess={refetchQuestions}
                    />,
                    document.getElementById('root-two'),
                )}
            <RdButton
                position={styles.RdButton}
                onClick={() => {
                    setIsOpen(true);
                }}
                disabled={isOpen}
            >
                질문 작성
            </RdButton>
        </div>
    );
}
export default Subject;
