// redux/actions/appInitializerActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNoteThemesThunk } from './noteThemeActions';

export const initializeAppThunk = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Currently only Note Themes
      await dispatch(fetchNoteThemesThunk()).unwrap();

      // Later: add other initializations here (settings, etc.)
      // await dispatch(fetchAppSettingsThunk()).unwrap();

      return true;
    } catch (error: any) {
      console.error('App Initialization Failed:', error.message);
      return rejectWithValue(error.message);
    }
  }
);
