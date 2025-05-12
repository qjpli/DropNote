import { createSlice } from '@reduxjs/toolkit';
import { loadUserNoteDetailsThunk, updateUserNoteDetailThunk } from '../actions/noteDetailsActions';

interface NoteDetailsState {
  [userId: string]: {
    [themeId: string]: string;
  };
}

const initialState: NoteDetailsState = {};

const noteDetailsSlice = createSlice({
  name: 'noteDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserNoteDetailsThunk.fulfilled, (state, action) => {
        // Load all notes for this user
        state[action.meta.arg] = action.payload;
      })
      .addCase(updateUserNoteDetailThunk.fulfilled, (state, action) => {
        // Update or add specific note for this user and theme
        state[action.payload.userId] = action.payload.updatedNotes;
      });
  },
});

export default noteDetailsSlice.reducer;
