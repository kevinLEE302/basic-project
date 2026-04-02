import { Outlet, useParams } from 'react-router-dom';
import Header from './Header';
import { useState, useEffect } from 'react';
import { getSubject, getQuestions } from '../../api/getApi';
const offset = 0;
const limit = 5;
function Layout() {
    const [subject, setSubject] = useState({});
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const { id } = useParams();

    const refetchQuestions = async () => {
        try {
            const a = await getQuestions({ id, offset, limit });
            setData(a.results);
            setTotalCount(a.count);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        refetchQuestions();
    }, [id]);

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

    return (
        <>
            <Header subject={subject} />
            <Outlet context={{ subject, data, totalCount, refetchQuestions }} />
        </>
    );
}
export default Layout;
