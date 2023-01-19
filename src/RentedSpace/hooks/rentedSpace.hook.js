import { useDispatch } from 'react-redux';
import RentedSpaceService from '../services/rentedSpace.service';

const useRentedSpaceHook = () => {
  const dispatch = useDispatch();
  const rentedSpaceService = new RentedSpaceService();

  const getAllRentedSpaces = async () => {
    let result;

    try {
      result = await rentedSpaceService.getAllRentedSpaces();
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { getAllRentedSpaces };
};

export default useRentedSpaceHook;
