import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MainPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [roomCode, setRoomCode] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = async () => {
        if (!roomCode || roomCode.length !== 6) {
            alert("6자리 방 번호를 입력해주세요.");
            return;
        }

        try {
            await axios.get(`/api/rooms/${roomCode}`);
            navigate(`/room/${roomCode}`);
        } catch (error) {
            alert("존재하지 않는 회의방입니다.");
        }
    };

    return (
        <div>
            <div className="top-bar">
                <div>에이룸</div>
                <div onClick={() => setShowModal(true)} className="clickable">회의록 다운로드</div>
            </div>

            <div className="main-container">
                <div className="left-box">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="6자리의 번호를 입력해 주세요."
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        maxLength={6}
                    />
                    <button className="btn" onClick={handleJoinRoom}>회의 참여하기</button>
                    <button className="btn btn-red" onClick={() => navigate('/create')}>회의방 생성하기</button>
                </div>
            </div>

            {showModal && (
                <div className="modal" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>회의록 다운로드</h3>
                        <input type="text" className="input-field" placeholder="6자리 번호" />
                        <input type="text" className="input-field" placeholder="회의방 명" />
                        <button className="btn">다운로드</button>
                        <div className="note">* 회의방 생성 후 24시간이 지나면 다운로드가 불가능합니다.</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
