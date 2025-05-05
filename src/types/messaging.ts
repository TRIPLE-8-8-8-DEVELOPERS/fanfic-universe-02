
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
  receiverId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
