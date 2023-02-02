import axios from 'axios';

export default class ReviewService {
  constructor() {
    this.url = 'http://localhost:3001/review';
  }

  getAllReviews() {
    return axios.get(this.url);
  }

  getAllReviewbyUser(token, userId) {
    return axios.get(`${this.url}/user`, {
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getReviewbyId(token, reviewId) {
    return axios.get(`${this.url}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  doReview(token, userId, review) {
    return axios.post(this.url, {
      data: {
        userId,
        review
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  modifyReview(token, userId, reviewId) {
    return axios.put(`${this.url}/${reviewId}`, {
      data: {
        userId,
        reviewId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteReview(token, userId, reviewId) {
    return axios.delete(`${this.url}/${reviewId}`, {
      data: {
        userId,
        reviewId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
