import { AppDispatch } from '../redux/store';
import { loginUser, registerUser } from '../redux/slices/authSlice';

export const handleLogin = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  // This thunk returns a wrapped action with .unwrap()
  return await dispatch(loginUser({ username, password })).unwrap();
};

export const handleRegister = async (
  dispatch: AppDispatch,
  username: string,
  password: string
) => {
  return await dispatch(registerUser({ username, password })).unwrap();
};
