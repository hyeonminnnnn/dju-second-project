package com.example.djuproject.room.dao;

import com.example.djuproject.room.dto.MeetingRoom;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MeetingRoomDao {
    void insertMeetingRoom(MeetingRoom room);

    MeetingRoom findByRoomCode(String roomCode);
}
