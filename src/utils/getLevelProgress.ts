import type { LevelConfigResponse } from '@/types/quest.types';

interface LevelProgress {
  level: number;
  currentXP: number;
  maxXP: number;
}

export function getLevelProgress(
  exp: number,
  levelConfigs: LevelConfigResponse[],
): LevelProgress {
  const sorted = [...levelConfigs].sort((a, b) => a.level - b.level);

  let currentLevel = sorted[0];
  let nextLevel: LevelConfigResponse | undefined;

  for (let i = 0; i < sorted.length; i++) {
    if (i + 1 < sorted.length && exp >= sorted[i + 1].totalExpRequired) {
      continue;
    }
    currentLevel = sorted[i];
    nextLevel = sorted[i + 1];
    break;
  }

  if (!nextLevel) {
    return {
      level: currentLevel.level,
      currentXP: currentLevel.expDelta,
      maxXP: currentLevel.expDelta,
    };
  }

  return {
    level: currentLevel.level,
    currentXP: exp - currentLevel.totalExpRequired,
    maxXP: nextLevel.totalExpRequired - currentLevel.totalExpRequired,
  };
}
