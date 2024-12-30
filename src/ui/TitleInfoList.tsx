type TitleInfoListProps = {
  title: string;
  renderInfoList: () => JSX.Element;
};

export const TitleInfoList = ({ title, renderInfoList }: TitleInfoListProps) => (
  <div className="border-w box-border w-96 rounded-lg border-2 border-solid border-gray-300 bg-white px-6 py-3">
    <div className="mb-4 text-2xl font-bold">{title}</div>
    {renderInfoList()}
  </div>
);
