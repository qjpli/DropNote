import { Session } from "@supabase/supabase-js";
import { createUser, signInUserWithUsername, getAuthSession, onAuthChange } from "../services/db/authService";

export const authController = {
  async signUp(username: string, password: string) {
    try {
      const result = await createUser(password, username);
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },
  
  async signIn(username: string, password: string) {
    try {
      const result = await signInUserWithUsername(username, password);
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  async checkSession() {
    const session = await getAuthSession();
    return session;
  },

  subscribeToAuthChanges(callback: (session: Session | null) => void) {
    return onAuthChange(callback);
  }

};
