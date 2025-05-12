export interface NoteTheme {
  id: string; // UUID
  title: string;
  desc?: string | null; // Nullable
  is_available: boolean;
  icons: string[]; // Array of text
  color: string;
  created_at: string; // ISO timestamp string
  updated_at?: string | null; // Nullable
}
