import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import noteThemeReducer from './slices/noteThemeSlice';
import noteDetailsReducer from './slices/noteDetailsSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    noteTheme: noteThemeReducer,
    noteDetails: noteDetailsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store;

export const useAppDispatch = () => useDispatch<AppDispatch>();