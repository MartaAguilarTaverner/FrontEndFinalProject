import axios from 'axios';

export default class RentedSpaceService {
  constructor() {
    this.url = 'http://localhost:3001/rentedSpace';
  }

  getAllRentedSpaces(rentedSpaceId) {
    return axios.post(this.url, {
      data: {
        rentedSpaceId
      }
    });
  }

  getAllRentedSpacebyRoomType(rentedSpaceId, roomTypeId) {
    return axios.get(`${this.url}/roomtype`, rentedSpaceId, roomTypeId);
  }

  getImages() {
    return axios('data/photos.json');
  }
}
