import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#A28CF0', '#34D399', '#EF4444', '#8B5CF6'
];

function CategoryPieCharts ({ data }) {
  // 数据格式转换（支出取绝对值）
  const processData = (rawData) => {
    return rawData.map(item => ({
      name: item.type,
      value: Math.abs(item.money)
    }));
  };

  return (
    <>
        <ResponsiveContainer width="50%" height="100%">
          <PieChart >
            <Pie
              data={processData(data.pay)}
              cx="50%"
              cy="50%"
              innerRadius={10}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.pay.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `¥${value.toLocaleString()}`}
              contentStyle={{ borderRadius: 8 }}
            />
            <Legend 
              layout="horizontal" 
              align="center" 
              verticalAlign="bottom"
              wrapperStyle={{ 
                height: 45,
                paddingTop: 0, 
                fontSize: 12
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="50%" height="100%">
          <PieChart >
            <Pie
              data={processData(data.income)}
              cx="50%"
              cy="50%"
              innerRadius={10}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.income.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `¥${value.toLocaleString()}`} 
              contentStyle={{ borderRadius: 8 }}
            />
            <Legend 
              layout="horizontal" 
              align="center" 
              verticalAlign="bottom"
              wrapperStyle={{
                height: 45,
                paddingTop: 0, 
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
    </>
  );
};

export default CategoryPieCharts;