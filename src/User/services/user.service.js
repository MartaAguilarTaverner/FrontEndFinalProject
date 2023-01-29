import axios from 'axios';

export default class UserService {
  constructor() {
    this.url = 'http://localhost:3001/user';
  }

  getAllUsers(token, userId) {
    return axios.get(this.url, userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllUsersAdmin(token, userId) {
    return axios.get(`${this.url}/admin`, userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllUsersOwner(token, userId) {
    return axios.get(`${this.url}/owner`, userId, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getUserById(token, userId) {
    return axios.get(`${this.url}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  login({ email, password }) {
    return axios.post(`${this.url}/login`, {
      email,
      password
    });
  }

  register(user) {
    return axios.post(`${this.url}/register`, user);
  }

  modifyUser(token, user, userId) {
    return axios.put(`${this.url}/modify/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteUser(token, userId) {
    return axios.delete(`${this.url}/delete/${userId}`, {
      data: {
        id: userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
