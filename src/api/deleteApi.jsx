//답변 삭제->답변페이지에서 id {answerId}를 통해 답변삭제
export default async function deleteQuestion(qd) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/questions/${qd}/`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('삭제 실패');
    }
}
