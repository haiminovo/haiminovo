'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const PLAYLIST_ID = '390942272';
const METING_API = 'https://api.injahow.cn/meting/';

interface Song {
  name: string;
  artist: string;
  url: string;
  cover: string;
}

type LoadState = 'loading' | 'error' | 'done';

async function fetchPlaylist(id: string): Promise<Song[]> {
  const params = new URLSearchParams({ server: 'netease', type: 'playlist', id });
  const res = await fetch(`${METING_API}?${params}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data) || !data.length) throw new Error('Empty playlist');
  return data.map((s: Record<string, string>) => ({
    name: s.name || s.title || '未知歌曲',
    artist: s.artist || s.author || '未知艺术家',
    url: s.url,
    cover: (s.cover || s.pic || '').replace(/^http:/, 'https:'),
  }));
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // defer all work until after hydration (lazy load, avoids blocking critical render)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // fetch playlist
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    fetchPlaylist(PLAYLIST_ID)
      .then((list) => { if (!cancelled) { setSongs(list); setLoadState('done'); } })
      .catch(() => { if (!cancelled) setLoadState('error'); });
    return () => { cancelled = true; };
  }, [mounted]);

  const song = songs[index];

  // audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setIndex((i) => (i + 1 < songs.length ? i + 1 : i));
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
    };
  }, [songs, index]);

  // load new song source when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;
    audio.src = song.url;
    setCurrentTime(0);
    setDuration(0);
  }, [song]);

  // reset index when songs change
  useEffect(() => { setIndex(0); }, [songs]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;
    if (audio.paused) { audio.play().catch(() => { }); } else { audio.pause(); }
  }, [song]);

  const playSong = useCallback((i: number) => {
    setIndex(i);
    // need next tick for src to update before play
    setTimeout(() => audioRef.current?.play().catch(() => { }), 0);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const fmt = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ---- render ----

  if (!mounted) return null;
  if (loadState === 'error') return null;

  return (
    <div className="flex w-full flex-col">
      <span className="p-1 font-medium text-font-strong dark:text-font-light-dark">我的歌单</span>
      <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-custom-color-9 p-3 shadow-md dark:bg-custom-color-dark-9">
        {/* loading skeleton */}
        {loadState === 'loading' && (
          <div className="flex w-full flex-col items-center gap-2 py-2">
            <div className="h-14 w-14 animate-pulse rounded-lg bg-custom-color-8 dark:bg-custom-color-dark-8" />
            <div className="h-3 w-20 animate-pulse rounded bg-custom-color-8 dark:bg-custom-color-dark-8" />
            <div className="h-2 w-14 animate-pulse rounded bg-custom-color-8 dark:bg-custom-color-dark-8" />
          </div>
        )}

        {/* player content */}
        {loadState === 'done' && song && (
          <>
            {/* cover */}
            {song.cover && (
              <img
                className="h-20 w-20 rounded-lg object-cover shadow-sm"
                src={song.cover}
                alt={song.name}
                referrerPolicy="no-referrer"
              />
            )}

            {/* song info */}
            <div className="flex w-full min-w-0 flex-col items-center">
              <span
                className="block w-full truncate text-center text-sm font-medium text-font-normal dark:text-font-light-dark"
                title={song.name}
              >
                {song.name}
              </span>
              <span
                className="block w-full truncate text-center text-xs text-font-light dark:text-font-normal-dark"
                title={song.artist}
              >
                {song.artist}
              </span>
            </div>

            {/* progress */}
            <div className="flex w-full items-center gap-1 text-[10px] text-font-light dark:text-font-normal-dark">
              <span className="w-7 text-right tabular-nums">{fmt(currentTime)}</span>
              <button
                className="relative h-1 flex-1 rounded-full bg-custom-color-8 dark:bg-custom-color-dark-8"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  const audio = audioRef.current;
                  if (audio && duration) audio.currentTime = pct * duration;
                }}
              >
                <span
                  className="absolute inset-0 rounded-full bg-custom-color-5 dark:bg-custom-color-dark-4 transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </button>
              <span className="w-7 tabular-nums">{fmt(duration)}</span>
            </div>

            {/* controls */}
            <div className="flex items-center gap-3">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-font-normal transition-colors hover:bg-custom-color-8 dark:text-font-light-dark dark:hover:bg-custom-color-dark-8"
                onClick={togglePlay}
                aria-label={playing ? '暂停' : '播放'}
              >
                {playing ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19" /></svg>
                )}
              </button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full text-font-light transition-colors hover:bg-custom-color-8 dark:text-font-normal-dark dark:hover:bg-custom-color-dark-8"
                onClick={() => playSong((index + 1) % songs.length)}
                aria-label="下一首"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,5 16,12 6,19" /><rect x="17" y="5" width="3" height="14" rx="1" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* playlist toggle */}
        {loadState === 'done' && songs.length > 0 && (
          <>
            <button
              className="flex w-full items-center justify-center gap-1 rounded-md py-1 text-xs text-font-light transition-colors hover:bg-custom-color-8 dark:text-font-normal-dark dark:hover:bg-custom-color-dark-8"
              onClick={() => setExpanded(!expanded)}
            >
              <svg
                className={`h-3 w-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
              歌单（{songs.length}首）
            </button>

            {expanded && (
              <ul className="flex max-h-44 w-full flex-col overflow-y-auto rounded-md bg-custom-color-8/60 dark:bg-custom-color-dark-8/60">
                {songs.map((s, i) => (
                  <li key={`${s.name}-${i}`}>
                    <button
                      className={`flex w-full items-center justify-between gap-2 truncate rounded py-1.5 text-left text-xs transition-colors hover:bg-custom-color-8 dark:hover:bg-custom-color-dark-8 ${i === index
                        ? 'text-font-strong dark:text-font-light-dark font-medium'
                        : 'text-font-light dark:text-font-normal-dark'
                        }`}
                      onClick={() => { playSong(i); setExpanded(false); }}
                      title={`${s.name} — ${s.artist}`}
                    >
                      <span className="truncate min-w-1/2">{s.name}</span>
                      <span className="truncate text-[8px] opacity-60">{s.artist}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      {/* hidden audio element */}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
