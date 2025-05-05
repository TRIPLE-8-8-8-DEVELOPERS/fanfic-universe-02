
import { supabase } from '../client';

// Message helper functions
export async function getConversations(userId: string) {
  // Get the latest message from each conversation
  const { data, error } = await (supabase as any)
    .from('messages')
    .select(`
      id,
      sender_id,
      receiver_id,
      content,
      created_at,
      read,
      sender:profiles!sender_id(id, username, display_name, avatar_url),
      receiver:profiles!receiver_id(id, username, display_name, avatar_url)
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching conversations:', error);
    return { data: null, error };
  }
  
  // Group messages by conversation (unique sender-receiver pairs)
  const conversations = {};
  data.forEach(message => {
    const isOutgoing = message.sender_id === userId;
    const otherUserId = isOutgoing ? message.receiver_id : message.sender_id;
    const otherUser = isOutgoing ? message.receiver : message.sender;
    
    if (!conversations[otherUserId]) {
      conversations[otherUserId] = {
        id: otherUserId,
        user: {
          id: otherUser.id,
          name: otherUser.display_name || otherUser.username,
          username: otherUser.username,
          avatar: otherUser.avatar_url,
        },
        messages: [],
        lastMessage: message.content,
        time: new Date(message.created_at).toLocaleString(),
        unread: !isOutgoing && !message.read,
      };
    }
    
    // Add the message to the conversation
    conversations[otherUserId].messages.push({
      id: message.id,
      content: message.content,
      timestamp: message.created_at,
      isSelf: isOutgoing,
      read: message.read,
    });
  });
  
  return { data: Object.values(conversations), error: null };
}

export async function getMessages(userId: string, otherUserId: string) {
  return (supabase as any)
    .from('messages')
    .select(`
      id,
      sender_id,
      receiver_id,
      content,
      created_at,
      read
    `)
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
    .order('created_at', { ascending: true });
}

export async function sendMessage(senderId: string, receiverId: string, content: string) {
  return (supabase as any)
    .from('messages')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      read: false
    });
}

export async function markMessagesAsRead(userId: string, otherUserId: string) {
  return (supabase as any)
    .from('messages')
    .update({ read: true })
    .eq('sender_id', otherUserId)
    .eq('receiver_id', userId)
    .eq('read', false);
}

export async function getUnreadMessageCount(userId: string) {
  const { count, error } = await (supabase as any)
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .eq('receiver_id', userId)
    .eq('read', false);
    
  return { count, error };
}
