import axios from 'axios';

export default class MediaService {
  constructor() {
    this.url = 'http://localhost:3001/review';
  }

  getAllMedia() {
    return axios.get(this.url);
  }

  getMediabyId(mediaId) {
    return axios.get(`${this.url}/${mediaId}`);
  }

  createMedia(token, userId, rentedSpaceId, mediaId) {
    return axios.post(`${this.url}/${mediaId}`, {
      data: {
        userId,
        rentedSpaceId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  modifyMedia(token, userId, rentedSpaceId, mediaId) {
    return axios.put(`${this.url}/${mediaId}`, {
      data: {
        userId,
        rentedSpaceId,
        mediaId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteMedia(token, userId, rentedSpaceId, mediaId) {
    return axios.delete(`${this.url}/${mediaId}`, {
      data: {
        userId,
        rentedSpaceId,
        mediaId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
