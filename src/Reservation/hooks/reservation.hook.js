import ReservationService from '../services/reservation.service';

const useReservationHook = () => {
  const reservationService = new ReservationService();

  const getAllReservations = async (token) => {
    let result;

    try {
      result = await reservationService.getAllReservations(token);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllReservationbyUser = async (token, userId) => {
    let result;

    try {
      result = await reservationService.getAllReservationbyUser(token, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllReservationbyRentedSpace = async (token, userId, rentedSpaceId) => {
    let result;

    try {
      result = await reservationService.getAllReservationbyRentedSpace(token, userId, rentedSpaceId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getReservationbyId = async (token, userId, reservationId) => {
    let result;

    try {
      result = await reservationService.getReservationbyId(token, userId, reservationId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const doReservation = async (token, userId, rentedSpaceId) => {
    let result;

    try {
      result = await reservationService.doReservation(token, userId, rentedSpaceId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const modifyReservation = async ({ token, userId, rentedSpaceId, reservationId }) => {
    let result;

    try {
      result = await reservationService.modifyReservation({ token, userId, rentedSpaceId, reservationId });
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteReservation = async (token, userId, reservationId) => {
    let result;

    try {
      result = await reservationService.deleteReservation(token, userId, reservationId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return {
    getAllReservations,
    getAllReservationbyUser,
    getAllReservationbyRentedSpace,
    getReservationbyId,
    doReservation,
    modifyReservation,
    deleteReservation
  };
};

export default useReservationHook;
