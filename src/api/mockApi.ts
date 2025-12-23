// 本地 mock API：导出与真实 API 相同/相似的函数签名（返回 Promise）
// 放在 src/api 下，组件只需 import api from '@/api' 或相对路径
import { songs as initialSongs, playlists as initialPlaylists, mockUser, Song, Playlist, User } from '../mocks/data';

const LS_PREFIX = 'vibe-mock:';

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
  } catch {}
}
function loadFromStorage<T>(key: string): T | null {
  try {
    const v = localStorage.getItem(LS_PREFIX + key);
    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
}

function delay(ms = 80) {
  return new Promise((r) => setTimeout(r, ms));
}

// 初始化持久化
if (!loadFromStorage<Playlist[]>('playlists')) saveToStorage('playlists', initialPlaylists);
if (!loadFromStorage<Song[]>('songs')) saveToStorage('songs', initialSongs);
if (!loadFromStorage<User>('user')) saveToStorage('user', mockUser);

// 查询所有歌单
export async function getPlaylists(): Promise<Playlist[]> {
  await delay(120);
  return loadFromStorage<Playlist[]>('playlists') || [];
}

export async function getPlaylist(id: string): Promise<Playlist | null> {
  await delay(80);
  const list = loadFromStorage<Playlist[]>('playlists') || [];
  return list.find((p) => p.id === id) ?? null;
}

export async function addPlaylist(playlist: Playlist): Promise<Playlist> {
  const list = loadFromStorage<Playlist[]>('playlists') || [];
  list.push(playlist);
  saveToStorage('playlists', list);
  await delay(60);
  return playlist;
}

export async function updatePlaylist(updated: Playlist): Promise<Playlist | null> {
  const list = loadFromStorage<Playlist[]>('playlists') || [];
  const idx = list.findIndex((p) => p.id === updated.id);
  if (idx === -1) return null;
  list[idx] = updated;
  saveToStorage('playlists', list);
  await delay(60);
  return updated;
}

export async function deletePlaylist(id: string): Promise<boolean> {
  let list = loadFromStorage<Playlist[]>('playlists') || [];
  const before = list.length;
  list = list.filter((p) => p.id !== id);
  saveToStorage('playlists', list);
  await delay(40);
  return list.length < before;
}

export async function getSongs(): Promise<Song[]> {
  await delay(80);
  return loadFromStorage<Song[]>('songs') || [];
}

export async function getSong(id: string): Promise<Song | null> {
  await delay(60);
  const list = loadFromStorage<Song[]>('songs') || [];
  return list.find((s) => s.id === id) ?? null;
}

export async function getUser(): Promise<User | null> {
  await delay(40);
  return loadFromStorage<User>('user') || null;
}

// 如果需要模拟播放进度/事件，可以在此实现一个小的事件总线（略）
// 导出默认对象以简化 import 语句
export default {
  getPlaylists,
  getPlaylist,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
  getSongs,
  getSong,
  getUser,
};
