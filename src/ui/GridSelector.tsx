import { useCallback, useEffect, useState } from 'react';

interface GridSelectorProps {
  rowCount: number;
  columnCount: number;
  setSelectedCells: React.Dispatch<React.SetStateAction<Set<string>>>;
}

interface Position {
  row: number;
  col: number;
}

export const GridSelector: React.FC<GridSelectorProps> = ({
  rowCount,
  columnCount,
  setSelectedCells: _setSelectedCells,
}) => {
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [dragMode, setDragMode] = useState<'SELECT' | 'DESELECT' | 'DEFAULT'>('DEFAULT');
  const [dragRect, setDragRect] = useState<{ start: Position; end: Position } | null>(null);

  const positionToKey = useCallback((row: number, col: number): string => `${row}-${col}`, []);

  const handleDragStart = useCallback(
    (row: number, col: number) => {
      const cellKey = positionToKey(row, col);
      if (selectedCells.has(cellKey)) {
        setDragMode('DESELECT');
      } else {
        setDragMode('SELECT');
      }
      setDragRect({ start: { row, col }, end: { row, col } });
    },
    [selectedCells, positionToKey]
  );

  const handleDragOver = useCallback(
    (row: number, col: number) => {
      if (dragMode !== 'DEFAULT' && dragRect) {
        const newDragRect = {
          start: dragRect.start,
          end: { row, col },
        };
        setDragRect(newDragRect);
      }
    },
    [dragMode, dragRect]
  );

  const handleDragEnd = useCallback(() => {
    if (dragRect) {
      const newSelectedCells = new Set(selectedCells);
      const { start, end } = dragRect;
      const [startRow, startCol] = [start.row, start.col];
      const [endRow, endCol] = [end.row, end.col];

      for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
        for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
          const cellKey = positionToKey(r, c);
          if (dragMode === 'DESELECT') {
            newSelectedCells.delete(cellKey);
          } else {
            newSelectedCells.add(cellKey);
          }
        }
      }
      setSelectedCells(newSelectedCells);
      _setSelectedCells(newSelectedCells);
    }
    setDragMode('DEFAULT');
    setDragRect(null);
  }, [dragMode, dragRect, selectedCells, positionToKey]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const cellKey = positionToKey(row, col);
      const newSelectedCells = new Set(selectedCells);
      if (newSelectedCells.has(cellKey)) {
        newSelectedCells.delete(cellKey);
        setDragMode('DESELECT');
      } else {
        newSelectedCells.add(cellKey);
        setDragMode('SELECT');
      }
      setSelectedCells(newSelectedCells);
      _setSelectedCells(newSelectedCells);
    },
    [selectedCells, positionToKey]
  );

  const renderCell = useCallback(
    (row: number, col: number) => {
      const cellKey = positionToKey(row, col);
      const isSelected = selectedCells.has(cellKey);
      const isHovered =
        dragRect &&
        row >= Math.min(dragRect.start.row, dragRect.end.row) &&
        row <= Math.max(dragRect.start.row, dragRect.end.row) &&
        col >= Math.min(dragRect.start.col, dragRect.end.col) &&
        col <= Math.max(dragRect.start.col, dragRect.end.col);

      let cellColor = 'bg-white';
      if (isSelected) {
        cellColor = 'bg-blue-500';
      }

      let dragColor = '';
      if (isHovered) {
        if (dragMode === 'SELECT') {
          dragColor = 'bg-blue-500';
        } else if (dragMode === 'DESELECT') {
          dragColor = 'bg-rose-500';
        }
      }

      return (
        <div
          key={`${row}-${col}`}
          className={`${cellColor} h-10 w-10 cursor-pointer border border-gray-300`}
          onClick={() => handleCellClick(row, col)}
          onMouseDown={(e) => {
            e.preventDefault();
            if (e.button === 2) return;
            handleDragStart(row, col);
          }}
          onMouseOver={(e) => {
            e.preventDefault();
            if (e.button === 2) return;
            handleDragOver(row, col);
          }}
          onMouseUp={handleDragEnd}
        >
          {dragMode !== 'DEFAULT' && dragColor && (
            <div className={`relative h-full w-full ${dragColor} z-10 opacity-70`} />
          )}
        </div>
      );
    },
    [selectedCells, dragMode, dragRect]
  );

  const renderGrid = useCallback(() => {
    const cells = [];
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < columnCount; col++) {
        cells.push(renderCell(row, col));
      }
    }
    return cells;
  }, [columnCount, rowCount, renderCell]);

  // 윈도우에서 마우스 업 이벤트 리스닝
  useEffect(() => {
    const handleMouseUp = () => {
      if (dragMode !== 'DEFAULT') {
        handleDragEnd();
      }
    };
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragMode, handleDragEnd]);

  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      }}
    >
      {renderGrid()}
    </div>
  );
};
