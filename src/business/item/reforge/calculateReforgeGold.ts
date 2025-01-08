import {
  Tier,
  Equipment,
  ReforgeTable,
  ReforgeMaterials,
} from '@/constants/item/reforge/ReforgeTable';

export function calculateReforgeMaterials({
  tier,
  equipment,
  step,
  experience,
  janggi,
  increasedProbability,
  isLowTierSupport,
  isExpressEvent,
  reforgeCase,
}: {
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
  isLowTierSupport: boolean;
  isExpressEvent: boolean;
  reforgeCase: 'average' | 'best' | 'worst';
}): ReforgeMaterials {
  switch (reforgeCase) {
    case 'average':
      return averageReforgeMaterials({
        tier,
        equipment,
        step,
        experience,
        janggi,
        increasedProbability,
        isLowTierSupport,
        isExpressEvent,
      });
    case 'best':
      return bestReforgeMaterials({
        tier,
        equipment,
        step,
        experience,
      });
    case 'worst':
      return worstReforgeMaterials({
        tier,
        equipment,
        janggi,
        step,
        experience,
      });
  }
}

// 1트 만에 성공했을 때 필요한 재련 재료 계산
function bestReforgeMaterials({
  tier,
  equipment,
  step,
  experience,
}: {
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
}): ReforgeMaterials {
  let oneTryReforgeMaterials = ReforgeTable[tier][equipment][step];
  oneTryReforgeMaterials = {
    ...oneTryReforgeMaterials,
    experience: calculateExperienceToPapyeon(tier, equipment, step, experience),
  };

  return oneTryReforgeMaterials;
}

// 장기백 이었을 때 필요한 재련 재료 계산
function worstReforgeMaterials({
  tier,
  equipment,
  janggi,
  step,
  experience,
}: {
  tier: Tier;
  equipment: Equipment;
  janggi: number;
  step: number;
  experience: number;
}): ReforgeMaterials {
  let worstReforgeMaterials = ReforgeTable[tier][equipment][step];
  worstReforgeMaterials = {
    ...worstReforgeMaterials,
    experience: calculateExperienceToPapyeon(tier, equipment, step, experience),
  };

  return worstReforgeMaterials;
}

// 평균적으로 필요한 재련 재료 계산
function averageReforgeMaterials({
  tier,
  equipment,
  step,
  experience,
  janggi,
  increasedProbability,
  isLowTierSupport,
  isExpressEvent,
}: {
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
  isLowTierSupport: boolean;
  isExpressEvent: boolean;
}): ReforgeMaterials {
  let averageReforgeMaterials = ReforgeTable[tier][equipment][step];
  averageReforgeMaterials = {
    ...averageReforgeMaterials,
    experience: calculateExperienceToPapyeon(tier, equipment, step, experience),
  };

  return averageReforgeMaterials;
}

// 현재 장비의 경험치에 따른 필요 파편 수 계산
function calculateExperienceToPapyeon(
  tier: Tier,
  equipment: Equipment,
  step: number,
  experience: number
): number {
  return Math.ceil(ReforgeTable[tier][equipment][step].experience / ((100 - experience) / 100));
}
