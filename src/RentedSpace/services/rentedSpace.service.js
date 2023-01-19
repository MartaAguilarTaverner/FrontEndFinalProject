import axios from 'axios';

export default class RentedSpaceService {
  constructor() {
    this.url = 'http://localhost:3001/rentedSpace';
  }

  getImages() {
    return axios('data/photos.json');
  }

  getAllRentedSpaces() {
    return axios(this.api);
  }
}
