import axios from 'axios';

export default class UserService {
  constructor() {
    this.url = 'http://localhost:3001/user';
  }

  getAllUsers(token, userId) {
    return axios.post(this.url, {
      data: {
        userId
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

  getUserById(token, userId) {
    return axios.get(`${this.url}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  login({ email, password }) {
    return axios.post('http://localhost:3001/user/login', {
      email,
      password
    });
  }

  register(user) {
    return axios.post('http://localhost:3001/user/register', user);
  }

  modifyUser(user, token) {
    return axios.put('http://localhost:3001/user/modify', user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
