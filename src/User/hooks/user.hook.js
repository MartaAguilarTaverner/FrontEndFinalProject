/* eslint-disable no-alert */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import UserService from '../services/user.service';

import { login } from '../store/user.store';

import { checkIfDataIsValid, checkIfRegisterDataIsValid } from '../../utils/datacheck.utils';

const useUserHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userService = new UserService();

  const onSubmitLogin = async (email, password) => {
    try {
      if (!checkIfDataIsValid(email, password)) {
        alert('The email or password is not correct');

        return;
      }

      const userData = {
        email,
        password
      };

      const result = await userService.login(userData);

      if (result.data) {
        dispatch(login(result.data));

        navigate('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  const onSubmitRegister = async ({ name, surname, email, phoneNumber, password, age, profileImg }) => {
    try {
      if (checkIfRegisterDataIsValid(name, surname, email, phoneNumber, password, age, profileImg)) {
        alert('Something went wrong while trying to register with this data');

        return;
      }

      const registerData = {
        name,
        surname,
        email,
        password,
        age,
        phoneNumber,
        profileImg
      };

      const result = await userService.register(registerData);

      if (result.data) {
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    }
  };

  const getUserById = async (token, userId) => {
    let result;

    try {
      result = await userService.getUserById(token, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllUsers = async (token, userId) => {
    let result;

    try {
      result = await userService.getAllUsers(token, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllUserOwner = async (token, userId) => {
    let result;

    try {
      result = await userService.getAllUsersOwner(token, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const updateUser = async (token, user, userId) => {
    let result;

    try {
      result = await userService.modifyUser(token, user, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const deleteUser = async (token, userId) => {
    let result;

    try {
      result = await userService.deleteUser(token, userId);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { onSubmitLogin, onSubmitRegister, getUserById, getAllUsers, getAllUserOwner, updateUser, deleteUser };
};

export default useUserHook;
