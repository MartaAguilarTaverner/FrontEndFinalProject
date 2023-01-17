import axios from 'axios';

export const getAllReviews = (token) =>
  axios.get('http://localhost:3006/review', {
    headers: {}
  });
