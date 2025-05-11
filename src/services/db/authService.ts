import { createClient, SupabaseClient, PostgrestError, Session } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import { supabaseConn } from './supabaseClient';


// Function to create a user
export const createUser = async (password: string, username: string) => {
    const { data, error } = await supabaseConn.auth.signUp({
        email: `${username}@dnotes.com`,
        password: password,
        options: {
            data: {
                username: username,
                pause_links: false
            }
        }
    });

    if (error) {
        console.log('Oops');
        throw error;
    }
    return data;
};

// Function to sign in a user
export const signInUserWithUsername = async (username: string, password: string) => {
    const { data: user, error: fetchError } = await supabaseConn
        .from('profiles') 
        .select('email')
        .eq('username', username)
        .single();
        
    if (fetchError || !user) {
        throw new Error('User not found');
    }
    
    const { data, error } = await supabaseConn.auth.signInWithPassword({
        email: user.email,
        password: password,
    });

    if (error) {
        throw error;
    }

    return data;
};

export const getAuthSession = async (): Promise<Session | null> => {
  console.log('Fetching logged in');

  const { data, error } = await supabaseConn.auth.getSession();

  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
  return data.session;
};

export const onAuthChange = (callback: (session: Session | null) => void) => {
  const { data: listener } = supabaseConn.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return listener.subscription; // So we can unsubscribe later
};


