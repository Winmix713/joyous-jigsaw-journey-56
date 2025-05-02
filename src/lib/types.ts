
export interface User {
  id: string;
  username: string;
  points: number;
  winRate: number;
  totalTips: number;
  successfulTips: number;
  followers: number;
  expertise: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
}

export interface Team {
  id: string;
  name: string;
  image?: string;
  recentForm?: string[]; // pl.: ['W', 'L', 'W']
  stats?: Record<string, number | string>; // szebb TypeScript forma
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  image: string;
  status: 'upcoming' | 'live' | 'completed';
  startTime: string; // ISO string
  endTime?: string;
  teams: {
    home: Team;
    away: Team;
  };
  prediction: {
    type: 'winner' | 'score' | 'other';
    value: string;
    odds: number;
    confidence: number; // százalékban (0-100)
  };
  analysis: string;
  category: 'football' | 'basketball' | 'tennis' | 'esports';
  tipster: {
    id: string;
    username: string;
    winRate: number;
    expertise: string[];
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  minStake: number;
  maxStake: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  tipId: string;
  content: string;
  timestamp: string; // ISO string
  likes: number;
}

export interface TipHistory {
  id: string;
  tipId: string;
  userId: string;
  stake: number;
  prediction: string;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  placedAt: string; // ISO string
  potentialReturn: number;
}

export interface Tipster {
  id: string;
  username: string;
  tipId: string;
  tipTitle: string;
  stake: number;
  return: number;
  timestamp: string; // ISO string
  successRate: number;
  expertise: string[];
}

// Adding missing Game type
export interface Game {
  id: string;
  title: string;
  description: string;
  image?: string;
  status: 'upcoming' | 'live' | 'completed';
  startTime: string;
  endTime?: string;
  category: string;
  participants: {
    id: string;
    name: string;
    isPopular?: boolean;
  }[];
  odds: Record<string, number>;
  minBet: number;
  maxBet: number;
}

// Adding types for recent winners
export interface RecentWinner {
  id: string;
  username: string;
  timestamp: string;
  gameTitle: string;
  amount: number;
  winningAmount: number;
}

// Type for the current bet
export interface CurrentBet {
  gameId: string | null;
  selectedParticipantId: string | null;
  amount: number;
}

// Soccer Championship Analysis Types
export interface LeagueData {
  id: string;
  name: string;
  season: string;
  status: 'active' | 'completed' | 'upcoming';
  teams: TeamData[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamData {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export interface Match {
  id: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  status: 'scheduled' | 'played' | 'canceled' | 'postponed';
  round: number;
  venue?: string;
}

export interface Standing {
  teamId: string;
  teamName: string;
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

export interface TeamForm {
  teamId: string;
  teamName: string;
  lastMatches: Array<{
    matchId: string;
    opponent: string;
    result: 'W' | 'D' | 'L';
    homeScore: number;
    awayScore: number;
    wasHome: boolean;
  }>;
}
