// src/contexts/AuthContext.js
import React, { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../config/supabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuth = !!user;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      window.notify("Something went wrong while logging out", "error");
    } else {
      window.notify("Logged out successfully", "success");
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);