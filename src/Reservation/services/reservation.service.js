import axios from 'axios';

export default class ReservationService {
  constructor() {
    this.url = 'http://localhost:3001/reservation';
  }

  getAllReservations(token, userId) {
    return axios.get(`${this.url}`, {
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllReservationbyuser(token, userId) {
    return axios.get(`${this.url}/user`, {
      data: {
        userId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllReservationbyRentedSpace(token, userId, rentedSpaceId) {
    return axios.get(`${this.url}/rentedspace`, {
      data: {
        userId,
        rentedSpaceId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getReservationbyId(token, userId, reservationId) {
    return axios.get(`${this.url}/${reservationId}`, {
      data: {
        userId,
        reservationId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  doReservation(token, userId, rentedSpaceId, reservationId) {
    return axios.post(`${this.url}/${reservationId}`, {
      data: {
        userId,
        rentedSpaceId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  modifyReservation(token, userId, rentedSpaceId, reservationId) {
    return axios.put(`${this.url}/${reservationId}`, {
      data: {
        userId,
        rentedSpaceId,
        reservationId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteReservation(token, userId, reservationId) {
    return axios.delete(`${this.url}/${reservationId}`, {
      data: {
        userId,
        reservationId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
