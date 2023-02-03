import axios from 'axios';

export default class ReservationService {
  constructor() {
    this.url = 'http://localhost:3001/reservation';
  }

  getAllReservations(token, userId) {
    return axios.get(
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

  getAllReservationbyUser(token, userId, user) {
    return axios.post(
      `${this.url}/user`,
      {
        userId,
        user
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getAllReservationbyRentedSpace(token, userId, rentedSpaceId) {
    return axios.get(
      `${this.url}/rentedspace`,
      {
        userId,
        rentedSpaceId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getReservationbyId(token, userId, reservationId) {
    return axios.get(
      `${this.url}/${reservationId}`,
      {
        userId,
        reservationId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  doReservation(token, userId, rentedSpaceId) {
    return axios.post(
      `${this.url}`,
      {
        userId,
        rentedSpaceId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  modifyReservation(token, userId, rentedSpaceId, reservationId) {
    return axios.put(
      `${this.url}/${reservationId}`,
      {
        userId,
        rentedSpaceId,
        reservationId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  deleteReservation(token, userId, reservationId) {
    return axios.delete(
      `${this.url}/${reservationId}`,
      {
        userId,
        reservationId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
