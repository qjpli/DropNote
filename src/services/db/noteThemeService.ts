// noteThemeService.ts

import { NoteTheme } from '../../types/NoteThemeType';
import { supabaseConn } from './supabaseClient';

export const fetchNoteThemes = async (): Promise<NoteTheme[]> => {
    const { data, error } = await supabaseConn
        .from('note_themes')
        .select('*');

    if (error) {
        throw error;
    }

    return data as NoteTheme[];
};

// Additional services like create, update, delete could also be added here.
