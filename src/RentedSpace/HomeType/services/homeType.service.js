import axios from 'axios';

export default class HomeTypeService {
  constructor() {
    this.url = 'http://localhost:3001/hometype';
  }

  getAllHomeType() {
    return axios.get(this.url);
  }

  getOnebyId(homeTypeId) {
    return axios.get(`${this.url}/${homeTypeId}`);
  }

  createHomeType(token, userId, homeTypeId) {
    return axios.post(`${this.url}/${homeTypeId}`, {
      data: {
        userId
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  modifyHomeType(token, userId, homeTypeId) {
    return axios.put(`${this.url}/${homeTypeId}`, {
      data: {
        userId
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteHomeType(token, userId, homeTypeId) {
    return axios.delete(`${this.url}/${homeTypeId}`, {
      data: {
        userId
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
