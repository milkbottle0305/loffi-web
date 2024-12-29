import { TitleInfoList } from '../ui/TitleInfoList';
import { LostarkNoticeRows } from './LostarkNoticeRows';

export const LostarkNotice = () => {
  return (
    <TitleInfoList
      title={'로스트아크 공지사항'}
      renderInfoList={() => {
        return (
          <ul className="flex w-full flex-col items-start gap-1">
            {/* @ts-expect-error Async Server Component */}
            <LostarkNoticeRows />
          </ul>
        );
      }}
    ></TitleInfoList>
  );
};
