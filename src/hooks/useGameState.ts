// Hook personnalisé pour centraliser l'accès à l'état global du jeu
import { useGlobalStore } from '../stores/globalStore';

export function useGameState() {
  const isGameStarted = useGlobalStore((s) => s.isGameStarted);
  const currentPhase = useGlobalStore((s) => s.currentPhase);
  const gameStartTime = useGlobalStore((s) => s.gameStartTime);
  const phaseStartTime = useGlobalStore((s) => s.phaseStartTime);
  const conditions = useGlobalStore((s) => s.conditions);
  const cluesViewed = useGlobalStore((s) => s.cluesViewed);
  const itemsTaken = useGlobalStore((s) => s.itemsTaken);
  const memoriesShown = useGlobalStore((s) => s.memoriesShown);

  // setters si besoin
  const setIsGameStarted = useGlobalStore((s) => s.setIsGameStarted);
  const setCurrentPhase = useGlobalStore((s) => s.setCurrentPhase);
  const setGameStartTime = useGlobalStore((s) => s.setGameStartTime);
  const setPhaseStartTime = useGlobalStore((s) => s.setPhaseStartTime);
  const setConditions = useGlobalStore((s) => s.setConditions);
  const setCluesViewed = useGlobalStore((s) => s.setCluesViewed);
  const setItemsTaken = useGlobalStore((s) => s.setItemsTaken);
  const setMemoriesShown = useGlobalStore((s) => s.setMemoriesShown);

  return {
    isGameStarted,
    currentPhase,
    gameStartTime,
    phaseStartTime,
    conditions,
    cluesViewed,
    itemsTaken,
    memoriesShown,
    setIsGameStarted,
    setCurrentPhase,
    setGameStartTime,
    setPhaseStartTime,
    setConditions,
    setCluesViewed,
    setItemsTaken,
    setMemoriesShown,
  };
}
