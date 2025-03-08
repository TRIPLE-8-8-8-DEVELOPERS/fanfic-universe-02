
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { 
  supabase, 
  getSession, 
  getCurrentUser, 
  getProfile as fetchProfile,
  updateProfile as updateUserProfile 
} from '@/integrations/supabase/client';
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
      setSession(currentSession);
      setUser(currentSession?.user || null);
      
      if (currentSession?.user) {
        await refreshProfile();
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      toast.error('Failed to refresh authentication session');
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async (): Promise<Profile | null> => {
    try {
      if (!user) return null;
      
      const { data, error } = await fetchProfile(user.id);
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data as Profile;
    } catch (error) {
      console.error('Error in getProfile:', error);
      return null;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    const profileData = await getProfile();
    setProfile(profileData);
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
    }
  };

  useEffect(() => {
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.id);
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
    refreshSession,
    getProfile,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
