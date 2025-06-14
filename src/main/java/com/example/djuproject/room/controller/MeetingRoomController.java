package com.example.djuproject.room.controller;

import com.example.djuproject.room.dto.MeetingRoom;
import com.example.djuproject.room.service.MeetingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/rooms")
public class MeetingRoomController {

    //Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

    @Autowired
    private MeetingRoomService meetingRoomService;

    @PostMapping
    public Map<String, Object> createRoom(@RequestBody Map<String, String> payload) {
        String roomName = payload.get("name");
        String roomCode = meetingRoomService.createRoom(roomName);

        Map<String, Object> result = new HashMap<>();
        result.put("roomCode", roomCode);
        return result;
    }

    @GetMapping("/{roomCode}")
    public ResponseEntity<MeetingRoom> getRoomByCode(@PathVariable String roomCode) {
        try {
            MeetingRoom room = meetingRoomService.findByRoomCode(roomCode);
            if (room == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(room);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
