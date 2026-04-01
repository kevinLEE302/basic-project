import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { kakaoShare } from '../../utils/kakaoShare';
import { facebookShare } from '../../utils/facebook';
import { handleClipboard } from '../../utils/clipboard';
import { createPortal } from 'react-dom';
import Toast from '../common/toast/Toast';
function Header({ subject }) {
    const [clip, setClip] = useState(false);
    const navigate = useNavigate();
    const timeout = useRef(null);

    return (
        <div className={styles['header-container']}>
            <div className={styles['header-backimage']}></div>
            <div className={styles['header-wrapper']}>
                <button className={styles['header-logo']} onClick={() => navigate('/')}>
                    <picture>
                        <source srcSet="/Header/mobile-logo.png" media="(max-width:375px)" />
                        <img src="/Header/pc-logo.png" />
                    </picture>
                </button>
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
