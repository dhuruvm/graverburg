export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  vibeTag: string;
  theme: 'lime' | 'yellow' | 'coral' | 'dark' | 'synthwave';
  music: {
    track: string;
    artist: string;
    albumArt: string;
    duration: string;
  };
  mood: string;
  topFriends: {
    name: string;
    handle: string;
    avatar: string;
    status: string;
  }[];
  badges: string[];
  links: { title: string; url: string }[];
  visitorCount: number;
  photoWall: string[];
  pinnedPostId?: string;
  anonymousQA: {
    id: string;
    question: string;
    answer?: string;
    date: string;
  }[];
}

export interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    badge?: string;
  };
  title?: string;
  content: string;
  timestamp: string;
  category: 'Vibes' | 'Anime' | 'Gamer' | 'Thoughts' | 'Music' | 'Meme';
  cardColor: 'lime' | 'yellow' | 'coral' | 'dark' | 'cream';
  likes: number;
  reposts: number;
  replies: number;
  hasLiked?: boolean;
  hasReposted?: boolean;
  hasBookmarked?: boolean;
  image?: string;
  audioSnippet?: {
    track: string;
    duration: string;
  };
  comments?: {
    id: string;
    author: string;
    handle: string;
    avatar: string;
    content: string;
    time: string;
  }[];
}

export interface Story {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  media: string;
  caption: string;
  timeAgo: string;
  hasSeen?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text?: string;
  isVoice?: boolean;
  voiceDuration?: string;
  sticker?: string;
  time: string;
  reactions?: string[];
}

export interface ChatConversation {
  id: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    online: boolean;
    status: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export const INITIAL_USER: UserProfile = {
  id: 'user-dhuruv',
  name: 'Dhuruv',
  handle: '@dhuruv_vibe',
  avatar: '/logo.png',
  bio: '🔺 Architect of GraverBurg. Building the next-gen social space where your profile is your own world. No bland feeds allowed.',
  vibeTag: 'Dark Academia & Cyber',
  theme: 'lime',
  music: {
    track: 'Glue Song (Lofi Flip)',
    artist: 'beabadoobee ft. Clairo',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    duration: '2:45',
  },
  mood: '☕ Surviving on iced matcha & phonk beats',
  topFriends: [
    { name: 'Kira 🌙', handle: '@kira_cyber', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', status: 'BFF · Designing UI' },
    { name: 'Ren [Gamer]', handle: '@ren_val', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', status: 'In a game · Radiant' },
    { name: 'Aria Vibe', handle: '@aria_indie', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', status: 'Making music 🎧' },
    { name: 'Zane Neo', handle: '@zane_pixel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', status: 'Yapping in general' },
  ],
  badges: ['OG Graver 🔺', 'Founder', 'Night Owl 🦉', 'Certified Yapper 🗣️', 'Pixel Crafter 🎨'],
  links: [
    { title: 'My Spotify Playlist', url: 'https://spotify.com' },
    { title: 'GitHub Repo', url: 'https://github.com' },
    { title: 'Portfolio / Space', url: 'https://graverburg.xyz' },
  ],
  visitorCount: 1429,
  photoWall: [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&auto=format&fit=crop&q=80',
  ],
  pinnedPostId: 'post-1',
  anonymousQA: [
    {
      id: 'qa-1',
      question: 'What is the philosophy behind GraverBurg?',
      answer: 'Profiles should feel like your teenage bedroom wall in the 2000s, but with 2026 X-speed microblogging and encrypted group chats!',
      date: '2 hours ago',
    },
    {
      id: 'qa-2',
      question: 'Are you dropping more profile templates soon?',
      answer: 'Yes! The anime neon and retro y2k remix templates drop this Friday.',
      date: 'Yesterday',
    },
    {
      id: 'qa-3',
      question: 'Favorite late night coding snack?',
      date: 'Just now',
    },
  ],
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: {
      name: 'Dhuruv',
      handle: '@dhuruv_vibe',
      avatar: '/logo.png',
      badge: 'OG Graver 🔺',
    },
    title: 'Designing the GraverBurg Card System',
    content: 'Built out the full card palette today — pistachio lime, honey yellow, coral red, and cream on dark slate. Mood-coded posts are the future. Which color is your vibe?',
    timestamp: '14 Oct · 8:15 pm',
    category: 'Vibes',
    cardColor: 'lime',
    likes: 428,
    reposts: 74,
    replies: 39,
    hasLiked: true,
    audioSnippet: {
      track: 'GraverBurg Synth Wave #01',
      duration: '0:34',
    },
    comments: [
      {
        id: 'c-1',
        author: 'Kira 🌙',
        handle: '@kira_cyber',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'The pistachio lime with dark slate is perfection!',
        time: '15m ago',
      },
      {
        id: 'c-2',
        author: 'Ren [Gamer]',
        handle: '@ren_val',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        content: 'Need this as a Discord theme immediately lol',
        time: '5m ago',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Kira 🌙',
      handle: '@kira_cyber',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Pixel Artist',
    },
    title: 'MySpace nostalgia meets 2026 feed',
    content: 'Why does every modern social app look like a corporate spreadsheet? On GraverBurg I spent 2 hours styling my music widget and Top Friends grid. Self-expression is officially back.',
    timestamp: '14 Oct · 6:42 pm',
    category: 'Thoughts',
    cardColor: 'yellow',
    likes: 892,
    reposts: 184,
    replies: 92,
    hasLiked: false,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    comments: [],
  },
  {
    id: 'post-3',
    author: {
      name: 'Aria Vibe',
      handle: '@aria_indie',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      badge: 'Music Producer',
    },
    title: 'Drop your anonymous Q&A questions!',
    content: 'Answering anything on my profile space for the next 2 hours. Ask about production secrets, music theory or tea ☕',
    timestamp: '14 Oct · 5:20 pm',
    category: 'Music',
    cardColor: 'coral',
    likes: 312,
    reposts: 28,
    replies: 45,
    hasLiked: true,
    comments: [],
  },
  {
    id: 'post-4',
    author: {
      name: 'Ren [Gamer]',
      handle: '@ren_val',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      badge: 'Immortal 3',
    },
    title: 'Late night scrims & lofi',
    content: 'Just clutched a 1v4 in overtime while listening to chill anime soundtracks. Added the replay clip to my photo wall block.',
    timestamp: '14 Oct · 3:11 pm',
    category: 'Gamer',
    cardColor: 'cream',
    likes: 610,
    reposts: 52,
    replies: 19,
    hasLiked: false,
    comments: [],
  },
  {
    id: 'post-5',
    author: {
      name: 'GraverBurg Official',
      handle: '@graverburg',
      avatar: '/logo.png',
      badge: 'Official 🔺',
    },
    title: 'GraverBurg 90-Day MVP Plan: Phase 1 Live',
    content: 'Welcome to the closed beta! We combined X-speed posting with fully modular profiles, DMs, and Gen Z touches. Share your space link and remix cool templates!',
    timestamp: '14 Oct · 1:00 pm',
    category: 'Vibes',
    cardColor: 'dark',
    likes: 1530,
    reposts: 420,
    replies: 188,
    hasLiked: true,
    comments: [],
  },
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    user: {
      name: 'Dhuruv',
      handle: '@dhuruv_vibe',
      avatar: '/logo.png',
    },
    media: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    caption: 'GraverBurg night shift aesthetic ✨',
    timeAgo: '2h ago',
    hasSeen: false,
  },
  {
    id: 'story-2',
    user: {
      name: 'Kira 🌙',
      handle: '@kira_cyber',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    media: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    caption: 'Remixing the Honey Gold profile preset!',
    timeAgo: '4h ago',
    hasSeen: false,
  },
  {
    id: 'story-3',
    user: {
      name: 'Ren [Gamer]',
      handle: '@ren_val',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
    media: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    caption: 'New mechanical keyboard build sound test',
    timeAgo: '7h ago',
    hasSeen: false,
  },
  {
    id: 'story-4',
    user: {
      name: 'Aria Vibe',
      handle: '@aria_indie',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    media: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    caption: 'Studio session with modular synths 🎛️',
    timeAgo: '9h ago',
    hasSeen: true,
  },
];

export const INITIAL_CHATS: ChatConversation[] = [
  {
    id: 'chat-1',
    user: {
      name: 'Kira 🌙',
      handle: '@kira_cyber',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      online: true,
      status: 'Designing new sticker packs',
    },
    lastMessage: 'Did you check my new anonymous Q&A answers?',
    lastMessageTime: '10:42 AM',
    unreadCount: 2,
    messages: [
      { id: 'm-1', sender: 'other', text: 'Hey! Loved the new Dribbble template cards on GraverBurg! 🚀', time: '10:38 AM' },
      { id: 'm-2', sender: 'me', text: 'Thanks Kira! The pistachio lime and honey yellow contrast is insane.', time: '10:40 AM' },
      { id: 'm-3', sender: 'other', isVoice: true, voiceDuration: '0:14', time: '10:41 AM' },
      { id: 'm-4', sender: 'other', text: 'Did you check my new anonymous Q&A answers?', time: '10:42 AM' },
    ],
  },
  {
    id: 'chat-2',
    user: {
      name: 'Ren [Gamer]',
      handle: '@ren_val',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      online: true,
      status: 'Playing Valorant',
    },
    lastMessage: 'Hop on discord for 1 match?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm-10', sender: 'other', text: 'Yo, your profile visitor count went crazy today!', time: 'Yesterday' },
      { id: 'm-11', sender: 'me', text: 'Yeah someone shared the profile link on twitter haha', time: 'Yesterday' },
      { id: 'm-12', sender: 'other', text: 'Hop on discord for 1 match?', time: 'Yesterday' },
    ],
  },
  {
    id: 'chat-3',
    user: {
      name: 'GraverBurg AI Companion',
      handle: '@graver_bot',
      avatar: '/logo.png',
      online: true,
      status: 'Always active · Ask me anything',
    },
    lastMessage: 'Welcome to your customizable profile space!',
    lastMessageTime: 'Oct 14',
    unreadCount: 0,
    messages: [
      { id: 'm-20', sender: 'other', text: 'Hey Dhuruv! Welcome to GraverBurg. You can customize your profile themes, add modular blocks, post to the feed, and chat with friends in real-time!', time: 'Oct 14' },
      { id: 'm-21', sender: 'other', sticker: '🔺', time: 'Oct 14' },
    ],
  },
];
