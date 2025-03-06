
import { ConversationType } from "@/types/messaging";

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock conversation data
export const mockConversations: ConversationType[] = [
  {
    id: "conv1",
    user: {
      id: "user2",
      name: "Emily Chen",
      username: "@emilychen",
      avatar: "https://i.pravatar.cc/150?img=5",
      isOnline: true
    },
    lastMessage: "I really loved your latest story about dragons!",
    time: "10:42 AM",
    unread: true,
    messages: [
      {
        id: generateId(),
        content: "Hey, I just read your latest story!",
        timestamp: "2023-08-15T10:30:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "Thank you! Which one?",
        timestamp: "2023-08-15T10:32:00",
        isSelf: true,
        read: true,
      },
      {
        id: generateId(),
        content: "The one about dragons. The world-building is amazing!",
        timestamp: "2023-08-15T10:35:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "I really loved your latest story about dragons!",
        timestamp: "2023-08-15T10:42:00",
        isSelf: false,
      },
    ],
  },
  {
    id: "conv2",
    user: {
      id: "user3",
      name: "Marcus Reed",
      username: "@marcusreed",
      avatar: "https://i.pravatar.cc/150?img=12",
      isOnline: false,
      lastSeen: "3 hours ago"
    },
    lastMessage: "Would you be interested in collaborating on a story?",
    time: "Yesterday",
    unread: true,
    messages: [
      {
        id: generateId(),
        content: "Hi there! I'm a big fan of your fantasy series.",
        timestamp: "2023-08-14T15:20:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "Thanks Marcus! That means a lot coming from you.",
        timestamp: "2023-08-14T15:25:00",
        isSelf: true,
        read: true,
      },
      {
        id: generateId(),
        content: "I was wondering if you'd be open to collaboration?",
        timestamp: "2023-08-14T15:28:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "Would you be interested in collaborating on a story?",
        timestamp: "2023-08-14T15:30:00",
        isSelf: false,
      },
    ],
  },
  {
    id: "conv3",
    user: {
      id: "user4",
      name: "Sofia Garcia",
      username: "@sofiagarcia",
      avatar: "https://i.pravatar.cc/150?img=9",
      isOnline: true
    },
    lastMessage: "The latest chapter was brilliant, especially the dialogue.",
    time: "Wednesday",
    unread: false,
    messages: [
      {
        id: generateId(),
        content: "Just finished reading your latest chapter!",
        timestamp: "2023-08-13T09:15:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "What did you think?",
        timestamp: "2023-08-13T09:18:00",
        isSelf: true,
        read: true,
      },
      {
        id: generateId(),
        content: "The latest chapter was brilliant, especially the dialogue.",
        timestamp: "2023-08-13T09:20:00",
        isSelf: false,
      },
    ],
  },
  {
    id: "conv4",
    user: {
      id: "user5",
      name: "James Holden",
      username: "@jamesholden",
      avatar: "https://i.pravatar.cc/150?img=8",
      isOnline: false,
      lastSeen: "1 day ago"
    },
    lastMessage: "Do you have any tips for overcoming writer's block?",
    time: "Monday",
    unread: false,
    messages: [
      {
        id: generateId(),
        content: "Hey, I've been struggling with writer's block lately.",
        timestamp: "2023-08-11T14:30:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "Sorry to hear that. It happens to all of us!",
        timestamp: "2023-08-11T14:35:00",
        isSelf: true,
        read: true,
      },
      {
        id: generateId(),
        content: "Do you have any tips for overcoming writer's block?",
        timestamp: "2023-08-11T14:38:00",
        isSelf: false,
      },
    ],
  },
  {
    id: "conv5",
    user: {
      id: "user6",
      name: "Olivia Wright",
      username: "@oliviawright",
      avatar: "https://i.pravatar.cc/150?img=25",
      isOnline: true
    },
    lastMessage: "I just published my first story! Would love your feedback!",
    time: "Aug 7",
    unread: false,
    messages: [
      {
        id: generateId(),
        content: "Hi! I'm a new writer on the platform.",
        timestamp: "2023-08-07T11:10:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "Welcome to Fanfic Universe! How are you finding it so far?",
        timestamp: "2023-08-07T11:15:00",
        isSelf: true,
        read: true,
      },
      {
        id: generateId(),
        content: "It's amazing! So many supportive writers here.",
        timestamp: "2023-08-07T11:18:00",
        isSelf: false,
      },
      {
        id: generateId(),
        content: "I just published my first story! Would love your feedback!",
        timestamp: "2023-08-07T11:20:00",
        isSelf: false,
      },
    ],
  },
];

// Helper function to find a conversation by ID
export const findConversationById = (id: string): ConversationType | null => {
  return mockConversations.find(conversation => conversation.id === id) || null;
};
