import type { FeedArticle } from '../types';

export const staffPicks: FeedArticle[] = [
  {
    id: 'medium-podcasters',
    title: 'Are You Closer to Podcasters Than Your Friends?',
    summary: '',
    sourceName: 'Colin Myers',
    publishedLabel: 'Last week',
    readingMinutes: 12,
    thumbnail: null,
    reference: {
      image: require('../../../../assets/medium/podcast.png'),
      avatar: require('../../../../assets/medium/colin.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
];

export const recommendedStories: FeedArticle[] = [
  {
    id: 'medium-balance',
    title: 'How Old Is Your Body? Stand On One Leg and Find Out',
    summary: '',
    sourceName: 'F. Perry Wilson, MD',
    publishedLabel: 'Oct 23, 2024',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/wilson.png'),
      applause: 23000,
      responses: '652',
      memberOnly: true,
    },
  },
  {
    id: 'medium-flood',
    title: 'Building a Smart Flood Map of Japan using GIS',
    summary: '',
    sourceName: 'Ronan Takizawa',
    publishedLabel: '',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/ronan.png'),
      applause: 0,
      responses: '—',
      memberOnly: false,
    },
  },
  {
    id: 'medium-mcp',
    title: 'MCP SuperAssistant : Use MCP with Grok, Perplexity, Google AI Studio and more',
    summary: '',
    sourceName: 'In Data Science in Your Pocket by Mehul Gupta',
    publishedLabel: '2 days ago',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/mcp.png'),
      applause: 68,
      responses: '3',
      memberOnly: false,
    },
  },
  {
    id: 'medium-obsidian',
    title: 'The Obsidian Plugins That I Used All Throughout My Degree',
    summary: '',
    sourceName: 'In Obsidian Observer by Theo Stowell',
    publishedLabel: '4 weeks ago',
    readingMinutes: 0,
    thumbnail: null,
    reference: {
      avatar: require('../../../../assets/medium/obsidian.png'),
      applause: 42,
      responses: '1',
      memberOnly: true,
    },
  },
];

// 화면에 잘린 소개는 보이는 부분만 보관하며 팔로우는 외부 서비스에 연결하지 않는다.
export const suggestedProfiles = [
  {
    name: 'iris ୨୧',
    followers: '148K followers',
    bio: 'ˊ to write and heal ; a safe space ˊ [ for work, collaborations, or commissions...',
    image: require('../../../../assets/medium/iris.png'),
  },
  {
    name: 'Coinmonks',
    followers: 'Publication · 116…',
    bio: 'Coinmonks is a… Crypto Education… Other Project—…',
    image: require('../../../../assets/medium/coinmonks.png'),
  },
  {
    name: 'The Daily Dollar',
    followers: 'Publication · 491 followers',
    bio: 'Bitcoin, DeFi, NFTs, Metaverse, AI. Web3. We break down what’s happening before it hits the me...',
    image: require('../../../../assets/medium/daily-dollar.png'),
  },
  {
    name: 'Alex Mathers',
    followers: '217K followers',
    bio: 'Helping you develop confidence and authentic leadership. Triple yo...',
    image: require('../../../../assets/medium/alex-mathers.png'),
  },
];
