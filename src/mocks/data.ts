// Mock 数据与类型（把你真实的字段结构按需替换）
// 这里是单一数据来源：所有“后端”数据都写在该文件里
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  url?: string;
  cover?: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  songs: Song[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export const songs: Song[] = [
  {
    id: 's1',
    title: 'Sunny Day',
    artist: 'Artist A',
    duration: 210,
    url: '/media/sunny.mp3',
    cover: '/img/covers/c1.jpg',
  },
  {
    id: 's2',
    title: 'Night Drive',
    artist: 'Artist B',
    duration: 185,
    url: '/media/night.mp3',
    cover: '/img/covers/c2.jpg',
  },
  {
    id: 's3',
    title: 'Chill Vibes',
    artist: 'Artist C',
    duration: 240,
    url: '/media/chill.mp3',
    cover: '/img/covers/c3.jpg',
  },
];

export const playlists: Playlist[] = [
  {
    id: 'p1',
    title: 'Favorites',
    description: 'My favourite tracks',
    songs: [songs[0], songs[1]],
  },
  {
    id: 'p2',
    title: 'Chill',
    description: 'Relaxing music',
    songs: [songs[2]],
  },
];

export const mockUser: User = {
  id: 'u1',
  name: 'Demo User',
  avatar: '/img/avatar.png',
  email: 'demo@example.com',
};
