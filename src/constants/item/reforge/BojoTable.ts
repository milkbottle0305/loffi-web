import {
  Tier3Breath,
  BreathRow,
  Tier4Breath,
  Breath,
} from '@/types/item/reforge/AdditionalReforgeMaterials';
import { Tier } from '@/types/item/reforge/ReforgeMaterials';

const Tier3BreathTable: Record<number, Record<Tier3Breath, BreathRow>> = {
  0.6: {
    '태양의 은총': { maxAmount: 12, probability: 0.0167 },
    '태양의 축복': { maxAmount: 6, probability: 0.0333 },
    '태양의 가호': { maxAmount: 2, probability: 0.1 },
  },
  0.5: {
    '태양의 은총': { maxAmount: 12, probability: 0.0105 },
    '태양의 축복': { maxAmount: 6, probability: 0.0279 },
    '태양의 가호': { maxAmount: 2, probability: 0.0837 },
  },
  0.45: {
    '태양의 은총': { maxAmount: 12, probability: 0.0125 },
    '태양의 축복': { maxAmount: 6, probability: 0.025 },
    '태양의 가호': { maxAmount: 2, probability: 0.075 },
  },
  0.3: {
    '태양의 은총': { maxAmount: 12, probability: 0.0084 },
    '태양의 축복': { maxAmount: 6, probability: 0.0167 },
    '태양의 가호': { maxAmount: 2, probability: 0.05 },
  },
  0.15: {
    '태양의 은총': { maxAmount: 24, probability: 0.0021 },
    '태양의 축복': { maxAmount: 12, probability: 0.0042 },
    '태양의 가호': { maxAmount: 4, probability: 0.0125 },
  },
  0.1: {
    '태양의 은총': { maxAmount: 24, probability: 0.0014 },
    '태양의 축복': { maxAmount: 12, probability: 0.0028 },
    '태양의 가호': { maxAmount: 4, probability: 0.0083 },
  },
  0.05: {
    '태양의 은총': { maxAmount: 36, probability: 0.0005 },
    '태양의 축복': { maxAmount: 18, probability: 0.0009 },
    '태양의 가호': { maxAmount: 6, probability: 0.0028 },
  },
  0.04: {
    '태양의 은총': { maxAmount: 36, probability: 0.0004 },
    '태양의 축복': { maxAmount: 18, probability: 0.0007 },
    '태양의 가호': { maxAmount: 6, probability: 0.0022 },
  },
  0.03: {
    '태양의 은총': { maxAmount: 36, probability: 0.0003 },
    '태양의 축복': { maxAmount: 18, probability: 0.0006 },
    '태양의 가호': { maxAmount: 6, probability: 0.0017 },
  },
  0.015: {
    '태양의 은총': { maxAmount: 48, probability: 0.0001 },
    '태양의 축복': { maxAmount: 24, probability: 0.0002 },
    '태양의 가호': { maxAmount: 8, probability: 0.0007 },
  },
  0.01: {
    '태양의 은총': { maxAmount: 48, probability: 0.0001 },
    '태양의 축복': { maxAmount: 24, probability: 0.0002 },
    '태양의 가호': { maxAmount: 8, probability: 0.0004 },
  },
  0.005: {
    '태양의 은총': { maxAmount: 48, probability: 0.0001 },
    '태양의 축복': { maxAmount: 24, probability: 0.0002 },
    '태양의 가호': { maxAmount: 8, probability: 0.0004 },
  },
};
const Tier4BreathTable: Record<number, Record<Tier4Breath, BreathRow>> = {
  0.1: {
    '빙하의 숨결': { maxAmount: 20, probability: 0.005 },
    '용암의 숨결': { maxAmount: 20, probability: 0.005 },
  },
  0.05: {
    '빙하의 숨결': { maxAmount: 20, probability: 0.0025 },
    '용암의 숨결': { maxAmount: 20, probability: 0.0025 },
  },
  0.04: {
    '빙하의 숨결': { maxAmount: 20, probability: 0.002 },
    '용암의 숨결': { maxAmount: 20, probability: 0.002 },
  },
  0.03: {
    '빙하의 숨결': { maxAmount: 20, probability: 0.0015 },
    '용암의 숨결': { maxAmount: 20, probability: 0.0015 },
  },
  0.015: {
    '빙하의 숨결': { maxAmount: 25, probability: 0.0006 },
    '용암의 숨결': { maxAmount: 25, probability: 0.0006 },
  },
  0.01: {
    '빙하의 숨결': { maxAmount: 25, probability: 0.0004 },
    '용암의 숨결': { maxAmount: 25, probability: 0.0004 },
  },
  0.005: {
    '빙하의 숨결': { maxAmount: 50, probability: 0.0002 },
    '용암의 숨결': { maxAmount: 50, probability: 0.0002 },
  },
};
export const BreathTable: Record<Tier, Record<number, Partial<Record<Breath, BreathRow>>>> = {
  '2-1티어': {
    0.45: {
      '별의 숨결': { maxAmount: 15, probability: 0.03 },
    },
    0.4: {
      '별의 숨결': { maxAmount: 20, probability: 0.02 },
    },
  },
  '3-1티어': Tier3BreathTable,
  '3-2티어': Tier3BreathTable,
  '3-3티어': Tier3BreathTable,
  '4-1티어': Tier4BreathTable,
};

type Tier3_1Book =
  | '야금술 : 비늘 [5-7]'
  | '재봉술 : 비늘 [5-7]'
  | '야금술 : 선혈 [8-10]'
  | '재봉술 : 선혈 [8-10]'
  | '야금술 : 마수 [11-15]'
  | '재봉술 : 마수 [11-15]';
type Tier3_2Book =
  | '야금술 : 몽환 [13-15]'
  | '재봉술 : 몽환 [13-15]'
  | '야금술 : 몽환 [16-19]'
  | '재봉술 : 몽환 [16-19]';
type Tier3_3Book =
  | '야금술 : 쇠락 [13-15]'
  | '재봉술 : 쇠락 [13-15]'
  | '야금술 : 쇠락 [16-19]'
  | '재봉술 : 쇠락 [16-19]';
type Tier3_4Book = '야금술 : 업화 [11-14]' | '재봉술 : 업화 [11-14]';
type Book = Tier3_1Book | Tier3_2Book | Tier3_3Book | Tier3_4Book;

export type BookMaterials = Partial<Record<Book, number>>;
