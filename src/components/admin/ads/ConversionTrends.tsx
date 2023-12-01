import {
  MdArrowDropUp,
  MdArrowDropDown,
  MdOutlineCalendarToday,
  MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
  lineChartDataConversionTrends,
  lineChartOptionsTrends,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from 'react'
const ConversionTrends = (props: { data: any }) => {
  const { data } = props;
  const [lastClickGrowth, setLastClickGrowth] = useState(0)
  const [lastSoldGrowth, setLastSoldGrowth] = useState(0)
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [avgConversion, setAvgConversion] = useState(0);
  useEffect(() => {
    const clickData = data.click;
    const categories = data.month_year;
    const soldData = data.sold;
    let totalClick = clickData.reduce((sum, current) => sum + current, 0)
    let totalSold = soldData.reduce((sum, current) => sum + current, 0)
    let totalConversion = totalSold / totalClick;

    // Calculate average ROAS
    setAvgConversion(parseFloat(totalConversion.toFixed(2)));
    // Calculate the last rate of change for spend and earn
    if (clickData.length >= 2) {
      const lastClick = clickData[clickData.length - 1];
      const secondLastClick = clickData[clickData.length - 2];
      setLastClickGrowth(Number(((lastClick - secondLastClick) / secondLastClick * 100).toFixed(2)));
    }

    if (soldData.length >= 2) {
      const lastSold = soldData[soldData.length - 1];
      const secondLastSold = soldData[soldData.length - 2];
      setLastSoldGrowth(Number(((lastSold - secondLastSold) / secondLastSold * 100).toFixed(2)));
    }

    const updatedChartData = [
      {
        name: 'Clicks',
        data: clickData,
        color: '#708090',
      },
      {
        name: 'Sales',
        data: soldData,
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
          <span className="text-sm font-medium text-gray-600">Conversion</span>
        </button>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {avgConversion*100} %
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Click</p>
            <div className="flex flex-row items-center justify-center">
              {lastClickGrowth > 0 ? (<>
                <MdArrowDropUp className="font-medium text-green-500" />
                <p className="text-sm font-bold text-green-500"> {lastClickGrowth}%</p>
              </>) : (<>
                <MdArrowDropDown className="font-medium text-red-500" />
                <p className="text-sm font-bold text-red-500"> {lastClickGrowth}%</p>
              </>)}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Sales</p>
            <div className="flex flex-row items-center justify-center">
              {lastSoldGrowth > 0 ? (<>
                <MdArrowDropUp className="font-medium text-green-500" />
                <p className="text-sm font-bold text-green-500"> {lastSoldGrowth}%</p>
              </>) : (<>
                <MdArrowDropDown className="font-medium text-red-500" />
                <p className="text-sm font-bold text-red-500"> {lastSoldGrowth}%</p>
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

export default ConversionTrends;
