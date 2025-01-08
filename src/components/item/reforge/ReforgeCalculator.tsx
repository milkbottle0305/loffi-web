'use client';
import { Equipment, Tier } from '@/constants/item/reforge/ReforgeTable';
import { useMemo, useState } from 'react';
import { ReforgeCalculatorGrid } from './ReforgeCalculatorGrid';
import { MarketItemWithOneGold } from '@/business/item/markets/transformMarketItem';
import { calculateReforgeMaterials } from '@/business/item/reforge/calculateReforgeGold';

interface ReforgeCalculatorProps {
  items: MarketItemWithOneGold[];
}

export interface EquipmentInfo {
  equipment: Equipment;
  step: number;
  experience: number;
  janggi: number;
  increasedProbability: number;
}

export const ReforgeCalculator = ({ items }: ReforgeCalculatorProps) => {
  const [tier, setTier] = useState<Tier>('4-1티어');
  // 저티어 성장 지원 여부
  const [isLowTierSupport, setIsLowTierSupport] = useState(true);
  // 슈모익, 하익 이벤트 지원 여부
  const [isExpressEvent, setIsExpressEvent] = useState(false);
  // 재련 대상의 장비 정보
  const [equipmentInfos, setEquipmentInfos] = useState<EquipmentInfo[]>([]);

  const handleTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTier = event.target.value as Tier;

    if (['2-1티어', '3-1티어', '3-2티어', '3-3티어', '4-1티어'].includes(selectedTier)) {
      setTier(selectedTier); // 유효한 값일 경우에만 상태 변경
    } else {
      console.error('해당 티어는 존재하지 않습니다: ', selectedTier); // 잘못된 값 선택 시 에러 처리
    }
  };

  const calculateTotalCost = [
    {
      Icon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_250.png',
      Amount: 4,
    },
    {
      Icon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_250.png',
      Amount: 4,
    },
    {
      Icon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_250.png',
      Amount: 4,
    },
    {
      Icon: 'https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_8_250.png',
      Amount: 4,
    },
  ];

  // interface IconAmount {
  //   Icon: string;
  //   Amount: number;
  // };
  // const calculateTotalCost: IconAmount[] = useMemo(() => {
  //   calculateReforgeMaterials({
  //     tier,
  //     equipment: '방어구',

  //   });
  // }, [];

  return (
    <div className="flex w-full flex-col items-center">
      <div className="my-4 flex w-full flex-col items-center">
        <div className="flex items-center gap-2">
          <select className="rounded border p-2" value={tier} onChange={handleTierChange}>
            <option value="2-1티어">2티어: 500</option>
            <option value="3-1티어">3티어: 1250</option>
            <option value="3-2티어">3티어: 1390</option>
            <option value="3-3티어">3티어: 1525</option>
            <option value="4-1티어">4티어: 1590</option>
          </select>
          <input
            type="checkbox"
            checked={isLowTierSupport}
            onChange={() => setIsLowTierSupport(!isLowTierSupport)}
          />
          <label>저티어 성장 지원</label>
          <input
            type="checkbox"
            checked={isExpressEvent}
            onChange={() => setIsExpressEvent(!isExpressEvent)}
          />
          <label>슈모익, 하익 이벤트</label>
        </div>
        <div className="max-w-full overflow-x-auto">
          <ReforgeCalculatorGrid tier={tier} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold">재련 총 비용</p>
        <div className="flex items-center justify-center gap-1">
          {calculateTotalCost.map((cost, index) => (
            <div key={index} className="flex items-center gap-1">
              <img src={cost.Icon} alt="재료" className="h-8 w-8" />
              <p className="font-semibold">{cost.Amount}개</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
