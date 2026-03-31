import styles from './Dropout.module.css';
import { useState, useRef, useEffect } from 'react';
export default function Dropout({ onClick, sort }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropref = useRef(null);
    const handleToggle = () => {
        if (isOpen) {
            setIsOpen(false);
            if (dropref.current) {
                dropref.current.blur();
            }
            return;
        }
        setIsOpen(true);
    };

    useEffect(() => {
        const handleDrop = (e) => {
            if (dropref.current && !dropref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleDrop);
        return () => {
            document.removeEventListener('mousedown', handleDrop);
        };
    }, []);

    return (
        <div className={styles['dropout-anchor']} ref={dropref}>
            <button className={styles['dropout-container']} onClick={handleToggle}>
                {sort === 'name' ? '이름순' : '최신순'}
                {isOpen ? <img src="/List/arrow-up.png" /> : <img src="/List/arrow-down.png" />}
            </button>
            {isOpen && (
                <div className={styles['dropout-wrapper']}>
                    <button
                        className={styles['dropout-button']}
                        onClick={() => {
                            onClick('name');
                            setIsOpen(false);
                        }}
                    >
                        이름순
                    </button>
                    <button
                        onClick={() => {
                            onClick('time');
                            setIsOpen(false);
                        }}
                        className={styles['dropout-button']}
                    >
                        최신순
                    </button>
                </div>
            )}
        </div>
    );
}
