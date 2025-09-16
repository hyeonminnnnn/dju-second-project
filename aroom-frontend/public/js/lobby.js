'use strict';

const createRoomBtn = document.querySelector('#create-room-btn');
const joinRoomForm = document.querySelector('#join-room-form');

// '새 회의방 생성하기' 버튼 클릭 시
createRoomBtn.addEventListener('click', () => {
    // 6자리 랜덤 숫자 코드 생성
    const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
    // 생성된 코드를 주소 뒤에 붙여서 room.html로 이동
    window.location.href = `room.html#${roomCode}`;
});

// '입장하기' 폼 제출 시
joinRoomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const roomCodeInput = document.querySelector('#room-code-input');
    const enteredCode = roomCodeInput.value.trim();

    if (enteredCode) {
        // 입력된 코드를 주소 뒤에 붙여서 room.html로 이동
        window.location.href = `room.html#${enteredCode}`;
    }
});