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

  return { getAllReservations };
};

export default useReservationHook;
