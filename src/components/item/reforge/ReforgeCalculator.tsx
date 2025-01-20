'use client';
import { ReforgeMaterials } from '@/types/item/reforge/ReforgeMaterials';
import {
  AdditionalCase,
  Equipment,
  ReforgeMaterial,
  ReforgeCase,
  Tier,
} from '@/types/item/reforge/ReforgeMaterials';
import { useCallback, useEffect, useState } from 'react';
import { ReforgeCalculatorGrid } from './ReforgeCalculatorGrid';
import { MarketItemWithOneGold } from '@/business/item/markets/transformMarketItem';
import { add, debounce } from 'lodash';
import { calculateReforgeMaterials } from '@/business/item/reforge/calculateReforgeGold';
import { converItemNameToSrc } from '@/lib/utils/convertItemNameToSrc';

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
  // 재련 케이스 선택
  // 티어, 재련확률 케이스, 추가재료 케이스 선택
  const [tier, setTier] = useState<Tier>('4-1티어');
  const [reforgeCase, setReforgeCase] = useState<ReforgeCase>('best');
  const [additionalCase, setAdditionalCase] = useState<AdditionalCase>('none');
  // 저티어 성장 지원 여부
  const [isLowTierSupport, setIsLowTierSupport] = useState(true);
  // 슈모익, 하익 이벤트 지원 여부
  const [isExpressEvent, setIsExpressEvent] = useState(false);
  // 재련 대상의 장비 정보
  const [equipmentInfos, setEquipmentInfos] = useState<EquipmentInfo[]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
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

  const handleReforgeCaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedReforgeCase = event.target.value as ReforgeCase;

    if (['best', 'average', 'worst'].includes(selectedReforgeCase)) {
      setReforgeCase(selectedReforgeCase); // 유효한 값일 경우에만 상태 변경
    } else {
      console.error('해당 케이스는 존재하지 않습니다: ', selectedReforgeCase); // 잘못된 값 선택 시 에러 처리
    }
  };

  const handleAdditionalCaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAdditionalCase = event.target.value as AdditionalCase;

    if (['none', 'optional', 'full'].includes(selectedAdditionalCase)) {
      setAdditionalCase(selectedAdditionalCase); // 유효한 값일 경우에만 상태 변경
    } else {
      console.error('해당 케이스는 존재하지 않습니다: ', selectedAdditionalCase); // 잘못된 값 선택 시 에러 처리
    }
  };

  const [totalReforgeMaterials, setTotalReforgeMaterials] = useState<
    Partial<Record<ReforgeMaterial, number>>
  >({});

  const calculateTotalReforgeMaterials = useCallback(() => {
    const totalMaterials: ReforgeMaterials = {};

    equipmentInfos.forEach((equipmentInfo) => {
      const reforgeMaterials = calculateReforgeMaterials({
        items,
        tier,
        equipment: equipmentInfo.equipment,
        step: equipmentInfo.step,
        experience: equipmentInfo.experience,
        janggi: equipmentInfo.janggi,
        increasedProbability: equipmentInfo.increasedProbability,
        isLowTierSupport,
        isExpressEvent,
        reforgeCase,
        additionalCase,
      });

      (Object.keys(reforgeMaterials) as (keyof ReforgeMaterials)[]).forEach((material) => {
        const count = reforgeMaterials[material] || 0;
        totalMaterials[material] = (totalMaterials[material] || 0) + count;
      });
    });

    setTotalReforgeMaterials(totalMaterials);
  }, [equipmentInfos, tier, isLowTierSupport, isExpressEvent, reforgeCase, additionalCase]);

  const onChangeSelectedCells = useCallback(() => {
    if (selectedCells.size === 0) {
      setEquipmentInfos([]);
      return;
    }
    const expJanggiFailTarget: Map<number, number> = new Map();
    selectedCells.forEach((cell) => {
      const [row, col] = cell.split('-').map(Number);
      if (expJanggiFailTarget.has(row)) {
        const prevCol = expJanggiFailTarget.get(row);
        prevCol! > col ? expJanggiFailTarget.set(row, col) : null;
      } else {
        expJanggiFailTarget.set(row, col);
      }
    });

    const newEquipmentInfos: EquipmentInfo[] = [];
    selectedCells.forEach((cell) => {
      const [row, col] = cell.split('-').map(Number);
      if (expJanggiFailTarget.get(row) !== col) {
        newEquipmentInfos.push({
          equipment: row < 5 ? '방어구' : '무기',
          step: col + 1,
          experience: 0,
          janggi: 0,
          increasedProbability: 0,
        });
      } else {
        newEquipmentInfos.push({
          equipment: row < 5 ? '방어구' : '무기',
          step: col + 1,
          experience: Number(experience[row]),
          janggi: Number(janggi[row]),
          increasedProbability: Number(failChance[row]),
        });
      }
    });

    setEquipmentInfos(newEquipmentInfos);
  }, [selectedCells, experience, janggi, failChance]);

  const debouncedOnChangeSelectedCells = useCallback(debounce(onChangeSelectedCells, 1000), [
    onChangeSelectedCells,
  ]);

  useEffect(() => {
    debouncedOnChangeSelectedCells();
    return debouncedOnChangeSelectedCells.cancel;
  }, [debouncedOnChangeSelectedCells]);

  useEffect(() => {
    calculateTotalReforgeMaterials();
  }, [calculateTotalReforgeMaterials, equipmentInfos]);

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
          <select
            className="rounded border p-2"
            value={reforgeCase}
            onChange={handleReforgeCaseChange}
          >
            <option value="best">원트</option>
            <option value="average">평균</option>
            <option value="worst">장기백</option>
          </select>
          <select
            className="rounded border p-2"
            value={additionalCase}
            onChange={handleAdditionalCaseChange}
          >
            <option value="none">노숨</option>
            <option value="optional">최적 숨결</option>
            <option value="full">풀숨</option>
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
            setSelectedCells={setSelectedCells}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold">재련 총 비용</p>
        <div className="flex items-center justify-center gap-1">
          {Object.entries(totalReforgeMaterials).map(([material, amount], index) => (
            <div key={index} className="flex items-center gap-1">
              <img src={converItemNameToSrc(material)} alt={material} className="h-8 w-8" />
              <p className="font-semibold">{amount}개</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
