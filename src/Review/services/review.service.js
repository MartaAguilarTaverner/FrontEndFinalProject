import axios from 'axios';

export const getAllReviews = (token) =>
  axios.get('http://localhost:3001/review', {
    headers: {}
  });
