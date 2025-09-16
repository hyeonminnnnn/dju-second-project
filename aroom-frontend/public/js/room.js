//C:\Program Files\WindowsApps\ngrok.ngrok_3.24.0.0_x64__1g87z0zv29zzc
//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
'use strict';

const localVideo = document.querySelector('#localVideo');
const remoteVideo = document.querySelector('#remoteVideo');
const roomCodeDisplay = document.querySelector('#room-code-display');

let pc;
let localStream;
let room = window.location.hash.substring(1);

// 페이지에 방 코드 표시
if (roomCodeDisplay) {
    roomCodeDisplay.textContent = room;
}

// 미디어가 준비되었을 때 resolve되는 Promise
let mediaReadyResolver;
const mediaReadyPromise = new Promise(resolve => {
    mediaReadyResolver = resolve;
});

// --- 1. 시그널링 서버 연결 ---
const socket = io.connect();

if (room) {
    socket.emit('create or join', room);
}

// --- 2. 서버로부터 오는 시그널링 메시지 처리 ---
socket.on('created', (room, clientId) => {
    console.log(`Created room ${room}, my ID is ${clientId}`);
    getMedia();
});

socket.on('joined', (room, clientId) => {
    console.log(`Joined room ${room}, my ID is ${clientId}`);
    getMedia();
});

socket.on('peer-joined', async () => {
    console.log('Another peer joined. Waiting for media...');
    await mediaReadyPromise; // 미디어 준비까지 대기
    console.log('Media is ready. Creating offer.');
    createPeerConnection();
    sendOffer();
});

socket.on('message', async (message) => {
    console.log('Received message:', message.type);
    await mediaReadyPromise; // 미디어 준비까지 대기

    if (message.type === 'offer') {
        createPeerConnection();
        await pc.setRemoteDescription(new RTCSessionDescription(message));
        sendAnswer();
    } else if (message.type === 'answer') {
        await pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate') {
        if (pc) {
            await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
        }
    }
});

socket.on('full', (room) => {
    alert(`Room ${room} is full.`);
});

// --- 3. WebRTC 로직 ---
async function getMedia() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        mediaReadyResolver(); // 미디어 준비 완료 신호
    } catch (e) {
        console.error('getUserMedia error:', e);
        alert('카메라/마이크를 가져오는 데 실패했습니다.');
    }
}

function createPeerConnection() {
    if (pc) return;
    try {
        const iceServers = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                // ❗❗ 여기에 Metered.ca에서 발급받은 실제 정보를 채워 넣으세요 ❗❗
                {
                    urls: "stun:stun.relay.metered.ca:80",
                },
                {
                    urls: "turn:seoul.relay.metered.ca:80",
                    username: "487ac2f784cdfadf7f867ee9",
                    credential: "Cwlu8ByqjbOV+goP",
                },
                {
                    urls: "turn:seoul.relay.metered.ca:80?transport=tcp",
                    username: "487ac2f784cdfadf7f867ee9",
                    credential: "Cwlu8ByqjbOV+goP",
                },
                {
                    urls: "turn:seoul.relay.metered.ca:443",
                    username: "487ac2f784cdfadf7f867ee9",
                    credential: "Cwlu8ByqjbOV+goP",
                },
                {
                    urls: "turns:seoul.relay.metered.ca:443?transport=tcp",
                    username: "487ac2f784cdfadf7f867ee9",
                    credential: "Cwlu8ByqjbOV+goP",
                }
            ]
        };
        pc = new RTCPeerConnection(iceServers);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('message', { type: 'candidate', candidate: event.candidate }, room);
            }
        };

        pc.ontrack = (event) => {
            if (remoteVideo.srcObject !== event.streams[0]) {
                remoteVideo.srcObject = event.streams[0];
            }
        };

        localStream.getTracks().forEach(track => {
            pc.addTrack(track, localStream);
        });
    } catch (e) {
        console.error('PeerConnection 생성 실패:', e);
    }
}

async function sendOffer() {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit('message', offer, room);
}

async function sendAnswer() {
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit('message', answer, room);
}