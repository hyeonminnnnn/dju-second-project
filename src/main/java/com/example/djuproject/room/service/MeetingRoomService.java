package com.example.djuproject.room.service;

import com.example.djuproject.room.dao.MeetingRoomDao;
import com.example.djuproject.room.dto.MeetingRoom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class MeetingRoomService {

    @Autowired
    private MeetingRoomDao meetingRoomDao;

    public String createRoom(String roomName) {
        String roomCode = generateRoomCode();
        MeetingRoom room = new MeetingRoom();
        room.setRoomCode(roomCode);
        room.setRoomName(roomName);

        meetingRoomDao.insertMeetingRoom(room);
        return roomCode;
    }

    private String generateRoomCode() {
        Random random = new Random();
        return String.valueOf(100000 + random.nextInt(900000));
    }

    public MeetingRoom findByRoomCode(String roomCode) {
        System.out.println("💬 [Service] roomCode 전달됨: " + roomCode);
        MeetingRoom room = meetingRoomDao.findByRoomCode(roomCode);
        System.out.println("💬 [Service] room 조회 결과: " + room);
        return room;
    }
}
