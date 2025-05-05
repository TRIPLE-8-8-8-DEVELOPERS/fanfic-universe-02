
export interface UserType {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface MessageType {
  id: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
  read?: boolean;
}

export interface ConversationType {
  id: string;
  user: UserType;
  messages: MessageType[];
  lastMessage: string;
  time: string;
  unread: boolean;
}

export interface FriendRequestType {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderUsername: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Define notification type
export interface NotificationType {
  id: string;
  userId: string;
  actorId?: string;
  actorName?: string;
  actorAvatar?: string;
  type: string;
  content: string;
  relatedId?: string;
  read: boolean;
  createdAt: string;
}
