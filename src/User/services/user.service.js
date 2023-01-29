import axios from 'axios';

export default class UserService {
  constructor() {
    this.url = 'http://localhost:3001/user';
  }

  getAllUsers(token, userId) {
    return axios.post(
      this.url,
      {
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getAllUsersAdmin(token, userId) {
    return axios.post(
      `${this.url}/admin`,
      {
        data: {
          userId
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getAllUsersOwner(token, userId) {
    return axios.post(
      `${this.url}/owner`,
      { data: { userId } },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
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

  deleteUser(token, loggedId, userId) {
    return axios.delete(`${this.url}/${userId}`, {
      data: {
        userId: loggedId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
