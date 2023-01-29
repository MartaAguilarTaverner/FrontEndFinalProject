import HomeTypeService from '../services/homeType.service';

const useHomeTypeHook = () => {
  const homeTypeService = new HomeTypeService();

  const getAllHomeType = async () => {
    let result;

    try {
      result = await homeTypeService.getAllHomeType();
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getHomeTypeById = async (homeTypeId) => {
    let result;

    try {
      result = await homeTypeService.getHomeTypebyId(homeTypeId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const createHomeType = async (token, userId, home) => {
    let result;

    try {
      result = await homeTypeService.createHomeType(token, userId, home);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const modifyHomeType = async ({ token, userId, homeTypeId, home }) => {
    let result;

    try {
      result = await homeTypeService.modifyHomeType({ token, userId, homeTypeId, home });
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteHomeType = async (token, userId, homeTypeId) => {
    let result;

    try {
      result = await homeTypeService.deleteHomeType(token, userId, homeTypeId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { getAllHomeType, getHomeTypeById, createHomeType, modifyHomeType, deleteHomeType };
};

export default useHomeTypeHook;
