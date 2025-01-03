'use client';
import { Tier } from '@/constants/item/reforge/ReforgeTable';
import { useState } from 'react';
import { ReforgeCalculatorGrid } from './ReforgeCalculatorGrid';

export const ReforgeCalculator = () => {
  const [tier, setTier] = useState<Tier>('4-1티어');
  // 저티어 성장 지원 여부
  const [isLowTierSupport, setIsLowTierSupport] = useState(true);
  // 슈모익, 하익 이벤트 지원 여부
  const [isExpressEvent, setIsExpressEvent] = useState(false);

  const handleTierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTier = event.target.value as Tier;

    if (['2-1티어', '3-1티어', '3-2티어', '3-3티어', '4-1티어'].includes(selectedTier)) {
      setTier(selectedTier); // 유효한 값일 경우에만 상태 변경
    } else {
      console.error('해당 티어는 존재하지 않습니다: ', selectedTier); // 잘못된 값 선택 시 에러 처리
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
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
      <ReforgeCalculatorGrid tier={tier} />
    </div>
  );
};
