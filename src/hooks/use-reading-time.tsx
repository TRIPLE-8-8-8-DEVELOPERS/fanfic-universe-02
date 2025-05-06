
import { useState, useEffect, useRef } from 'react';
import { updateReadingTime } from '@/integrations/supabase/services/reading-progress';
import { useAuth } from '@/contexts/AuthContext';

// Default update interval in seconds
const DEFAULT_INTERVAL = 30;

export function useReadingTimer(storyId: string, updateInterval = DEFAULT_INTERVAL) {
  const [isTracking, setIsTracking] = useState(false);
  const { user } = useAuth();
  const timerRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  // Start tracking time spent reading
  const startTracking = () => {
    if (!user || !storyId || isTracking) return;
    
    // Initialize timer and update refs
    timerRef.current = 0;
    lastUpdateRef.current = Date.now();
    setIsTracking(true);
  };

  // Stop tracking time spent reading
  const stopTracking = async () => {
    if (!isTracking) return;
    
    // Update one last time before stopping
    await updateTimeSpent();
    setIsTracking(false);
  };

  // Update time spent in database
  const updateTimeSpent = async () => {
    if (!user || !storyId) return;
    
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - lastUpdateRef.current) / 1000);
    
    if (elapsedSeconds > 0) {
      // Update database
      await updateReadingTime(user.id, storyId, elapsedSeconds);
      
      // Update refs
      timerRef.current += elapsedSeconds;
      lastUpdateRef.current = now;
    }
  };

  // Effect for periodic updates while tracking
  useEffect(() => {
    if (!isTracking || !user) return;
    
    // Set up interval to update time spent
    const intervalId = setInterval(async () => {
      await updateTimeSpent();
    }, updateInterval * 1000);
    
    // Cleanup function for unmounting
    return () => {
      clearInterval(intervalId);
      updateTimeSpent();
    };
  }, [isTracking, user, storyId, updateInterval]);

  // Effect for page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, stop counting
        updateTimeSpent();
      } else {
        // Page is visible again, resume counting
        if (isTracking) {
          lastUpdateRef.current = Date.now();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTracking]);

  // Auto cleanup on unmount
  useEffect(() => {
    return () => {
      if (isTracking) {
        updateTimeSpent();
      }
    };
  }, [isTracking]);

  return {
    isTracking,
    startTracking,
    stopTracking,
    timeSpent: timerRef.current
  };
}
