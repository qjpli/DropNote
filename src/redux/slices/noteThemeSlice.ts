// redux/slices/noteThemeSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchNoteThemesThunk } from '../actions/noteThemeActions';
import { NoteTheme } from '../../types/NoteThemeType';

interface NoteThemeState {
  noteThemes: NoteTheme[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteThemeState = {
  noteThemes: [],
  loading: false,
  error: null,
};

const noteThemeSlice = createSlice({
  name: 'noteTheme',
  initialState,
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNoteThemesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoteThemesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.noteThemes = action.payload;
      })
      .addCase(fetchNoteThemesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default noteThemeSlice.reducer;
