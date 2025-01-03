import { GridSelector } from '@/ui/GridSelector';

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
}

export const ReforgeCalculatorGrid: React.FC<ReforgeCalculatorGridProps> = ({ tier }) => {
  const columnCount = getColumnCount(tier);
  const rowCount = 6;

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>
            <table>
              <tbody>
                <tr>
                  {Array.from({ length: columnCount }, (_, i) => (
                    <td key={i} className="text-sm text-gray-500" width="40">{`+${i + 1}`}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              <tbody>
                {Array.from({ length: rowCount }, (_, i) => (
                  <tr>
                    <td height="40">방어구</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td>
            <GridSelector columnCount={columnCount} rowCount={rowCount} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
