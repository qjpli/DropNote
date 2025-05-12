import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Load all notes for the logged-in user
export const loadUserNoteDetailsThunk = createAsyncThunk(
  'noteDetails/loadUserNotes',
  async (userId: string) => {
    try {
      const data = await AsyncStorage.getItem(`noteDetails-${userId}`);
      return data ? JSON.parse(data) : {};
    } catch (error: any) {
      console.error('Failed to load note details:', error.message);
      throw error;
    }
  }
);

// Update or add a note detail for specific theme for the logged-in user
export const updateUserNoteDetailThunk = createAsyncThunk(
  'noteDetails/updateUserNote',
  async (
    { userId, themeId, note }: { userId: string; themeId: string; note: string },
    { getState }
  ) => {
    try {
      const state = getState() as { noteDetails: Record<string, Record<string, string>> };
      const userNotes = state.noteDetails[userId] || {};
      const updatedNotes = { ...userNotes, [themeId]: note };

      await AsyncStorage.setItem(`noteDetails-${userId}`, JSON.stringify(updatedNotes));

      return { userId, updatedNotes };
    } catch (error: any) {
      console.error('Failed to update note detail:', error.message);
      throw error;
    }
  }
);
