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

// ===== 굿즈 다이어리 스티커 놀이 =====
const diaryArea = document.getElementById('diary-area');
const diaryPlaceholder = document.getElementById('diary-placeholder');
const stickerContainer = document.getElementById('sticker-container');

function addSticker(type) {
    diaryPlaceholder.classList.add('hidden');

    const sticker = document.createElement('div');
    sticker.className = 'absolute bg-white border border-[#F3C5A8] rounded-xl p-3 shadow-md cursor-move select-none flex items-center gap-1 font-cute text-sm font-bold active:scale-95 transition-transform z-20';

    let contents = '';
    if (type === 'sticker-bear') {
        contents = '🐻 농담곰 키링';
    } else if (type === 'sticker-goguma') {
        contents = '🥔 고로케';
    } else if (type === 'sticker-car') {
        contents = '🚗 부릉';
    } else if (type === 'sticker-heart') {
        contents = '💖 사랑해';
    }

    sticker.innerHTML = `${contents} <span class="text-xs text-rose-500 ml-2 hover:scale-125 cursor-pointer" onclick="this.parentElement.remove()">×</span>`;

    const areaWidth = diaryArea.clientWidth - 150;
    const areaHeight = diaryArea.clientHeight - 100;
    const randomX = Math.max(10, Math.floor(Math.random() * areaWidth));
    const randomY = Math.max(60, Math.floor(Math.random() * areaHeight));

    sticker.style.left = `${randomX}px`;
    sticker.style.top = `${randomY}px`;

    let isDragging = false;
    let offsetX, offsetY;

    const startDrag = (e) => {
        isDragging = true;
        sticker.style.zIndex = '30';
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;
        offsetX = clientX - sticker.offsetLeft;
        offsetY = clientY - sticker.offsetTop;
    };

    const doDrag = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (clientX && clientY) {
            let x = clientX - offsetX;
            let y = clientY - offsetY;

            const maxX = diaryArea.clientWidth - sticker.clientWidth;
            const maxY = diaryArea.clientHeight - sticker.clientHeight;
            x = Math.max(0, Math.min(x, maxX));
            y = Math.max(0, Math.min(y, maxY));

            sticker.style.left = `${x}px`;
            sticker.style.top = `${y}px`;
        }
    };

    const endDrag = () => {
        isDragging = false;
        sticker.style.zIndex = '20';
    };

    sticker.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', endDrag);

    sticker.addEventListener('touchstart', startDrag, { passive: true });
    document.addEventListener('touchmove', doDrag, { passive: true });
    document.addEventListener('touchend', endDrag);

    stickerContainer.appendChild(sticker);
}

function clearDiary() {
    stickerContainer.innerHTML = '';
    diaryPlaceholder.classList.remove('hidden');
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
