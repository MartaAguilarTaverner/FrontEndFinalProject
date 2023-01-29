import RentedSpaceService from '../services/rentedSpace.service';

const useRentedSpaceHook = () => {
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

  const getAllRentedSpaceByRoomType = async (roomTypeId) => {
    let result;

    try {
      result = await rentedSpaceService.getAllRentedSpaceByRoomType(roomTypeId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllRentedSpaceByHomeType = async (homeTypeId) => {
    let result;

    try {
      result = await rentedSpaceService.getAllRentedSpaceByHomeType(homeTypeId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getRentedSpaceById = async (rentedSpaceId) => {
    let result;

    try {
      result = await rentedSpaceService.getRentedSpaceById(rentedSpaceId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const createRentedSpace = async (token, userId, rentedSpace) => {
    let result;

    try {
      result = await rentedSpaceService.createRentedSpace(token, userId, rentedSpace);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const modifyRentedSpace = async ({ token, userId, rentedSpaceId, rentedSpace }) => {
    let result;

    try {
      result = await rentedSpaceService.modifyRentedSpace({ token, userId, rentedSpaceId, rentedSpace });
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteRentedSpace = async (token, userId, rentedSpaceId) => {
    let result;

    try {
      result = await rentedSpaceService.deleteRentedSpace(token, userId, rentedSpaceId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return {
    getAllRentedSpaces,
    getAllRentedSpaceByHomeType,
    getAllRentedSpaceByRoomType,
    getRentedSpaceById,
    createRentedSpace,
    modifyRentedSpace,
    deleteRentedSpace
  };
};

export default useRentedSpaceHook;
