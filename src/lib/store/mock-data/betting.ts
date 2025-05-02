import { Game, Tip, Tipster, RecentWinner } from '@/lib/types';
import { generateId } from '@/lib/utils';

// Mock tips data
export const mockTips: Tip[] = [
  {
    id: 'tip1',
    title: 'Barcelona vs Real Madrid',
    description: 'El Clásico - La Liga',
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    status: 'upcoming',
    startTime: new Date(Date.now() + 120 * 60 * 1000).toISOString(),
    teams: {
      home: {
        id: 'barca',
        name: 'FC Barcelona',
        recentForm: ['W', 'W', 'D', 'W', 'L'],
      },
      away: {
        id: 'real',
        name: 'Real Madrid',
        recentForm: ['W', 'W', 'W', 'D', 'W'],
      },
    },
    prediction: {
      type: 'winner',
      value: 'Real Madrid',
      odds: 2.10,
      confidence: 75,
    },
    analysis: 'Real Madrid jobb formában van, az utóbbi 5 meccsükből 4-et megnyertek. A Barcelona védelme gyengélkedik, különösen idegenben.',
    category: 'football',
    tipster: {
      id: 'tipster1',
      username: 'ProTipster',
      winRate: 68,
      expertise: ['La Liga', 'Champions League'],
    },
    stats: {
      likes: 245,
      comments: 57,
      shares: 89,
    },
    minStake: 50,
    maxStake: 5000,
  },
  {
    id: 'tip2',
    title: 'Lakers vs Warriors',
    description: 'NBA Regular Season',
    image: 'https://images.pexels.com/photos/945471/pexels-photo-945471.jpeg',
    status: 'live',
    startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    teams: {
      home: {
        id: 'lakers',
        name: 'Los Angeles Lakers',
        recentForm: ['W', 'L', 'W', 'W', 'W'],
      },
      away: {
        id: 'warriors',
        name: 'Golden State Warriors',
        recentForm: ['L', 'W', 'L', 'W', 'L'],
      },
    },
    prediction: {
      type: 'score',
      value: 'Over 220.5',
      odds: 1.95,
      confidence: 85,
    },
    analysis: 'Mindkét csapat támadó szellemű játékot játszik. Az utóbbi 5 mérkőzésükön átlagosan 230+ pont született.',
    category: 'basketball',
    tipster: {
      id: 'tipster2',
      username: 'NBAExpert',
      winRate: 72,
      expertise: ['NBA', 'Basketball'],
    },
    stats: {
      likes: 189,
      comments: 34,
      shares: 56,
    },
    minStake: 50,
    maxStake: 3000,
  },
];

// Mock tipsters data
export const mockTipsters: Tipster[] = [
  {
    id: 'tipster1',
    username: 'ProTipster',
    tipId: 'tip1',
    tipTitle: 'Barcelona vs Real Madrid',
    stake: 200,
    return: 420,
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    successRate: 68,
    expertise: ['La Liga', 'Champions League'],
  },
  {
    id: 'tipster2',
    username: 'NBAExpert',
    tipId: 'tip2',
    tipTitle: 'Lakers vs Warriors',
    stake: 150,
    return: 292,
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    successRate: 72,
    expertise: ['NBA', 'Basketball'],
  },
  {
    id: 'tipster3',
    username: 'TennisGuru',
    tipId: 'tip3',
    tipTitle: 'Djokovic vs Nadal',
    stake: 300,
    return: 510,
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    successRate: 75,
    expertise: ['Tennis', 'Grand Slams'],
  },
];

// Mock games data
export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Manchester United vs Liverpool',
    description: 'Premier League match of the week',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop',
    status: 'upcoming',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    category: 'sports',
    participants: [
      { id: 'mu', name: 'Manchester United' },
      { id: 'liv', name: 'Liverpool' }
    ],
    odds: { 'mu': 2.10, 'liv': 1.75 },
    minBet: 50,
    maxBet: 5000
  },
  {
    id: '2',
    title: 'CS:GO - Navi vs Faze',
    description: 'ESL Pro League Season 16',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop',
    status: 'live',
    startTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    category: 'esports',
    participants: [
      { id: 'navi', name: 'Natus Vincere' },
      { id: 'faze', name: 'Faze Clan' }
    ],
    odds: { 'navi': 1.90, 'faze': 1.85 },
    minBet: 100,
    maxBet: 10000
  },
  {
    id: '3',
    title: 'NBA Finals - Lakers vs Celtics',
    description: 'Game 7 of the NBA Finals',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&auto=format&fit=crop',
    status: 'upcoming',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    category: 'sports',
    participants: [
      { id: 'lakers', name: 'LA Lakers' },
      { id: 'celtics', name: 'Boston Celtics' }
    ],
    odds: { 'lakers': 1.95, 'celtics': 1.85 },
    minBet: 100,
    maxBet: 10000
  },
  {
    id: '4',
    title: 'League of Legends - T1 vs JDG',
    description: 'World Championship Finals',
    image: 'https://images.unsplash.com/photo-1626240130051-68871c71e991?w=800&auto=format&fit=crop',
    status: 'upcoming',
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    category: 'esports',
    participants: [
      { id: 't1', name: 'T1' },
      { id: 'jdg', name: 'JDG' }
    ],
    odds: { 't1': 1.65, 'jdg': 2.15 },
    minBet: 50,
    maxBet: 5000
  },
  {
    id: '5',
    title: 'Tennis - Djokovic vs Alcaraz',
    description: 'Wimbledon Final',
    image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=800&auto=format&fit=crop',
    status: 'live',
    startTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    category: 'sports',
    participants: [
      { id: 'djok', name: 'Novak Djokovic' },
      { id: 'alc', name: 'Carlos Alcaraz' }
    ],
    odds: { 'djok': 2.05, 'alc': 1.75 },
    minBet: 100,
    maxBet: 8000
  }
];

// Mock recent winners data
export const mockRecentWinners: RecentWinner[] = [
  {
    id: generateId(),
    username: 'SportsMaster',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    gameTitle: 'Real Madrid vs Barcelona',
    amount: 200,
    winningAmount: 460
  },
  {
    id: generateId(),
    username: 'LuckyGamer22',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    gameTitle: 'CS:GO - Navi vs Vitality',
    amount: 500,
    winningAmount: 1250
  },
  {
    id: generateId(),
    username: 'BettingPro',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    gameTitle: 'NBA - Lakers vs Warriors',
    amount: 300,
    winningAmount: 540
  },
  {
    id: generateId(),
    username: 'FootballFan',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    gameTitle: 'Liverpool vs Manchester City',
    amount: 100,
    winningAmount: 180
  },
  {
    id: generateId(),
    username: 'ESportsKing',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    gameTitle: 'League of Legends - G2 vs Fnatic',
    amount: 250,
    winningAmount: 525
  }
];
