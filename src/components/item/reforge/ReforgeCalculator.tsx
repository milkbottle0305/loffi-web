'use client';
import { Equipment, Tier } from '@/constants/item/reforge/ReforgeTable';
import { useState } from 'react';
import { ReforgeCalculatorGrid } from './ReforgeCalculatorGrid';
import { MarketItemWithOneGold } from '@/business/item/markets/transformMarketItem';

const RowCount = 6;

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

export const ReforgeCalculator: React.FC<ReforgeCalculatorProps> = ({ items }) => {
  const [tier, setTier] = useState<Tier>('4-1티어');
  // 저티어 성장 지원 여부
  const [isLowTierSupport, setIsLowTierSupport] = useState(true);
  // 슈모익, 하익 이벤트 지원 여부
  const [isExpressEvent, setIsExpressEvent] = useState(false);
  // 재련 대상의 장비 정보
  const [equipmentInfos, setEquipmentInfos] = useState<EquipmentInfo[]>([]);

  const onChangeSelectedCells: (selectedCells: Set<string>) => void = (selectedCells) => {
    // Step 1: `selectedCells`를 `row` 값별로 그룹화
    const rowsMap: { [key: number]: string[] } = {};
    selectedCells.forEach((cell) => {
      const [row, col] = cell.split('-').map(Number);
      if (!rowsMap[row]) rowsMap[row] = [];
      rowsMap[row].push(col.toString());
    });

    // Step 2: 각 row별로 가장 작은 col을 찾아 `experience`, `janggi`, `failChance` 설정
    const newEquipmentInfos: EquipmentInfo[] = [];

    for (const row in rowsMap) {
      const cols = rowsMap[row];
      const sortedCols = cols.map(Number).sort((a, b) => a - b); // `col`들을 정렬

      const minCol = sortedCols[0]; // 가장 작은 col을 추출
      const equipmentInfosForRow: EquipmentInfo[] = [];

      // 가장 작은 col에 해당하는 셀에 대해 experience, janggi, failChance 설정
      equipmentInfosForRow.push({
        equipment: minCol <= 4 ? '방어구' : '무기',
        step: minCol + 1,
        experience: Number(experience[parseInt(row)]),
        janggi: Number(janggi[parseInt(row)]),
        increasedProbability: Number(failChance[parseInt(row)]),
      });

      // 나머지 col에 대해서는 experience, janggi, failChance는 0으로 설정하고 step, equipment만 설정
      for (let i = 1; i < sortedCols.length; i++) {
        const col = sortedCols[i];
        equipmentInfosForRow.push({
          equipment: col <= 4 ? '방어구' : '무기',
          step: col + 1,
          experience: 0,
          janggi: 0,
          increasedProbability: 0,
        });
      }

      // `equipmentInfosForRow`에 추가된 정보들을 `newEquipmentInfos`에 넣기
      newEquipmentInfos.push(...equipmentInfosForRow);
    }

    console.log(newEquipmentInfos);
    setEquipmentInfos(newEquipmentInfos);
  };

  // 경험치, 장기, 실패 증가 확률 정보
  const [experience, setExperience] = useState<string[]>(
    Array.from({ length: RowCount }, () => '')
  );
  const [janggi, setJanggi] = useState<string[]>(Array.from({ length: RowCount }, () => ''));
  const [failChance, setFailChance] = useState<string[]>(
    Array.from({ length: RowCount }, () => '')
  );

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
          <ReforgeCalculatorGrid
            tier={tier}
            rowCount={RowCount}
            experience={experience}
            setExperience={setExperience}
            janggi={janggi}
            setJanggi={setJanggi}
            failChance={failChance}
            setFailChance={setFailChance}
            onChangeSelectedCells={onChangeSelectedCells}
          />
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
