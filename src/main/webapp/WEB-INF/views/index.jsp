<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>에이룸 - AI 화상회의</title>
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
            padding: 60px 40px;
        }

        .left-box {
            flex: 1;
            max-width: 500px;
            text-align: center;
            padding: 40px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            margin-right: 40px;
        }

        .input-field {
            padding: 15px;
            width: 80%;
            border: 2px solid #2c3e50;
            border-radius: 30px;
            font-size: 16px;
            margin-bottom: 20px;
        }

        .btn {
            display: block;
            width: 80%;
            padding: 10px;
            margin: 10px auto;
            font-size: 15px;
            border: none;
            border-radius: 5px;
            background-color: #3498db;
            color: white;
            cursor: pointer;
        }

        .btn-red {
            background-color: #e74c3c;
        }

        .btn:hover {
            background-color: #2980b9;
        }

        .btn-red:hover {
            background-color: #c0392b;
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

<!-- 상단 바 -->
<div class="top-bar">
    <div><a href="/" style="color: black; text-decoration: none;">에이룸</a></div>
    <div><a href="#" id="openModalBtn" style="color: black; text-decoration: none;">회의록 다운로드</a></div>
</div>

<!-- 본문 영역 -->
<div class="main-container">
    <!-- 왼쪽: 회의 참여/생성 -->
    <div class="left-box">
        <input type="text" class="input-field" placeholder="6자리의 번호를 입력해 주세요." />
        <a class="btn">회의 참여하기</a>
        <a class="btn btn-red" href="create" style="text-decoration: none;">회의방 생성하기</a>
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
