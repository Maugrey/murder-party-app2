import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameState } from '../hooks/useGameState';

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const Timer = () => {
  const { t } = useTranslation();
  const { currentPhase, gameStartTime, phaseStartTime } = useGameState();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsedGame = gameStartTime ? now - gameStartTime : 0;
  const elapsedPhase = phaseStartTime ? now - phaseStartTime : 0;

  return (
    <div className="flex flex-row gap-1 md:gap-4 items-center text-xs md:text-sm">
      <span className="font-semibold">{t('Timer.phase', { phase: currentPhase })}</span>
      <span>{t('Timer.totalTime', { time: formatTime(elapsedGame) })}</span>
      <span>{t('Timer.phaseTime', { time: formatTime(elapsedPhase) })}</span>
    </div>
  );
};

export default Timer;
