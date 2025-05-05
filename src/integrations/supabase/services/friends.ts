
import { supabase } from '../client';
import { FriendRequestType } from '@/types/messaging';

// Friend request helper functions
export async function sendFriendRequest(senderId: string, receiverId: string) {
  // Using explicit type cast to any to bypass TypeScript restrictions
  // since the friend_requests table is not in the generated types yet
  return (supabase as any)
    .from('friend_requests')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      status: 'pending'
    });
}

export async function getFriendRequests(userId: string) {
  // Using explicit type cast to any to bypass TypeScript restrictions
  return (supabase as any)
    .from('friend_requests')
    .select(`
      id,
      sender_id,
      receiver_id,
      status,
      created_at,
      profiles!sender_id(id, username, display_name, avatar_url)
    `)
    .eq('receiver_id', userId)
    .eq('status', 'pending');
}

export async function getSentFriendRequests(userId: string) {
  // Using explicit type cast to any to bypass TypeScript restrictions
  return (supabase as any)
    .from('friend_requests')
    .select(`
      id,
      sender_id,
      receiver_id,
      status,
      created_at,
      profiles!receiver_id(id, username, display_name, avatar_url)
    `)
    .eq('sender_id', userId);
}

export async function acceptFriendRequest(requestId: string) {
  // Using explicit type cast to any to bypass TypeScript restrictions
  return (supabase as any)
    .from('friend_requests')
    .update({ status: 'accepted' })
    .eq('id', requestId);
}

export async function rejectFriendRequest(requestId: string) {
  // Using explicit type cast to any to bypass TypeScript restrictions
  return (supabase as any)
    .from('friend_requests')
    .update({ status: 'rejected' })
    .eq('id', requestId);
}

export async function getFriends(userId: string) {
  // Get all accepted friend requests where user is either sender or receiver
  // Using explicit type cast to any to bypass TypeScript restrictions
  const { data: sentRequests, error: sentError } = await (supabase as any)
    .from('friend_requests')
    .select(`
      id,
      receiver_id,
      profiles!receiver_id(id, username, display_name, avatar_url)
    `)
    .eq('sender_id', userId)
    .eq('status', 'accepted');
    
  const { data: receivedRequests, error: receivedError } = await (supabase as any)
    .from('friend_requests')
    .select(`
      id,
      sender_id,
      profiles!sender_id(id, username, display_name, avatar_url)
    `)
    .eq('receiver_id', userId)
    .eq('status', 'accepted');
    
  if (sentError || receivedError) {
    console.error('Error fetching friends:', sentError || receivedError);
    return { data: null, error: sentError || receivedError };
  }
  
  // Combine and format the results
  const friends = [
    ...(sentRequests || []).map(request => ({
      id: request.id,
      userId: request.receiver_id,
      username: request.profiles.username,
      displayName: request.profiles.display_name,
      avatarUrl: request.profiles.avatar_url,
    })),
    ...(receivedRequests || []).map(request => ({
      id: request.id,
      userId: request.sender_id,
      username: request.profiles.username,
      displayName: request.profiles.display_name,
      avatarUrl: request.profiles.avatar_url,
    }))
  ];
  
  return { data: friends, error: null };
}
