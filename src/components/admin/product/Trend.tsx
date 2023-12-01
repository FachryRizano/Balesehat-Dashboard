import {
    MdArrowDropUp,
    MdArrowDropDown,
} from "react-icons/md";
import Card from "components/card";
import {
    ChartData,
    ChartOptions
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import React, { useState, useEffect } from 'react';

const defaultChartOptions = {
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
        show: false,
    },
}

const Trend = (props: { title: string, fetchData: object }) => {
    const { title, fetchData } = props;
    const [selectedProduct, setSelectedPeriod] = useState<string>(Object.keys(fetchData)[0]);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [chartOptions, setChartOptions] = useState<ChartOptions>(defaultChartOptions);
    const [avg, setAvg] = useState(0);
    const [calculateAverage, setCalculateAverage] = useState<boolean>(false);

    const calculateMonthlyAverages = (productData: { data: number[], labels: string[] }) => {
        const monthlyTotals = new Array(12).fill(0);
        const monthlyCounts = new Array(12).fill(0);

        productData.labels.forEach((label, index) => {
            const month = new Date(label).getMonth(); // Get the month as a number (0-11)
            monthlyTotals[month] += productData.data[index];
            monthlyCounts[month]++;
        });

        return monthlyTotals.map((total, index) => {
            return monthlyCounts[index] > 0 ? parseFloat((total / monthlyCounts[index]).toFixed(2)) : 0;
        });
    };

    function lineChartBasic(product: string, fetchData, avg: boolean): [ChartData[], ChartOptions, number] {
        const productData = fetchData[product];

        const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length;
        // const median = (arr) => {
        //     const mid = Math.floor(arr.length / 2),
        //     nums = [...arr].sort((a, b) => a - b);
        //     return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
        // };
        
        // const avgVal = Math.round((median(productData.data) + Number.EPSILON) * 100) / 100;
        const avgVal = Math.round((average(productData.data) + Number.EPSILON) * 100) / 100;

        const monthlyAverages = calculateMonthlyAverages(productData);
        const lineChartData: ChartData[] = [
            {
                name: 'Value',
                data: avg ? monthlyAverages : productData.data,
                color: '#007bff', // Set your color logic here
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
                categories: avg ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : productData.labels,
            },
            yaxis: {
                show: false,
            },
        };

        return [lineChartData, lineChartOptions, avgVal];
    }

    // Update the chart when selectedProduct changes
    useEffect(() => {
        let data, options, avgVal;
        [data, options, avgVal] = lineChartBasic(selectedProduct, fetchData, calculateAverage);
        setChartData(data);
        setChartOptions(options);
        setAvg(avgVal)
    }, [selectedProduct, calculateAverage]);

    return (
        <Card extra="!p-[20px] text-center">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-navy-800 shadow rounded-lg">
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                    {title}
                </h4>

                <div className="flex items-center">
                    <select
                        className="mr-3 p-2 border rounded-md text-sm font-medium text-gray-600 hover:cursor-pointer dark:border-navy-700 dark:bg-navy-800 dark:text-white"
                        onChange={(e) => setSelectedPeriod(e.target.value)}>
                        {Object.keys(fetchData).map((product) => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                    </select>

                    <div className="flex items-center">
                        <input
                            id="calculateAverageCheckbox"
                            type="checkbox"
                            className="mr-2 h-4 w-4 border-gray-300 rounded text-navy-600 focus:ring-navy-500 dark:focus:ring-navy-500 dark:border-gray-600 dark:bg-navy-700 dark:checked:bg-navy-600"
                            checked={calculateAverage}
                            onChange={() => setCalculateAverage(!calculateAverage)}
                        />
                        <label htmlFor="calculateAverageCheckbox" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Calculate Monthly Average
                        </label>
                    </div>
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

export default Trend;
