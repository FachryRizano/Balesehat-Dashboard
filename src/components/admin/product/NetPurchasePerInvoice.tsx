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

const NetPurchasePerInvoice = (props: { title: string, fetchData: object ,productArray:any}) => {
    const { title, fetchData,productArray } = props;
    const [selectedProduct, setSelectedProduct] = useState(productArray[0]);
    const years: string[] = [];
    for (let year = 2016; year <= 2023; year++) {
        years.push(year.toString());
    }
    const [selectedYear,setSelectedYear] = useState("2016")
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [chartOptions, setChartOptions] = useState<ChartOptions>(defaultChartOptions);


    function lineChartBasic(selectedYear:string, selectedProduct: string, fetchData:object): [ChartData[], ChartOptions] {
        const productData = fetchData[selectedYear][selectedProduct].data;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const lineChartData = [
            {
                name: 'Value',
                data:productData,
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
                categories:monthNames,
            },
            yaxis: {
                show: false,
            },
        };

        return [lineChartData, lineChartOptions];
    }

    // Update the chart when selectedProduct changes
    useEffect(() => {
        let data, options, avgVal;
        [data, options] = lineChartBasic(selectedYear,selectedProduct, fetchData);
        setChartData(data);
        setChartOptions(options);
    }, [selectedYear,selectedProduct]);
    
    return (
        <Card extra="!p-[20px] text-center">
            <div className="flex justify-between items-center p-4 bg-white dark:bg-navy-800 shadow rounded-lg">
                <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                    {title}
                </h4>

                <div className="flex items-center">
                    <div className="flex items-center">
                        <label htmlFor="" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Year:&nbsp;&nbsp;&nbsp;
                        </label>
                    </div>
                    <select
                        className="mr-3 p-2 border rounded-md text-sm font-medium text-gray-600 hover:cursor-pointer dark:border-navy-700 dark:bg-navy-800 dark:text-white"
                        onChange={(e)=>setSelectedYear(e.target.value)}>
                        {years.map((product) => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                    </select>
                    <select
                        className="mr-3 p-2 border rounded-md text-sm font-medium text-gray-600 hover:cursor-pointer dark:border-navy-700 dark:bg-navy-800 dark:text-white"
                        onChange={(e) => setSelectedProduct(e.target.value)}>
                        {(productArray).map((product) => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                    </select>

                    <div className="flex items-center">
                    </div>
                </div>
            </div>


            <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
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

export default NetPurchasePerInvoice;
