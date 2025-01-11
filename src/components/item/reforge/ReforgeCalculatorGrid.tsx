import { GridSelector } from '@/ui/GridSelector';
import { ChangeEvent } from 'react';

const getColumnCount = (tier: string): number => {
  switch (tier) {
    case '2-1티어':
      return 15;
    case '3-1티어':
      return 20;
    case '3-2티어':
    case '3-3티어':
    case '4-1티어':
      return 25;
    default:
      return 15;
  }
};

interface ReforgeCalculatorGridProps {
  tier: string;
  rowCount: number;
  experience: string[];
  setExperience: React.Dispatch<React.SetStateAction<string[]>>;
  janggi: string[];
  setJanggi: React.Dispatch<React.SetStateAction<string[]>>;
  failChance: string[];
  setFailChance: React.Dispatch<React.SetStateAction<string[]>>;
  onChangeSelectedCells: (selectedCells: Set<string>) => void;
}

export const ReforgeCalculatorGrid: React.FC<ReforgeCalculatorGridProps> = ({
  tier,
  rowCount,
  experience,
  setExperience,
  janggi,
  setJanggi,
  failChance,
  setFailChance,
  onChangeSelectedCells,
}) => {
  const columnCount = getColumnCount(tier);

  // 경험치 입력 변경 핸들러
  const onExperienceChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setExperience((prev) => {
      const next = [...prev];
      next[index] = e.target.value;
      return next;
    });
  };

  // 경험치 포커스 아웃 핸들러
  const onExperienceBlur = (index: number) => {
    setExperience((prev) => {
      const next = [...prev];
      if (next[index] === '' || isNaN(Number(next[index]))) {
        next[index] = '0';
      } else {
        const value = parseFloat(next[index]);
        next[index] =
          value > 100 ? '100' : value < 0 ? '0' : (Math.floor(value * 100) / 100).toString();
      }
      return next;
    });
  };

  // 장기 입력 변경 핸들러
  const onJangiChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setJanggi((prev) => {
      const next = [...prev];
      next[index] = e.target.value;
      return next;
    });
  };

  // 장기 포커스 아웃 핸들러
  const onJangiBlur = (index: number) => {
    setJanggi((prev) => {
      const next = [...prev];
      if (next[index] === '' || isNaN(Number(next[index]))) {
        next[index] = '0';
      } else {
        const value = parseFloat(next[index]);
        next[index] =
          value > 100 ? '100' : value < 0 ? '0' : (Math.floor(value * 100) / 100).toString();
      }
      return next;
    });
  };

  // 실패 확률 입력 변경 핸들러
  const onFailChanceChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setFailChance((prev) => {
      const next = [...prev];
      next[index] = e.target.value;
      return next;
    });
  };

  // 실패 확률 포커스 아웃 핸들러
  const onFailChanceBlur = (index: number) => {
    setFailChance((prev) => {
      const next = [...prev];
      if (next[index] === '' || isNaN(Number(next[index]))) {
        next[index] = '0';
      } else {
        const value = parseFloat(next[index]);
        next[index] =
          value > 100 ? '100' : value < 0 ? '0' : (Math.floor(value * 100) / 100).toString();
      }
      return next;
    });
  };

  return (
    <table className="table-fixed border-spacing-0 border-none p-0">
      <thead>
        <tr>
          <th className="border-spacing-0 border-none p-0">
            <table className="border-spacing-0 p-0">
              <thead>
                <tr>
                  <th className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-sm text-gray-500">
                    장비
                  </th>
                  <th className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-sm text-gray-500">
                    경험치
                  </th>
                  <th className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-sm text-gray-500">
                    장기
                  </th>
                  <th className="h-10 w-10 border-spacing-0 border-none p-0 text-center text-[8px] text-gray-500">
                    실패로 증가된 확률
                  </th>
                </tr>
              </thead>
            </table>
          </th>
          <th>
            <table className="table-fixed border-spacing-0 border-none p-0">
              <thead>
                <tr>
                  {Array.from({ length: columnCount }, (_, i) => (
                    <th
                      key={i}
                      className="h-10 w-10 border-spacing-0 border-none p-0 text-center text-sm text-gray-500"
                    >{`+${i + 1}`}</th>
                  ))}
                </tr>
              </thead>
            </table>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table className="table-fixed border-spacing-0 border-none p-0">
              <tbody>
                {Array.from({ length: rowCount }, (_, i) => (
                  <tr key={i}>
                    <td className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-xs text-gray-500">
                      {i === rowCount - 1 ? '무기' : '방어구'}
                    </td>
                    <td className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-xs">
                      <input
                        type="text"
                        placeholder="0.00%"
                        className="h-10 w-10"
                        value={experience[i]}
                        onChange={(e) => onExperienceChange(e, i)}
                        onBlur={() => onExperienceBlur(i)}
                      />
                    </td>
                    <td className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-xs">
                      <input
                        type="text"
                        placeholder="0.00%"
                        className="h-10 w-10"
                        value={janggi[i]}
                        onChange={(e) => onJangiChange(e, i)}
                        onBlur={() => onJangiBlur(i)}
                      />
                    </td>
                    <td className="h-10 w-10 border-spacing-0 whitespace-nowrap border-none p-0 text-center text-xs">
                      <input
                        type="text"
                        placeholder="0.00%"
                        className="h-10 w-10"
                        value={failChance[i]}
                        onChange={(e) => onFailChanceChange(e, i)}
                        onBlur={() => onFailChanceBlur(i)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td className="border-spacing-0 border-none p-0">
            <GridSelector
              columnCount={columnCount}
              rowCount={rowCount}
              onChangeSelectedCells={onChangeSelectedCells}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
