import { Area } from '@ant-design/charts';

export default function Graph({ graphData }) {

  const config = {
    data: graphData,
    xField: 'month',
    yField: 'revenue',
    style: {
      fill: 'linear-gradient(-90deg, white 0%, #60A5FA 100%)',
    },
    axis: {
      x: {
        label: {
          style: {
            fill: '#000', // Darken the x-axis label
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
      },
      y: {
        label: {
          style: {
            fill: '#000', // Darken the y-axis label
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
        labelFormatter: '~s',
      },
    },
    line: {
      style: {
        stroke: '#60A5FA',
        strokeWidth: 1,
      },
    },
  };

  return (
    <main className="mt-3 bg-white p-5 md:w-1/2 rounded-xl border-2">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Track your progress</h2>
        <h2 className="text-sm border px-2 py-1 rounded-md opacity-50 border-gray-400">For year 2024</h2>
      </header>

      <Area {...config} height={250} />
    </main>
  );
}
