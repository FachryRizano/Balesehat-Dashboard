import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataCashflowTrends,
  lineChartOptionsTrends,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import React, { useEffect, useState } from 'react'
const CashflowTrends = (props: { data: any }) => {
  const { data } = props;
  const [lastSpendRate, setLastSpendRate] = useState(0)
  const [lastEarnRate, setLastEarnRate] = useState(0)
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [avgRoas, setAvgRoas] = useState(0);
  useEffect(() => {
    const earnData = data.earn;
    const categories = data.month_year;
    const spendData = data.spend;
    let totalEarn = earnData.reduce((sum, current) => sum + current, 0)
    let totalSpend = spendData.reduce((sum, current) => sum + current, 0)
    let totalROAS = totalEarn / totalSpend;

    // Calculate average ROAS
    setAvgRoas(parseFloat(totalROAS.toFixed(2)));
    // Calculate the last rate of change for spend and earn
    if (spendData.length >= 2) {
      const lastSpend = spendData[spendData.length - 1];
      const secondLastSpend = spendData[spendData.length - 2];
      setLastSpendRate(Number(((lastSpend - secondLastSpend) / secondLastSpend * 100).toFixed(2)));
    }

    if (earnData.length >= 2) {
      const lastEarn = earnData[earnData.length - 1];
      const secondLastEarn = earnData[earnData.length - 2];
      setLastEarnRate(Number(((lastEarn - secondLastEarn) / secondLastEarn * 100).toFixed(2)));
    }

    const updatedChartData = [
      {
        name: 'Total Spend',
        data: spendData,
        color: '#708090',
      },
      {
        name: 'Total Earn',
        data: earnData,
        color: '#32CD32',
      }
    ];

    setChartData(updatedChartData);

    // Update chart options, especially the x-axis categories
    const updatedChartOptions = {
      ...lineChartOptionsTrends,
      xaxis: {
        ...lineChartOptionsTrends.xaxis,
        categories: categories,
      }
    };

    setChartOptions(updatedChartOptions);
  }, []);
  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">Expense Ratio</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-2 text-sm text-gray-600">Avg ROAS</p>
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {avgRoas}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Earn</p>
            <div className="flex flex-row items-center justify-center">
              {lastEarnRate > 0 ? (<>
                <MdArrowDropUp className="font-medium text-green-500" />
                <p className="text-sm font-bold text-green-500"> {lastEarnRate}%</p>
              </>) : (<>
                <MdArrowDropDown className="font-medium text-red-500" />
                <p className="text-sm font-bold text-red-500"> {lastEarnRate}%</p>
              </>)}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spend</p>
            <div className="flex flex-row items-center justify-center">
              {lastSpendRate > 0 ? (<>
                <MdArrowDropUp className="font-medium text-red-500" />
                <p className="text-sm font-bold text-red-500"> {lastSpendRate}%</p>
              </>) : (<>
                <MdArrowDropDown className="font-medium text-green-500" />
                <p className="text-sm font-bold text-green-500"> {lastSpendRate}%</p>
              </>)}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <LineChart
            chartOptions={chartOptions}
            chartData={chartData}
          //   chartData={lineChartDataTotalSpent}
          />
        </div>
      </div>
    </Card>
  );
};

export default CashflowTrends;
