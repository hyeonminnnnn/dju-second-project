import React from 'react';
import '../App.css';

const CreatePage = () => {
    return (
        <div>
            <div className="top-bar">
                <div><a href="/" style={{ textDecoration: 'none', color: 'black' }}>에이룸</a></div>
                <div className="clickable">회의록 다운로드</div>
            </div>

            <div className="main-container">
                <div className="left-box">
                    <h2>회의방 생성하기</h2>
                    <form>
                        <input type="text" className="input-field" placeholder="회의방 명을 입력해 주세요." required />
                        <button type="submit" className="btn">생성하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
