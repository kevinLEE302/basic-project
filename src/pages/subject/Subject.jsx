import Form from '../../components/post/form/Form';
import { useState } from 'react';
function Subject() {
    const [content, setContent] = useState('');
    return (
        <div>
            <Form value={content} onChange={setContent}>
                답변 완료
            </Form>
        </div>
    );
}
export default Subject;
