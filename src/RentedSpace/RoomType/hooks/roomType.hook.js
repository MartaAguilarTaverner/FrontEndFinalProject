import RoomTypeService from '../services/roomType.service';

const useRoomTypeHook = () => {
  const roomTypeService = new RoomTypeService();

  const getAllRoomType = async () => {
    let result;

    try {
      result = await roomTypeService.getAllRoomType();
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getRoomTypeById = async (roomTypeId) => {
    let result;

    try {
      result = await roomTypeService.getRoomTypebyId(roomTypeId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const createRoomType = async (token, userId, roomType) => {
    let result;

    try {
      result = await roomTypeService.createRoomType(token, userId, roomType);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const modifyRoomType = async ({ token, userId, roomTypeId, roomType }) => {
    let result;

    try {
      result = await roomTypeService.modifyRoomType({ token, userId, roomTypeId, roomType });
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteRoomType = async (token, userId, roomTypeId) => {
    let result;

    try {
      result = await roomTypeService.deleteRoomType(token, userId, roomTypeId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { getAllRoomType, getRoomTypeById, createRoomType, modifyRoomType, deleteRoomType };
};

export default useRoomTypeHook;
