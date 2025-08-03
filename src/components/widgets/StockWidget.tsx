import React from 'react';

const StockWidget: React.FC = () => {
  const stockData = [
    { name: "코스피", value: "2,485.67" },
    { name: "코스닥", value: "742.33" },
    { name: "환율(USD)", value: "1,325.50" }
  ];

  return (
    <section id="stock-widget" className="bg-white border border-neutral-200 rounded-xl p-8 shadow-lg">
      <h3 className="text-black mb-6 text-xl font-bold">증시</h3>
      <div className="space-y-4">
        {stockData.map((stock, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-base font-semibold">{stock.name}</span>
            <span className="text-base font-bold">{stock.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StockWidget; 