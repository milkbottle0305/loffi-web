export const ItemList = () => {
  const items = Array.from({ length: 8 }, (_, i) => ({
    name: `아이템${i + 1}아이템${i + 1}아이템${i + 1}`,
    thumbnail: 'https://via.placeholder.com/150',
    price: (i + 1) * 1000,
  }));

  return (
    <div className="w-full rounded-lg border border-gray-300 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <p className="text-lg font-semibold">아이템 시세</p>
        <p className="text-xs text-gray-400">2024.12.23 06:12:35 갱신</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.name}
              className="h-12 w-12 rounded-md object-cover sm:h-16 sm:w-16"
            />
            <div>
              <h3 className="line-clamp-1 text-xs text-gray-600">{item.name}</h3>
              <p className="line-clamp-1 text-lg font-semibold">{item.price.toLocaleString()} G</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
