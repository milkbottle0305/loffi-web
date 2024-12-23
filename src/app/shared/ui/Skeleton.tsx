interface SkeletonViewProps {
  width?: string;
  height?: string;
  gap?: string;
  length?: number;
}

export const SkeletonView: React.FC<SkeletonViewProps> = ({
  width = '100%',
  height = '100%',
  gap = '0',
  length = 1,
}) => {
  const skeletons = Array.from({ length });

  return (
    <div className="flex flex-col" style={{ gap: gap }}>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-md bg-gray-300"
          style={{ width, height }}
        ></div>
      ))}
    </div>
  );
};
