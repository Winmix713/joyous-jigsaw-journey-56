
import { Notification, User } from '@/lib/types';

// Mock notifications data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Új Tipp Elérhető!',
    message: 'ProTipster új tippet osztott meg: Barcelona vs Real Madrid mérkőzésre.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '2',
    title: 'Sikeres Előrejelzés!',
    message: 'Gratulálunk! A Bayern München vs Dortmund tipped bejött!',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '3',
    title: 'Új Követő',
    message: 'SportGuru követni kezdte a profilodat. Oszd meg vele legjobb tippjeidet!',
    timestamp: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '4',
    title: 'Heti Rangsor',
    message: 'A #3 helyen állsz a heti tipster ranglistán. Továbbra is szép munka!',
    timestamp: new Date(Date.now() - 1440 * 60 * 1000).toISOString(),
    read: true,
  },
];

// Mock user data
export const mockUser: User & { notifications: Notification[] } = {
  id: '1',
  username: 'TipMaster',
  points: 1250,
  winRate: 68,
  totalTips: 42,
  successfulTips: 28,
  followers: 156,
  expertise: ['Football', 'NBA'],
  notifications: mockNotifications,
};
