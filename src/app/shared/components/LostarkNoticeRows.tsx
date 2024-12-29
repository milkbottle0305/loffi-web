import { getNotices } from '../ssr/getNotices';

export const LostarkNoticeRows = async () => {
  const notices = await getNotices();

  return (
    <>
      {notices?.map((notice) => (
        <li key={notice.Title} className="flex w-full items-center truncate">
          <span className="mr-2 rounded-full bg-gray-100 px-1 text-xs text-gray-500">
            {notice.Type}
          </span>
          <p className="text-sm">
            <a href={notice.Link}>{notice.Title}</a>
          </p>
        </li>
      ))}
    </>
  );
};
