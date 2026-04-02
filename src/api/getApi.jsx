//subject 목록 조회->리스트페이지 데이터 limit,offset
//,sort(”time” | “name”=>기본 최신순)

async function getSubjects({ limit, offset, sort }) {
    const response = await fetch(
        `https://openmind-api.vercel.app/17-5/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`,
    );
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
//subject 조회->개별피드,답변페이지,모달창 이미지 이름 데이터
//id {subjectId}를 통해 데이터 가져와서 사용
async function getSubject(id) {
    const response = await fetch(`https://openmind-api.vercel.app/17-5/subjects/${id}/`);
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}
//questions생성->개별피드 페이지,답변 페이지에서 질문 및 답변 리스트 데이터갖고오기
//offset,limit {subjectId}
async function getQuestions({ id, offset, limit }) {
    const response = await fetch(
        `https://openmind-api.vercel.app/17-5/subjects/${id}/questions/?limit=${limit}&offset=${offset}`,
    );
    if (!response.ok) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}

export { getQuestions, getSubject, getSubjects };
