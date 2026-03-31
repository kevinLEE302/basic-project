//답변 삭제->답변페이지에서 id {answerId}를 통해 답변삭제
export default async function deleteAnswer(ad) {
    const response = await fetch(`http://openmind-api.vercel.app/17-5/answers/${ad}/`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('삭제 실패');
    }
}
