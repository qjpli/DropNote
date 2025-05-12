// redux/actions/noteThemeActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNoteThemes } from '../../services/db/noteThemeService';

// Thunk for fetching note themes
export const fetchNoteThemesThunk = createAsyncThunk(
  'noteTheme/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchNoteThemes();

      console.log(data);
      return data;
    } catch (error: any) {
      console.error('Fetch NoteThemes Error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);
