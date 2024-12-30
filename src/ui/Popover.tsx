'use client';
import React, {
  useState,
  ReactNode,
  useRef,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
  isValidElement,
  ReactElement,
} from 'react';

type Position = {
  x: number;
  y: number;
};

type PopoverContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  position: Position;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
};

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const PopoverProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const calculatePosition = () => {
    if (triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = triggerRect.left;
      let y = triggerRect.bottom;

      if (triggerRect.right + contentRect.width > viewportWidth) {
        x = triggerRect.right - contentRect.width;
      }

      if (triggerRect.bottom + contentRect.height > viewportHeight) {
        y = -contentRect.height;
      }

      setPosition({ x, y });
    }
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition(); // 초기 위치 계산
      window.addEventListener('resize', calculatePosition); // resize 이벤트 감지
    }

    return () => {
      window.removeEventListener('resize', calculatePosition); // cleanup
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close, contentRef]);

  return (
    <PopoverContext.Provider value={{ isOpen, open, close, position, triggerRef, contentRef }}>
      {children}
    </PopoverContext.Provider>
  );
};

export const Popover = ({ children }: { children: ReactNode }) => {
  return <PopoverProvider>{children}</PopoverProvider>;
};

export const PopoverTrigger = ({
  asChild = false,
  children,
}: PropsWithChildren<{ asChild: boolean }>) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('PopoverTrigger는 Popover내부에서 호출해야 합니다.');
  }

  const { open, triggerRef } = context;

  if (asChild && isValidElement(children)) {
    return React.cloneElement(children as ReactElement, { ref: triggerRef, onClick: open });
  }

  return (
    <button ref={triggerRef} onClick={open}>
      {children}
    </button>
  );
};

export const PopoverContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('PopoverContent는 Popover내부에서 호출해야 합니다.');
  }

  const { isOpen, close, position, contentRef } = context;

  if (!isOpen) return null;

  return (
    <div
      className="absolute border border-gray-300 bg-white p-4"
      style={{
        top: 0,
        left: 0,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      ref={contentRef}
    >
      {children}
      <button onClick={close} style={{ marginTop: '10px' }}>
        Close
      </button>
    </div>
  );
};
