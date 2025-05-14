export interface NoteTheme {
  id: string;   
  title: string;
  desc?: string | null;  
  is_available: boolean;
  icons: string[];   
  color: string;
  created_at: string;  
  updated_at?: string | null;
  features?: Array<{
    icon: string;
    description: string;
  }> | null;
}
