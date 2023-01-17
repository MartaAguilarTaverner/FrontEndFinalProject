import axios from 'axios';

export const getAllUsers = (token, userId) =>
  axios.post('http://localhost:3006/user', {
    data: {
      userId
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getAllUsersAdmin = (token, userid) =>
  axios.get('http://localhost:3006/user/admin', userid, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getAllUsersOwner = (token, userid) =>
  axios.get('http://localhost:3006/user/owner', userid, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const getOneUser = (token) =>
  axios.get('http://localhost:3006/user/:id', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const doLogin = ({ email, password }, token) =>
  axios.post('http://localhost:3006/user/login', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    email,
    password
  });

export const doRegister = (user, token) =>
  axios.post('http://localhost:3006/user/register', user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const modifyUser = (user, token) =>
  axios.put('http://localhost:3006/user/modify', user, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
