import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const RoomPage = () => {
    const { roomCode } = useParams();
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [remoteConnected, setRemoteConnected] = useState(false);
    const peerConnectionRef = useRef(null);
    const wsRef = useRef(null);

    useEffect(() => {
        const localVideo = localVideoRef.current;
        const remoteVideo = remoteVideoRef.current;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideo.srcObject = stream;

                // 마이크 감지
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                source.connect(analyser);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const detectSpeaking = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setIsSpeaking(volume > 10); // 말할 때 볼륨이 일정 이상이면 true
                    requestAnimationFrame(detectSpeaking);
                };
                detectSpeaking();

                const peerConnection = new RTCPeerConnection();
                peerConnectionRef.current = peerConnection;

                stream.getTracks().forEach(track => {
                    peerConnection.addTrack(track, stream);
                });

                peerConnection.onicecandidate = e => {
                    if (e.candidate && wsRef.current) {
                        wsRef.current.send(JSON.stringify({ type: 'ice-candidate', candidate: e.candidate, roomCode }));
                    }
                };

                peerConnection.ontrack = e => {
                    if (!remoteConnected) setRemoteConnected(true);
                    remoteVideo.srcObject = e.streams[0];
                };

                const ws = new WebSocket('ws://localhost:8080/ws/signaling');
                wsRef.current = ws;

                ws.onopen = () => {
                    ws.send(JSON.stringify({ type: 'join', roomCode }));
                };

                ws.onmessage = async (message) => {
                    const data = JSON.parse(message.data);
                    const pc = peerConnectionRef.current;

                    if (data.type === 'offer') {
                        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
                        const answer = await pc.createAnswer();
                        await pc.setLocalDescription(answer);
                        ws.send(JSON.stringify({ type: 'answer', answer, roomCode }));
                    } else if (data.type === 'answer') {
                        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
                    } else if (data.type === 'ice-candidate') {
                        try {
                            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
                        } catch (err) {
                            console.error('ICE candidate error', err);
                        }
                    }
                };
            }).catch(err => {
            console.error('Media error:', err);
        });

        return () => {
            peerConnectionRef.current?.close();
            wsRef.current?.close();
        };
    }, [roomCode]);

    return (
        <div className="room-container">
            <div className="room-header">
                <h2>회의방 코드: {roomCode}</h2>
                <button className="btn btn-red">회의 종료</button>
            </div>

            <div className="room-body">
                <div className="video-section">
                    <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`video-element ${isSpeaking ? 'speaking' : ''}`}
                    />
                    {remoteConnected && (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="video-element"
                        />
                    )}
                </div>
                <div className="side-section">
                    <div className="participants">
                        <h3>참여자</h3>
                        <ul>
                            <li>본인</li>
                            {remoteConnected && <li>상대방</li>}
                        </ul>
                    </div>
                    <div className="notes">
                        <h3>회의 메모</h3>
                        <textarea className="note-area" placeholder="메모를 입력하세요..."></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
