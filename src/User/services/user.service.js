import axios from 'axios';

export default class UserService {
  constructor() {
    this.url = 'http://localhost:3001/user';
  }

  getAllUsers(token, userid) {
    return axios.post(this.url, {
      data: {
        userid
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllUsersAdmin(token, userid) {
    return axios.get(`${this.url}/admin`, userid, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllUsersOwner(token, userid) {
    return axios.get(`${this.url}/owner`, userid, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getUserById(token, userid) {
    return axios.get(`${this.url}/${userid}`, {
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

  modifyUser(user, userId, token) {
    return axios.put(`${this.url}/modifyuser`, user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
