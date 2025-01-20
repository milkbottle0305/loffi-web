type Tier2Breath = '별의 숨결';
export type Tier3Breath = '태양의 은총' | '태양의 축복' | '태양의 가호';
export type Tier4Breath = '빙하의 숨결' | '용암의 숨결';
export type Breath = Tier2Breath | Tier3Breath | Tier4Breath;
export interface BreathRow {
  maxAmount: number;
  probability: number;
}
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
