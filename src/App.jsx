import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Subject from './pages/subject/Subject';
import Answer from './pages/answer/Answer';
function App() {
    return (
        <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route element={<List />} path="/list"></Route>
            <Route element={<Layout />} path="/post/:id">
                <Route element={<Subject />} index></Route>
                <Route element={<Answer />} path="answer"></Route>
            </Route>
        </Routes>
    );
}

export default App;
