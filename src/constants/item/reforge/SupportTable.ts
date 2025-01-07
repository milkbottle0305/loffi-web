import { Tier } from './ReforgeTable';

interface SupportRow {
  increaseProbability?: number;
  decreaseExperience?: number;
  decreaseMaterials?: number;
  decreaseGold?: number;
  decreaseSilling?: number;
}

type Tier2SupportStep = 'ALL';
type Tier3_1SupportStep = '1-10' | '11-12' | '13-14' | '15';
type Tier3_2SupportStep = '1-19' | '20';
type Tier3_3SupportStep = '1-15';

export const SupportTable: Record<Tier, Record<number, SupportRow>> = {
  '2-1티어': {
    1: {
      increaseProbability: 0.2,
      decreaseExperience: 0.3,
      decreaseMaterials: 0.2,
    },
  },
  '3-1티어': {
    1: {
      increaseProbability: 0.2,
      decreaseExperience: 0.3,
      decreaseMaterials: 0.2,
    },
  },
  '3-2티어': {
    1: {
      increaseProbability: 0.3,
      decreaseExperience: 0.4,
      decreaseMaterials: 0.3,
    },
  },
  '3-3티어': {
    1: {
      increaseProbability: 0.3,
      decreaseExperience: 0.4,
      decreaseMaterials: 0.3,
    },
  },
  '4-1티어': {
    1: {
      increaseProbability: 0.3,
      decreaseExperience: 0.4,
      decreaseMaterials: 0.3,
    },
  },
};
