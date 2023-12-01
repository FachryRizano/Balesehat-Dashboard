import Card from "components/card";
import {
  ChartData,
  ChartOptions
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from 'react';

const BasicGrowth = (props: { title: string, fetchData: object }) => {

  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [avg, setAvg] = useState(0)
  const { title, fetchData } = props;


  function lineChartBasic(input: string, fetchData: object): [ChartData[], ChartOptions, number] {
    const data = fetchData;


    const color = {
      Daily: '#007bff',
      Monthly: '#28a745',
      Yearly:'#007bff'
    }

    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    const avgVal = Math.round((average(data[input].data) + Number.EPSILON) * 100) / 100;

    const lineChartData: ChartData[] = [
      {
        name: 'Growth',
        data: data[input].data || [],
        color: color[input] || [],
      },
    ];

    const lineChartOptions: ChartOptions = {
      legend: {
        show: false,
      },
      theme: {
        mode: 'light',
      },
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: undefined,
          backgroundColor: '#000000',
        },
        theme: 'dark',
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: '#A3AED0',
            fontSize: '12px',
            fontWeight: '500',
          },
        },
        type: 'text',
        range: undefined,
        categories: data[input].labels,
      },
      yaxis: {
        show: false,
      },
    };

    return [lineChartData, lineChartOptions, avgVal];
  }
  // Update the chart when selectedPeriod changes
  useEffect(() => {
    const [data, options, average] = lineChartBasic(selectedPeriod, fetchData);
    setAvg(average)
    setChartData(data);
    setChartOptions(options);
  }, [selectedPeriod]);

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            {title}
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <select
            className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white"
            onChange={(e) => setSelectedPeriod(e.target.value)}>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            {avg}
          </p>
        </div>
        <div className="h-full w-full">
          <LineChart
            chartOptions={chartOptions}
            chartData={chartData}
          />
        </div>
      </div>
    </Card>
  );
};

export default BasicGrowth;
