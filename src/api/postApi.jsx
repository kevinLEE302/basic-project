//subject 생성->계정생성(메인페이지)
async function postSubject(name) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/subjects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
//question 생성->개별피드페이지에서 질문 작성하기 버튼을 통해
//url id {subjectId}에 해당하는 subject에게 모달창으로 post
async function postQuestion({ content, id }) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/subjects/${id}/questions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
//reaction 생성->개별피드 및 답변페이지에서 대상 목록조회 results
//데이터의 아이디{questionId}를 통해 type을 post
async function postReaction({ qd, type }) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/questions/${qd}/reaction/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
    });
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
//answer생성->답변페이지에서 대상 목록조회results데이터의
//아이디{questionId}를 통해 폼에 작성 한 값을 보냄
async function postAnswer({ qd, content, isRejected = false }) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/questions/${qd}/answers/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isRejected }),
    });
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
export { postAnswer, postQuestion, postReaction, postSubject };
