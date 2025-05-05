
import { supabase } from '../client';

export async function getNotifications(userId: string) {
  return supabase
    .from('notifications')
    .select(`
      id,
      user_id,
      type,
      content,
      related_id,
      created_at,
      read,
      actor:profiles!actor_id(id, username, display_name, avatar_url),
      story:stories(id, title)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function markNotificationAsRead(notificationId: string) {
  return supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
}

export async function markAllNotificationsAsRead(userId: string) {
  return supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);
}

export async function deleteNotification(notificationId: string) {
  return supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);
}

export async function getUnreadNotificationCount(userId: string) {
  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('read', false);
    
  return { count, error };
}

export async function createFriendRequestNotification(userId: string, actorId: string) {
  return supabase
    .from('notifications')
    .insert({
      user_id: userId,
      actor_id: actorId,
      type: 'friend_request',
      content: 'sent you a friend request',
      read: false
    });
}

export async function createFriendAcceptedNotification(userId: string, actorId: string) {
  return supabase
    .from('notifications')
    .insert({
      user_id: userId,
      actor_id: actorId,
      type: 'friend_accepted',
      content: 'accepted your friend request',
      read: false
    });
}
