import { useState, useEffect } from 'react';
import Dropout from '../../components/list/dropout/Dropout';
import { getSubjects } from '../../api/getApi';
import Pagination from '../../components/list/pagination/Pagination';
import CardList from '../../components/list/card/CardList';
import styles from './List.module.css';
import { useNavigate } from 'react-router-dom';
const PAGESIZE = 5;

function List() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [sort, setSort] = useState('name');
    const [limit, setLimit] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const totalPage = Math.ceil(totalCount / limit);
    const currentGroup = Math.ceil(currentPage / PAGESIZE);
    const startIndex = (currentGroup - 1) * PAGESIZE + 1;
    const lastIndex = Math.min(totalPage, startIndex + PAGESIZE - 1);
    const offset = (currentPage - 1) * limit;
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const a = await getSubjects({ offset, limit, sort });
                setTotalCount(a.count);
                setData(a.results);
            } catch (e) {
                console.log(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, [offset, limit, sort]);

    useEffect(() => {
        const matchMedia = window.matchMedia('(max-width:868px)');
        const handleChange = (e) => {
            setLimit(e.matches ? 6 : 8);
        };
        handleChange(matchMedia);
        matchMedia.addEventListener('change', handleChange);
        return () => {
            matchMedia.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [sort]);

    const handleNavClick = (id) => {
        navigate(`/post/${id}`);
    };

    const handleToggle = (a) => {
        setSort(a);
    };

    return (
        <div className={styles.a}>
            <Dropout onClick={handleToggle} sort={sort} />
            <Pagination
                currentPage={currentPage}
                startIndex={startIndex}
                lastIndex={lastIndex}
                totalPage={totalPage}
                onPageChange={setCurrentPage}
            />
            <CardList data={data} onClick={handleNavClick} />
        </div>
    );
}
export default List;
