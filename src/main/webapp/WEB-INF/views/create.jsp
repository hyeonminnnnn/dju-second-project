<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>회의방 생성 - 에이룸</title>
    <style>
        body {
            margin: 0;
            font-family: 'Segoe UI', sans-serif;
            background-color: #f9f9f9;
        }

        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 40px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            font-weight: bold;
            font-size: 18px;
        }

        .main-container {
            display: flex;
            justify-content: center;
            padding: 100px 20px;
            text-align: center;
        }

        .form-box {
            max-width: 500px;
            width: 100%;
            background: white;
            padding: 60px 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }

        h2 {
            font-size: 28px;
            margin-bottom: 40px;
        }

        .input-field {
            padding: 15px;
            width: 80%;
            border: 2px solid #2c3e50;
            border-radius: 30px;
            font-size: 16px;
            margin-bottom: 30px;
        }

        .btn {
            width: 80%;
            padding: 12px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            background-color: #3498db;
            color: white;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #2980b9;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        /* 모달 */
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }

        .modal-content {
            background-color: #fff;
            margin: 10% auto;
            padding: 30px;
            border: 2px solid #2c3e50;
            width: 400px;
            border-radius: 8px;
        }

        .modal-content h3 {
            margin-top: 0;
        }

        .close {
            color: #aaa;
            float: right;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
        }

        .label {
            margin: 10px 0 5px;
        }

        .note {
            color: red;
            font-size: 12px;
            margin-top: 10px;
        }
    </style>
</head>
<body>

<!-- 상단바 -->
<div class="top-bar">
    <div><a href="/">에이룸</a></div>
    <div><a href="#" id="openModalBtn">회의록 다운로드</a></div>
</div>

<!-- 본문 -->
<div class="main-container">
    <div class="form-box">
        <h2>회의방 생성하기</h2>
        <form action="/createRoom" method="post">
            <input type="text" name="roomName" class="input-field" placeholder="회의방 명을 입력해 주세요." required />
            <button type="submit" class="btn">생성하기</button>
        </form>
    </div>
</div>

<!-- 모달 -->
<div id="downloadModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeModalBtn">&times;</span>
        <h3>회의록 다운로드</h3>
        <p>회의방 생성 시 사용했던 6자리의 번호와 회의방 명을 입력해 주세요.</p>

        <div class="label">6자리 번호</div>
        <input type="text" class="input-field" maxlength="6" />

        <div class="label">회의방 명</div>
        <input type="text" class="input-field" />

        <button class="btn">다운로드</button>

        <div class="note">* 회의방 생성 후 24시간이 지나면 다운로드가 불가능합니다.</div>
    </div>
</div>

<!-- 모달 제어 스크립트 -->
<script>
    const modal = document.getElementById("downloadModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.getElementById("closeModalBtn");

    openBtn.onclick = function () {
        modal.style.display = "block";
    }

    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
</script>
</body>
</html>
