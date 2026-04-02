import { Outlet, useParams } from 'react-router-dom';
import Header from './Header';
import { useState, useEffect, useRef } from 'react';
import { getSubject, getQuestions } from '../../api/getApi';
const limit = 5;
function Layout() {
    const [subject, setSubject] = useState({});
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const { id } = useParams();
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const currentRef = useRef(null);
    const offsetRef = useRef(0);

    /** 질문 작성 후 등: 첫 페이지부터 다시 불러옴 */
    const refetchQuestions = async () => {
        if (!id) return;
        try {
            setIsLoading(true);
            const a = await getQuestions({ limit, offset: 0, id });
            setData(a.results);
            setTotalCount(a.count);
            if (a.next === null) {
                setHasMore(false);
                offsetRef.current = 0;
            } else {
                setHasMore(true);
                offsetRef.current = limit;
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loadingQuestions = async () => {
        if (isLoading || !hasMore) return;
        const offset = offsetRef.current;
        try {
            setIsLoading(true);
            const a = await getQuestions({ limit, offset, id });
            setData((prev) => (offset === 0 ? a.results : [...prev, ...a.results]));
            setTotalCount(a.count);
            if (a.next === null) {
                setHasMore(false);
            } else {
                offsetRef.current = offset + limit;
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        setData([]);
        setHasMore(true);
        setTotalCount(0);
        offsetRef.current = 0;
        loadingQuestions();
    }, [id]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                loadingQuestions();
            }
        });
        if (currentRef.current) {
            observer.observe(currentRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [isLoading, hasMore, id]);
    //
    useEffect(() => {
        const getData = async () => {
            try {
                const a = await getSubject(id);
                setSubject(a);
            } catch (e) {
                console.log(e.message);
            }
        };
        getData();
    }, [id]);
    //
    return (
        <>
            <Header subject={subject} />
            <Outlet context={{ subject, data, totalCount, loadingQuestions, refetchQuestions }} />
            <div ref={currentRef} style={{ height: '1px' }}></div>
        </>
    );
}
export default Layout;
