import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const CreatePage = () => {
    const [roomName, setRoomName] = useState('');
    const [roomCode, setRoomCode] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/rooms',
                { name: roomName },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            setRoomCode(response.data.roomCode); // 응답으로 받은 6자리 코드 표시
        } catch (error) {
            console.error('회의방 생성 실패:', error);
            alert('회의방 생성에 실패했습니다.');
        }
    };

    return (
        <div>
            <div className="top-bar">
                <div><a href="/" style={{ textDecoration: 'none', color: 'black' }}>에이룸</a></div>
                <div className="clickable">회의록 다운로드</div>
            </div>

            <div className="main-container">
                <div className="left-box">
                    <h2>회의방 생성하기</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="회의방 명을 입력해 주세요."
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn">생성하기</button>
                    </form>

                    {roomCode && (
                        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                            생성된 회의방 번호: <span style={{ color: '#3498db' }}>{roomCode}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
