import styles from './Header.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getSubject } from '../../api/getApi';
import { kakaoShare } from '../../utils/kakaoShare';
import { facebookShare } from '../../utils/facebook';
import { handleClipboard } from '../../utils/clipboard';
import { createPortal } from 'react-dom';
import Toast from '../common/toast/Toast';
function Header() {
    const [isLoading, setIsLoading] = useState(false);
    const [subject, setSubject] = useState({});
    const [clip, setClip] = useState(false);
    const { id } = useParams();
    const timeout = useRef(null);
    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const a = await getSubject(id);
                setSubject(a);
            } catch (e) {
                console.log(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [id]);
    return (
        <div className={styles['header-container']}>
            <div className={styles['header-backimage']}></div>
            <div className={styles['header-wrapper']}>
                <picture>
                    <source srcSet="/Header/mobile-logo.png" media="(max-width:375px)" />
                    <img src="/Header/pc-logo.png" />
                </picture>
                <img src={subject.imageSource} className={styles['header-photo']} />
                <h1 className={styles['header-title']}>{subject.name}</h1>
                <div className={styles['header-nav-wrapper']}>
                    <button className={styles['header-nav']} onClick={() => handleClipboard(setClip, timeout)}>
                        <img src="/Header/clipboard.png" />
                    </button>
                    <button className={styles['header-nav']} onClick={facebookShare}>
                        <img src="/Header/facebook.png" />
                    </button>
                    <button className={styles['header-nav']} onClick={kakaoShare}>
                        <img src="/Header/kakaotalk.png" />
                    </button>
                </div>
            </div>
            {clip && createPortal(<Toast>URL이 복사되었습니다</Toast>, document.getElementById('root-one'))}
        </div>
    );
}
export default Header;
