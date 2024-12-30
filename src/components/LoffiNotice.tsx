'use client';
import { useGetNoticesQuery } from '@/queries/useGetNoticesQuery';
import { SkeletonView } from '@/ui/Skeleton';
import { TitleInfoList } from '@/ui/TitleInfoList';

const NOTICES_COUNT = 5;

export const LoffiNotice = () => {
  const { data: _notices, isLoading } = useGetNoticesQuery({
    searchText: '업데이트',
    type: '공지',
  });

  const notices = _notices?.slice(0, NOTICES_COUNT);

  return (
    <TitleInfoList
      title={'로피 공지사항'}
      renderInfoList={() => {
        if (isLoading) {
          return <SkeletonView width="100%" height="20px" gap="4px" length={NOTICES_COUNT} />;
        }
        return (
          <ul className="flex w-full flex-col items-start gap-1">
            {notices?.map((notice) => (
              <li key={notice.Title} className="w-full">
                <p className="w-full truncate text-sm">{notice.Title}</p>
              </li>
            ))}
          </ul>
        );
      }}
    ></TitleInfoList>
  );
};
