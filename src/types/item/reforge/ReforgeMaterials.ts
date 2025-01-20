export type Yunghwa =
  | '오레하 융화 재료'
  | '상급 오레하 융화 재료'
  | '최상급 오레하 융화 재료'
  | '아비도스 융화 재료';

export type Papyeon = '조화의 파편' | '명예의 파편' | '운명의 파편';

export type DolpaStone =
  | '조화의 돌파석'
  | '위대한 명예의 돌파석'
  | '경이로운 명예의 돌파석'
  | '찬란한 명예의 돌파석'
  | '운명의 돌파석';
export type PagoeStone =
  | '파괴석 조각'
  | '파괴석'
  | '파괴석 결정'
  | '파괴강석'
  | '정제된 파괴강석'
  | '운명의 파괴석';
export type SuhoStone =
  | '수호석 조각'
  | '수호석 결정'
  | '수호강석'
  | '정제된 수호강석'
  | '운명의 수호석';

export type Tier = '2-1티어' | '3-1티어' | '3-2티어' | '3-3티어' | '4-1티어';
export type Equipment = '무기' | '방어구';
export type ReforgeCase = 'average' | 'best' | 'worst';
export type AdditionalCase = 'none' | 'optional' | 'full';

export type ReforgeMaterial =
  | Yunghwa
  | Papyeon
  | DolpaStone
  | PagoeStone
  | SuhoStone
  | 'silling'
  | 'gold';
export type ReforgeMaterials = Partial<Record<ReforgeMaterial, number>>;
/** 티어-장비종류-재련단계에 해당되는 재료를 나타내는 인터페이스 */
export interface ReforgeTableRow extends ReforgeMaterials {
  experience: number; // 경험치
  probability: number; // 성공 확률
}

/** 1번 재련 누를 때 필요한 재련 재료들 */
export type AllReforgeMaterials = ReforgeMaterials | AdditionalReforeMaterials;
