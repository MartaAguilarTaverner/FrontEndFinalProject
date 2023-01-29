import axios from 'axios';

export default class HomeTypeService {
  constructor() {
    this.url = 'http://localhost:3001/hometype';
  }

  getAllHomeType() {
    return axios.get(this.url);
  }

  getHomeTypebyId(homeTypeId) {
    return axios.get(`${this.url}/${homeTypeId}`);
  }

  createHomeType(token, userId, home) {
    return axios.post(
      `${this.url}`,
      {
        userId,
        home
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  modifyHomeType({ token, userId, homeTypeId, home }) {
    return axios.put(
      `${this.url}/${homeTypeId}`,
      {
        userId,
        home
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  deleteHomeType(token, userId, homeTypeId) {
    return axios.delete(`${this.url}/${homeTypeId}`, {
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
