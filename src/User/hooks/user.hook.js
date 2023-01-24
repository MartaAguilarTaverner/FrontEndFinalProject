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

  const onSubmitRegister = async (name, surname, email, password, age, profileImg) => {
    try {
      if (checkIfRegisterDataIsValid(name, surname, email, password, age, profileImg)) {
        alert('Something went wrong while trying to register with this data');

        return;
      }

      const registerData = {
        name,
        surname,
        email,
        password,
        age,
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

  const getUserById = async (token, id) => {
    let result;

    try {
      result = await userService.getUserById(token, id);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  const getAllUsers = async (token) => {
    let result;

    try {
      result = await userService.getAllUsers(token);
    } catch (error) {
      alert(error);
    }

    return result;
  };

  return { onSubmitLogin, onSubmitRegister, getUserById, getAllUsers };
};

export default useUserHook;
