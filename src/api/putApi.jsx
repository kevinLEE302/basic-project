// 답변 수정->답변페이지에서 {answerId}에 해당하는 답변 객체를 수정
export default async function putAnswer({ ad, content, isRejected = false }) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/answers/${ad}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, isRejected }),
    });
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
