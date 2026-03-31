import Button from '../../components/common/button/Button';
import NavButton from '../../components/common/button/NavButton';
import Input from '../../components/common/input/Input';
import styles from './Home.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSubject } from '../../api/postApi';
function Home() {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const data = await postSubject(value);
            localStorage.setItem('id', data.id);
            navigate(`/post/${data.id}/answer`);
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    const handleClick = () => {
        navigate('/list');
    };
    return (
        <div className={styles['home-container']}>
            <div className={styles['home-backimage']}></div>
            <div className={styles['home-wrapper']}>
                <picture>
                    <source srcSet="/Home/mobile-logo.png" media="(max-width:375px)" />
                    <img src="/Home/logo.png" className={styles['home-logo']} />
                </picture>
                <NavButton position={styles['home-Nav']} onClick={handleClick}>
                    질문하러 가기
                </NavButton>
                <div className={styles['home-form-wrapper']}>
                    <form className={styles['home-form']} onSubmit={handleSubmit}>
                        <Input placeholder={'이름을 입력하세요'} onChange={handleChange} value={value} />
                        <Button disabled={!value}>{isLoading ? '로딩중...' : '질문 받기'}</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Home;
