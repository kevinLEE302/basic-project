const KAKAO_JS_KEY = 'f2e76608078b6a3dbf2f879ca16380b9';

export function kakaoShare() {
    if (!window.Kakao) {
        console.error('Kakao SDK가 없습니다.');
        return;
    }

    if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
    }

    window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '오픈마인드',
            description: '질문하러 와주세요.',
            imageUrl: 'https://via.placeholder.com/300x200',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
            },
        },
        buttons: [
            {
                title: '보러가기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
        ],
    });
}
