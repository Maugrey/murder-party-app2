import { useEffect, useState } from 'react';
import { useGlobalStore } from '../stores/globalStore';

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const Timer = () => {
  const gameStartTime = useGlobalStore((s) => s.gameStartTime);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!gameStartTime) return <span className="text-gray-400">00:00</span>;
  const elapsed = now - gameStartTime;
  return <span className="font-mono text-sm">{formatTime(elapsed)}</span>;
};

export default Timer;
