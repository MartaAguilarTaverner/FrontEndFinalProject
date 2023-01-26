import axios from 'axios';

export default class ReviewService {
  constructor() {
    this.url = 'http://localhost:3001/review';
  }

  getAllReviews() {
    return axios.get(this.url);
  }

  getOneById(token, userid) {
    return axios.get(`${this.url}/${userid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
