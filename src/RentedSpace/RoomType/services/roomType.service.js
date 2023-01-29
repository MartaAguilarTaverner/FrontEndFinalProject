import axios from 'axios';

export default class RoomTypeService {
  constructor() {
    this.url = 'http://localhost:3001/roomtype';
  }

  getAllRoomType() {
    return axios.get(this.url);
  }

  getRoomTypebyId(roomTypeId) {
    return axios.get(`${this.url}/${roomTypeId}`);
  }

  createRoomType(token, userId, roomType) {
    return axios.post(
      `${this.url}`,
      {
        userId,
        roomType
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  modifyRoomType({ token, userId, roomTypeId, roomType }) {
    return axios.put(
      `${this.url}/${roomTypeId}`,
      {
        userId,
        roomType
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  deleteRoomType(token, userId, roomTypeId) {
    return axios.delete(`${this.url}/${roomTypeId}`, {
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
