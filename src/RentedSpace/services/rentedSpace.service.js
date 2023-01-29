import axios from 'axios';

export default class RentedSpaceService {
  constructor() {
    this.url = 'http://localhost:3001/rentedSpace';
  }

  getAllRentedSpaces() {
    return axios.get(this.url);
  }

  getAllRentedSpacebyRoomType(roomTypeId) {
    return axios.get(`${this.url}/roomtype/${roomTypeId}`);
  }

  getAllRentedSpaceByHomeType(homeTypeId) {
    return axios.get(`${this.url}/hometype/${homeTypeId}`);
  }

  getRentedSpaceByMediaId(mediaId) {
    return axios.get(`${this.url}/media/${mediaId}`);
  }

  getRentedSpaceById(rentedSpaceId) {
    return axios.get(`${this.url}/${rentedSpaceId}`);
  }

  createRentedSpace(token, userId, rentedSpace) {
    return axios.post(
      `${this.url}`,
      {
        data: {
          userId,
          rentedSpace
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  modifyRentedSpace({ token, userId, rentedSpaceId, rentedSpace }) {
    return axios.put(
      `${this.url}/${rentedSpaceId}`,
      {
        data: {
          userId,
          rentedSpace
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  deleteRentedSpace(token, userId, rentedSpaceId) {
    return axios.delete(
      `${this.url}/${rentedSpaceId}`,
      {
        data: {
          userId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
