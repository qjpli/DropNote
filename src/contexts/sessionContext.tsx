import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabaseConn } from '../services/db/supabaseClient';

interface SessionContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

// Define the context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Define the props interface with `children` explicitly
interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseConn.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  
    const { data: authListener } = supabaseConn.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
