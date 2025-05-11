import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store;

export const useAppDispatch = () => useDispatch<AppDispatch>();