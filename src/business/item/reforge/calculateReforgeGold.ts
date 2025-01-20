import { ReforgeTable } from '@/constants/item/reforge/ReforgeTable';
import { ReforgeMaterials } from '@/types/item/reforge/ReforgeMaterials';
import {
  Tier,
  Equipment,
  ReforgeCase,
  Papyeon,
  AdditionalCase,
} from '@/types/item/reforge/ReforgeMaterials';
import { MarketItemWithOneGold } from '../markets/transformMarketItem';
import { BreathTable } from '@/constants/item/reforge/BojoTable';
import { Breath, BreathRow } from '@/types/item/reforge/AdditionalReforgeMaterials';

export function calculateReforgeMaterials({
  items,
  tier,
  equipment,
  step,
  experience,
  janggi,
  increasedProbability,
  isLowTierSupport,
  isExpressEvent,
  reforgeCase,
  additionalCase,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
  isLowTierSupport: boolean;
  isExpressEvent: boolean;
  reforgeCase: ReforgeCase;
  additionalCase: AdditionalCase;
}): ReforgeMaterials {
  switch (reforgeCase) {
    case 'average':
      return averageReforgeMaterials({
        items,
        tier,
        equipment,
        step,
        experience,
        janggi,
        increasedProbability,
        isLowTierSupport,
        isExpressEvent,
        additionalCase,
      });
    case 'best':
      return bestReforgeMaterials({
        items,
        tier,
        equipment,
        step,
        experience,
        additionalCase,
      });
    case 'worst':
      return worstReforgeMaterials({
        items,
        tier,
        equipment,
        janggi,
        step,
        experience,
        additionalCase,
      });
  }
}

// 1트 만에 성공했을 때 필요한 재련 재료 계산
function bestReforgeMaterials({
  items,
  tier,
  equipment,
  step,
  experience,
  additionalCase,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  additionalCase: AdditionalCase;
}): ReforgeMaterials {
  let oneTryReforgeMaterials = ReforgeTable[tier][equipment][step];
  const { experience: _exp, probability: _prob, ...materials } = oneTryReforgeMaterials;
  const additionalPapyeon = calculateExperienceToPapyeon(tier, equipment, step, experience);

  const totalReforgeMaterials: ReforgeMaterials = { ...materials };
  addAdditionalPapyeonToMaterials(totalReforgeMaterials, tier, additionalPapyeon);

  return totalReforgeMaterials;
}

// 장기백 이었을 때 필요한 재련 재료 계산
function worstReforgeMaterials({
  items,
  tier,
  equipment,
  janggi,
  step,
  experience,
  additionalCase,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  janggi: number;
  step: number;
  experience: number;
  additionalCase: AdditionalCase;
}): ReforgeMaterials {
  let oneTryReforgeMaterials = ReforgeTable[tier][equipment][step];
  const { experience: _exp, probability: _prob, ...materials } = oneTryReforgeMaterials;
  oneTryReforgeMaterials = {
    ...materials,
    ...calculateFullAdditionalMaterials(
      items,
      tier,
      equipment,
      oneTryReforgeMaterials.probability,
      oneTryReforgeMaterials.probability
    ),
  };

  const additionalPapyeon = calculateExperienceToPapyeon(tier, equipment, step, experience);
  addAdditionalPapyeonToMaterials(totalReforgeMaterials, tier, additionalPapyeon);
  return materials;
}

// 평균적으로 필요한 재련 재료 계산
function averageReforgeMaterials({
  items,
  tier,
  equipment,
  step,
  experience,
  janggi,
  increasedProbability,
  isLowTierSupport,
  isExpressEvent,
  additionalCase,
}: {
  items: MarketItemWithOneGold[];
  tier: Tier;
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
  isLowTierSupport: boolean;
  isExpressEvent: boolean;
  additionalCase: AdditionalCase;
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
  return Math.ceil(ReforgeTable[tier][equipment][step].experience * ((100 - experience) / 100));
}

function addAdditionalPapyeonToMaterials(
  materials: ReforgeMaterials,
  tier: Tier,
  additionalPapyeon: number
): void {
  const papyeonByTier: Record<Tier, Papyeon> = {
    '2-1티어': '조화의 파편',
    '3-1티어': '명예의 파편',
    '3-2티어': '명예의 파편',
    '3-3티어': '명예의 파편',
    '4-1티어': '운명의 파편',
  };

  const papyeonType = papyeonByTier[tier];
  materials[papyeonType] = (materials[papyeonType] || 0) + additionalPapyeon;
}

function calculateFullAdditionalMaterials(
  items: MarketItemWithOneGold[],
  tier: Tier,
  equipment: Equipment,
  probability: number,
  maxAdditionalMaterialsProbability: number
): Partial<Record<Breath, number>> {
  const breathRow: Partial<Record<Breath, BreathRow>> = BreathTable[tier][probability];
  switch (tier) {
    case '4-1티어':
      return calculate41TierFullAdditionalMaterials(
        breathRow,
        items,
        equipment,
        maxAdditionalMaterialsProbability
      );
    default:
      return calculateNone41TierFullAdditionalMaterials(
        breathRow,
        items,
        maxAdditionalMaterialsProbability
      );
  }
}

function calculate41TierFullAdditionalMaterials(
  breathRow: Partial<Record<Breath, BreathRow>>,
  items: MarketItemWithOneGold[],
  equipment: Equipment,
  maxAdditionalMaterialsProbability: number
): Partial<Record<Breath, number>> {
  const efficientList: [Breath, number][] = [];
  items.forEach((item) => {
    if (equipment === '무기' && item.Name === '용암의 숨결' && breathRow['용암의 숨결']) {
      efficientList.push(['용암의 숨결', breathRow['용암의 숨결'].probability / item.OnePrice]);
    } else if (equipment === '방어구' && item.Name === '빙하의 숨결' && breathRow['빙하의 숨결']) {
      efficientList.push(['빙하의 숨결', breathRow['빙하의 숨결'].probability / item.OnePrice]);
    }
  });
  efficientList.sort((a, b) => b[1] - a[1]);

  const additionalMaterials: Partial<Record<Breath, number>> = {};
  let additionalMaterialsProbability = 0;
  efficientList.every(([breath, _]) => {
    if (!breathRow[breath]) return false;
    for (let i = 0; i < breathRow[breath].maxAmount; i++) {
      additionalMaterialsProbability += breathRow[breath].probability;
      additionalMaterials[breath] = (additionalMaterials[breath] || 0) + 1;
      if (additionalMaterialsProbability >= maxAdditionalMaterialsProbability) {
        return false;
      }
    }
  });

  return additionalMaterials;
}

function calculateNone41TierFullAdditionalMaterials(
  breathRow: Partial<Record<Breath, BreathRow>>,
  items: MarketItemWithOneGold[],
  maxAdditionalMaterialsProbability: number
): Partial<Record<Breath, number>> {
  const efficientList: [Breath, number][] = [];

  Object.entries(breathRow).forEach(([breath, row]) => {
    items.forEach((item) => {
      if (item.Name === breath && row) {
        efficientList.push([breath as Breath, row.probability / item.OnePrice]);
      }
    });
  });
  efficientList.sort((a, b) => b[1] - a[1]);

  const additionalMaterials: Partial<Record<Breath, number>> = {};
  let additionalMaterialsProbability = 0;
  efficientList.every(([breath, _]) => {
    if (!breathRow[breath]) return false;
    for (let i = 0; i < breathRow[breath].maxAmount; i++) {
      additionalMaterialsProbability += breathRow[breath].probability;
      additionalMaterials[breath] = (additionalMaterials[breath] || 0) + 1;
      if (additionalMaterialsProbability >= maxAdditionalMaterialsProbability) {
        return false;
      }
    }
  });

  return additionalMaterials;
}
