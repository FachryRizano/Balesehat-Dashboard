import {
    MdArrowDropUp,
    MdArrowDropDown,
    MdOutlineCalendarToday,
    MdBarChart,
} from "react-icons/md";
import Card from "components/card";
import {
    lineChartDataCashflowTrends,
    lineChartOrderTrends,
    lineChartOptionsTrends,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from 'react';

const TimeGrowth = (props:{title:string,fetchData : object}) => {
    
    const [selectedPeriod, setSelectedPeriod] = useState('Daily');
    const [chartData, setChartData] = useState([]);
    const [chartOptions, setChartOptions] = useState({});
    const [top,setTop] = useState('');
    const [bottom,setBottom] = useState('');
    const [avg,setAvg] = useState(0);
    const {title, fetchData} = props;

    // Update the chart when selectedPeriod changes
    useEffect(() => {
        const [data, options,maxLabel,minLabel,avg] = lineChartOrderTrends(selectedPeriod,fetchData);
        setChartData(data);
        setChartOptions(options);
        setTop(maxLabel)
        setBottom(minLabel)
        setAvg(avg)
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
                        <option value="Daily">Daily</option>
                        <option value="ByDate">By Date</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </div>

            </div>

            <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                <div className="flex flex-col">
                    <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
                        {avg}
                    </p>
                    <div className="flex flex-col items-start">
                        <p className="mt-2 text-sm text-gray-600">Top</p>
                        <div className="flex flex-row items-center justify-center">
                            <MdArrowDropUp className="font-medium text-green-500" />
                            <p className="text-sm font-bold text-green-500">{top}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="mt-2 text-sm text-gray-600">Bottom</p>
                        <div className="flex flex-row items-center justify-center">
                            <MdArrowDropDown className="font-medium text-red-500" />
                            <p className="text-sm font-bold text-red-500">{bottom}</p>
                        </div>
                    </div>
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

export default TimeGrowth;
