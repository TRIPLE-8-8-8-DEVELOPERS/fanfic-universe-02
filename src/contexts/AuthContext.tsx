import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { 
  supabase, 
  getSession, 
  getCurrentUser 
} from '@/integrations/supabase/client';
import { 
  getProfile as fetchProfile,
  updateProfile as updateUserProfile 
} from '@/integrations/supabase/services/profiles';
import { toast } from 'sonner';

type Profile = {
  id: string;
  username: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  created_at?: string;
  updated_at?: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  getProfile: () => Promise<Profile | null>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
  refreshSession: async () => {},
  getProfile: async () => null,
  updateProfile: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    try {
      setIsLoading(true);
      const { data: { session: currentSession } } = await getSession();
      console.log('refreshSession: currentSession', currentSession);
      setSession(currentSession);
      setUser(currentSession?.user || null);
      
      if (currentSession?.user) {
        if (user) {
          await refreshProfile();
        }
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      toast.error('Failed to refresh authentication session');
    } finally {
      console.log("refreshSession: setIsLoading(false)");
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const getProfile = async (): Promise<Profile | null> => {
    try {
      if (!user) return null;

      const { data, error } = await fetchProfile(user.id);
      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch profile');
        return null;
      }

      setProfile(data);
      return data;
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      toast.error('Unexpected error fetching profile');
      return null;
    }
  };

  const isProfile = (data: any): data is Profile => {
    return data && typeof data.id === 'string' && typeof data.username === 'string';
  };

  const refreshProfile = async () => {
    try {
      if (!user) {
        console.log('refreshProfile: No user found');
        return;
      }

      console.log('refreshProfile: Fetching profile for user ID:', user.id);
      const { data, error } = await fetchProfile(user.id);
      if (error || !isProfile(data)) {
        console.error('Error fetching profile or invalid data:', error);
        toast.error('Failed to fetch profile');
        return;
      }

      console.log('refreshProfile: Profile data fetched:', data);
      setProfile(data);
    } catch (error) {
      console.error('Unexpected error refreshing profile:', error);
      toast.error('Unexpected error refreshing profile');
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await updateUserProfile(user.id, updates);
      
      if (error) throw error;
      
      await refreshProfile();
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
      throw error;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id, currentSession);
        setSession(currentSession);
        setUser(currentSession?.user || null);

        if (currentSession?.user) {
          await refreshProfile();
        } else {
          setProfile(null);
        }

        setIsLoading(false);

        if (event === 'SIGNED_IN') {
          toast.success('Signed in successfully');
        } else if (event === 'SIGNED_OUT') {
          toast.info('Signed out');
        }
      }
    );

    // THEN check for existing session
    (async () => {
      const { data: { session: existingSession } } = await getSession();
      if (existingSession) {
        console.log('Existing session found:', existingSession);
        setSession(existingSession);
        setUser(existingSession.user || null);
        await refreshProfile();
      } else {
        console.log('No existing session found');
        setProfile(null);
      }
      setIsLoading(false);
    })();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signOut,
    refreshSession,
    getProfile,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
