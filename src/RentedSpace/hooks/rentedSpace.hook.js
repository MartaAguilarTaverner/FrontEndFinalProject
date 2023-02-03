import { useNavigate } from 'react-router-dom';

import RentedSpaceService from '../services/rentedSpace.service';
import MediaService from '../Media/services/media.services';

import useHomeTypeHook from '../HomeType/hooks/homeType.hook';
import useRoomTypeHook from '../RoomType/hooks/roomType.hook';

const useRentedSpaceHook = () => {
  const rentedSpaceService = new RentedSpaceService();
  const mediaService = new MediaService();
  const { getAllHomeType } = useHomeTypeHook();
  const { getAllRoomType } = useRoomTypeHook();
  const { navigate } = useNavigate();

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
      const media = {};

      rentedSpace.mediaList.forEach((mediaItem, index) => {
        media[`img${index + 1}`] = mediaItem;
      });

      const resultMedia = await mediaService.createMedia({ token, userId, media });

      delete rentedSpace.mediaList;

      rentedSpace.mediaId = resultMedia.data.id;

      result = await rentedSpaceService.createRentedSpace(token, userId, rentedSpace);

      if (result.data) {
        navigate('/');
      }
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

  const getDropdownValues = async () => {
    let homeTypeList;
    let roomTypeList;

    try {
      const homeTypeResult = await getAllHomeType();
      const roomTypeResult = await getAllRoomType();

      homeTypeList = homeTypeResult.data.map((homeType) => ({ label: homeType.name, value: homeType.id }));
      roomTypeList = roomTypeResult.data.map((roomType) => ({ label: roomType.name, value: roomType.id }));
    } catch (error) {
      alert(error);
    }

    return {
      homeTypeList,
      roomTypeList
    };
  };

  return {
    getAllRentedSpaces,
    getAllRentedSpaceByHomeType,
    getAllRentedSpaceByRoomType,
    getRentedSpaceById,
    createRentedSpace,
    modifyRentedSpace,
    deleteRentedSpace,
    getDropdownValues
  };
};

export default useRentedSpaceHook;
