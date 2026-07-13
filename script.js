// ===== 공통 스크립트 (모든 페이지 공유) =====

// 모바일 햄버거 메뉴 토글
function toggleMenu() {
    const m = document.getElementById('mobile-menu');
    if (m) m.classList.toggle('hidden');
}

// ===== 매력 포인트 1: 변신(모핑) 뷰어 =====
const morphImg = document.getElementById('morph-img');
const morphViewerBox = document.getElementById('morph-viewer-box');

function morphBear(type) {
    if (type === 'banana') {
        morphImg.src = 'images/바나나누끼2.png';
        morphImg.alt = '바나나농담곰';
        morphViewerBox.style.backgroundColor = '#FFFFFF';
    } else if (type === 'potato') {
        morphImg.src = 'images/고구마누끼.png';
        morphImg.alt = '고구마농담곰';
        morphViewerBox.style.backgroundColor = '#FFFFFF';
    } else if (type === 'yakgwa') {
        morphImg.src = 'images/약과누끼.png';
        morphImg.alt = '약과농담곰';
        morphViewerBox.style.backgroundColor = '#FFFFFF';
    }

    // 깜찍한 등장 애니메이션
    morphImg.style.transform = 'scale(0.85)';
    setTimeout(() => {
        morphImg.style.transform = 'scale(1.05)';
        setTimeout(() => {
            morphImg.style.transform = 'scale(1)';
        }, 100);
    }, 50);

    // 버튼 하이라이트 제어
    const buttons = document.querySelectorAll('.morph-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#E28F6B]', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    event.target.classList.remove('bg-gray-200', 'text-gray-700');
    event.target.classList.add('bg-[#E28F6B]', 'text-white');
}

// ===== 매력 포인트 2: 감정 표정 체인저 =====
const feelingImg = document.getElementById('feeling-img');
const feelingMap = {
    crying: { src: 'images/오열곰이미지.jpg', alt: '오열곰' },
    proud:  { src: 'images/우쭐곰.jpg', alt: '우쭐곰' },
    breath: { src: 'images/파란숨참음.jpg', alt: '숨참곰' },
    hurt:   { src: 'images/상처받았곰.webp', alt: '상처받았곰' },
};
function expressFeel(feel) {
    const item = feelingMap[feel];
    if (!item) return;
    feelingImg.src = item.src;
    feelingImg.alt = item.alt;
    feelingImg.style.transform = 'scale(0.9)';
    setTimeout(() => { feelingImg.style.transform = 'scale(1)'; }, 100);
}

// ===== 세계관 조연 말풍선 =====
const bubbleBox = document.getElementById('friend-bubble-box');
const bubbleAvatar = document.getElementById('bubble-avatar');
const bubbleTitle = document.getElementById('bubble-title');
const bubbleText = document.getElementById('bubble-text');

function showFriendBubble(id, name, text, imgSrc) {
    bubbleBox.classList.remove('hidden');
    bubbleAvatar.src = imgSrc;
    bubbleAvatar.alt = name;
    bubbleAvatar.classList.remove('hidden');
    bubbleTitle.textContent = name;
    bubbleText.textContent = `"${text}"`;
    bubbleBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
function closeFriendBubble() {
    bubbleBox.classList.add('hidden');
}

// ===== 상호작용 이미지 미리 불러오기 (첫 클릭 지연 방지) =====
// 변신/감정/조연 말풍선 이미지는 클릭해야 처음 로드되어 순간 버벅임이 생김.
// 페이지 로드 시 미리 받아두면 첫 클릭부터 바로 전환된다.
(function preloadInteractiveImages() {
    const sources = [
        // 변신 곰
        'images/바나나누끼2.png', 'images/고구마누끼.png', 'images/약과누끼.png',
        // 감정 표정
        'images/오열곰이미지.jpg', 'images/우쭐곰.jpg', 'images/파란숨참음.jpg', 'images/상처받았곰.webp',
        // 세계관 조연 말풍선
        'images/고로케들.jpg', 'images/퍼그카.jpg', 'images/가젤가젤.png',
    ];
    sources.forEach(src => {
        const img = new Image();
        img.src = src;
    });
})();
