import axios from 'axios';

export default class MediaService {
  constructor() {
    this.url = 'http://localhost:3001/media';
  }

  getAllMedia() {
    return axios.get(this.url);
  }

  getMediabyId(mediaId) {
    return axios.get(`${this.url}/${mediaId}`);
  }

  createMedia({ token, userId, media }) {
    return axios.post(
      this.url,
      {
        userId,
        media
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  modifyMedia({ token, userId, media, mediaId }) {
    return axios.put(`${this.url}/${mediaId}`, {
      data: {
        userId,
        media
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteMedia(token, userId, mediaId) {
    return axios.delete(`${this.url}/${mediaId}`, {
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
