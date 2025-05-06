
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { trackReadingTime } from '@/integrations/supabase/services/reading-progress';

export function useReadingTime(storyId: string) {
  const { user, isAuthenticated } = useAuth();
  const [isReading, setIsReading] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const lastSyncRef = useRef<number>(0);

  // Start tracking reading time
  const startTracking = () => {
    if (!isAuthenticated) return;
    setIsReading(true);
  };

  // Stop tracking reading time
  const stopTracking = async () => {
    if (!isAuthenticated) return;
    
    setIsReading(false);
    
    // Sync remaining time to server if needed
    if (totalSeconds > lastSyncRef.current) {
      await syncToServer();
    }
  };

  // Sync reading time to server
  const syncToServer = async () => {
    if (!user || !storyId) return;
    
    const secondsToSync = totalSeconds - lastSyncRef.current;
    
    if (secondsToSync > 0) {
      try {
        await trackReadingTime(user.id, storyId, secondsToSync);
        lastSyncRef.current = totalSeconds;
      } catch (error) {
        console.error('Error syncing reading time:', error);
      }
    }
  };

  // Reset tracking
  const resetTracking = () => {
    setIsReading(false);
    setTotalSeconds(0);
    lastSyncRef.current = 0;
  };

  useEffect(() => {
    // Set up timer when reading starts
    if (isReading && !intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setTotalSeconds(prev => prev + 1);
      }, 1000);
    }
    
    // Clear timer when reading stops
    if (!isReading && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isReading]);

  // Sync time to server every minute
  useEffect(() => {
    if (totalSeconds > 0 && totalSeconds % 60 === 0) {
      syncToServer();
    }
  }, [totalSeconds, storyId, user]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Final sync on unmount
      if (totalSeconds > lastSyncRef.current) {
        syncToServer();
      }
    };
  }, []);

  return {
    isReading,
    totalSeconds,
    startTracking,
    stopTracking,
    resetTracking
  };
}
