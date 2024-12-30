'use client';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

type SliderProps = {
  children: ReactNode;
  className?: string;
  autoSlide?: boolean; // 자동 슬라이드 켜기/끄기
  interval?: number; // 자동 슬라이드 간격 (ms)
  showIndicators?: boolean; // 페이지 인디케이터 표시 여부
  showControls?: boolean; // 이전/다음 버튼 표시 여부
  infinite?: boolean; // 무한 루프 여부
};

export const Slider = ({
  children,
  autoSlide = true,
  className,
  interval = 3000,
  showIndicators = true,
  infinite = true,
  showControls = true,
}: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(autoSlide);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const slides = React.Children.toArray(children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      infinite ? (prevIndex + 1) % slides.length : Math.min(prevIndex + 1, slides.length - 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      infinite ? (prevIndex - 1 + slides.length) % slides.length : Math.max(prevIndex - 1, 0)
    );
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoSliding) {
      slideIntervalRef.current = setInterval(nextSlide, interval);
    } else {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    }
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [isAutoSliding, interval]);

  return (
    <div className={['relative', className].join(' ')}>
      {/* 슬라이드 내용 */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* 페이지 인디케이터 */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`h-2.5 w-2.5 rounded-full ${
                currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* 이전/다음 버튼 */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow"
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};
