// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import { useDispatch } from 'react-redux';

// Create the Redux store
const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>; // Inferred from store
export type AppDispatch = typeof store.dispatch; // Inferred from store

export default store;

export const useAppDispatch = () => useDispatch<AppDispatch>();