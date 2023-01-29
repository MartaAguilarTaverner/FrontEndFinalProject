import MediaService from '../services/media.services';

const useMediaHook = () => {
  const mediaServices = new MediaService();

  const getAllMedia = async () => {
    let result;

    try {
      result = await mediaServices.getAllMedia();
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getMediaById = async (mediaId) => {
    let result;

    try {
      result = await mediaServices.getMediabyId(mediaId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const createMedia = async ({ token, userId, media, rentedSpaceId }) => {
    let result;

    try {
      const newMedia = {
        token,
        userId,
        media,
        rentedSpaceId
      };

      result = await mediaServices.createMedia(newMedia);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const modifyMedia = async ({ token, userId, media, mediaId }) => {
    let result;

    try {
      const updatedMedia = {
        token,
        userId,
        media,
        mediaId
      };

      result = await mediaServices.modifyMedia(updatedMedia);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteMedia = async (token, userId, mediaId) => {
    let result;

    try {
      result = await mediaServices.deleteMedia(token, userId, mediaId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { getAllMedia, getMediaById, createMedia, modifyMedia, deleteMedia };
};

export default useMediaHook;
