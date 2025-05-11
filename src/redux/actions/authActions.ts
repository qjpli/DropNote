import { AppDispatch } from '../store';
import { loginUser, registerUser, logout } from '../slices/authSlice';

export const performLogin = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const result = await dispatch(loginUser({ username, password })).unwrap();
    // Add side effects like navigation or logging here
    console.log('Login successful:', result);
    return result;
  } catch (err) {
    console.error('Login failed:', err);
    throw err;
  }
};

export const performRegister = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const result = await dispatch(registerUser({ username, password })).unwrap();
    console.log('Registration successful:', result);
    return result;
  } catch (err) {
    console.error('Registration failed:', err);
    throw err;
  }
};

export const performLogout = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
