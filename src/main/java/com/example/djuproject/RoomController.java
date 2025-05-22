package com.example.djuproject;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @PostMapping
    public Map<String, Object> createRoom(@RequestBody Map<String, String> payload) {
        String roomName = payload.get("name");
        String roomCode = generateRoomCode(); // 6자리 코드 생성

        // TODO: DB 저장 로직도 여기에 추가 가능
        System.out.println("회의방명: " + roomName + ", 코드: " + roomCode);

        Map<String, Object> response = new HashMap<>();
        response.put("roomCode", roomCode);
        return response;
    }

    private String generateRoomCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }
}
