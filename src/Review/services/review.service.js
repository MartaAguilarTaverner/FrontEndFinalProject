import axios from 'axios';

export default class ReviewService {
  constructor() {
    this.url = 'http://localhost:3001/user';
  }

getAllReviews(token) {
  return axios.get('http://localhost:3001/review', {
    headers: {}
  });
}