export const barChartDataDailyTraffic = [
  {
    name: 'Daily Traffic',
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['00', '04', '08', '12', '14', '16', '18'],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: true,
      style: {
        colors: '#CBD5E0',
        fontSize: '14px',
      },
    },
  },
  grid: {
    show: false,
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        [
          {
            offset: 0,
            color: '#4318FF',
            opacity: 1,
          },
          {
            offset: 100,
            color: 'rgba(67, 24, 255, 1)',
            opacity: 0.28,
          },
        ],
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '40px',
    },
  },
};

export const pieChartOptions = {
  labels: ['Your files', 'System', 'Empty'],
  colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  chart: {
    width: '50px',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
  },
};

export const pieChartData = [63, 25, 12];

export const barChartDataWeeklyRevenue = [
  {
    name: 'PRODUCT A',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    color: '#6AD2Fa',
  },
  {
    name: 'PRODUCT B',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    color: '#4318FF',
  },
  {
    name: 'PRODUCT C',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
    color: '#EFF4FB',
  },
];

export const barChartOptionsWeeklyRevenue = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  // colors:['#ff3322','#faf']
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
    theme: 'dark',
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
  },
  xaxis: {
    categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
    show: false,
    labels: {
      show: true,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: 'black',
    labels: {
      show: false,
      style: {
        colors: '#A3AED0',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
  },

  grid: {
    borderColor: 'rgba(163, 174, 208, 0.3)',
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'solid',
    colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
  },
  legend: {
    show: false,
  },
  colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '20px',
    },
  },
};

export const lineChartDataTotalSpent = [
  {
    name: 'Revenue',
    data: [50, 64, 48, 66, 49, 68],
    color: '#4318FF',
  },
  {
    name: 'Profit',
    data: [30, 40, 24, 46, 20, 46],
    color: '#6AD2FF',
  },
];

export const lineChartOptionsTotalSpent = {
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
    categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
  },

  yaxis: {
    show: false,
  },
};

export const lineChartDataCashflowTrends = [
  {
    name: 'Total Spend',
    data: [362098, 192940, 418620, 916656, 791406, 516366],
    color: '#708090',
  },
  {
    name: 'Total Earn',
    data: [0, 40000, 211000, 285000, 1171000, 727750],
    color: '#32CD32',
  },
];


export const lineChartOptionsTrends = {

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
    categories: ['May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023'],
  },

  yaxis: {
    show: false,
  },
};

export const lineChartDataConversionTrends = [
  {
    name: 'Clicks',
    data: [140, 72, 157, 367, 336, 230],
    color: '#0099FF',
  },
  {
    name: 'Sales',
    data: [0, 1, 1, 7, 22, 11],
    color: '#32CD32',
  },
];

export const AdLocationpieChartOptions = {
  // title: {
  //   text: 'Total Earning (IDR)', // Your chart title
  //   align: 'center', // Alignment of the title
  //   style: {
  //     fontSize: '20px', // Optional: Style your title
  //     fontWeight: 'bold',
  //     // other styling options
  //   }
  // },
  labels: ['Recommendation', 'Search','Shop'],
  colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  chart: {
    width: '50px',
  },
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: undefined,
      backgroundColor: '#000000',
    },
  },
};

export const AdLocationpieChartData = [525, 100, 0];

export type ChartData = {
  name?: string;
  data: number[];
  color?: string;
};

export type ChartOptions = {
  legend: { show: boolean };
  theme: { mode: string };
  chart: { type: string; toolbar: { show: boolean } };
  dataLabels: { enabled: boolean };
  stroke: { curve: string };
  tooltip: any;
  grid: { show: boolean };
  xaxis: any;
  yaxis: { show: boolean };
};

export function lineChartOrderTrends(input: string, fetchData: object): [ChartData[], ChartOptions, string, string, number] {
  const data = fetchData;
  // const data = {
  //   Daily: [1.42, 1.19, 2, 1.36, 1.7, 1.8, 1.6],
  //   Monthly: [21, 20.5, 16, 33.5, 11.5, 12.5, 13, 12, 19, 19.5, 28.5, 26],
  //   ByDate: Array.from({ length: 31 }, (_, i) => i + 1),
  // };
  // console.log(data)

  const columns = {
    Daily: ['MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'],
    Monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ByDate: Array.from({ length: 31 }, (_, i) => i + 1),
  };


  const color = {
    Daily: '#007bff',
    Monthly: '#28a745',
    ByDate: '#ffc107'
  }

  const lineChartData: ChartData[] = [
    {
      name: 'Sales',
      data: data[input] || [],
      color: color[input] || [],
    },
  ];
  const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
  const avgVal = Math.round((average(data[input]) + Number.EPSILON) * 100) / 100;

  // Menemukan indeks dari nilai terbesar
  const maxIndex = data[input].indexOf(Math.max(...data[input]));
  // Mendapatkan label kolom untuk nilai terbesar
  const maxLabel = columns[input][maxIndex];

  // Menemukan indeks dari nilai terkecil
  const minIndex = data[input].indexOf(Math.min(...data[input]));
  // Mendapatkan label kolom untuk nilai terkecil
  const minLabel = columns[input][minIndex];

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
      categories: columns[input] || [],
    },
    yaxis: {
      show: false,
    },
  };

  return [lineChartData, lineChartOptions, maxLabel, minLabel, avgVal];
}

// export const [lineChartDataOrderTrendsDaily, lineChartOptionsOrderTrendsDaily] = lineChartOrderTrends('Daily');

export const treemapChartDataBestSellingProducts = [
  {
    data: [
      {
        x: 'Dark Chocolate 100%',
        y: 262
      },
      {
        x: 'Dark Chocolate 80%',
        y: 103
      },
      {
        x: 'Bale Sehat 50% Dark Milk Chocolate Bar 75g',
        y: 38
      },
      {
        x: 'Cocoa Nibs',
        y: 16
      },

    ]
  }
];

export const treemapChartOptions = {
  legend: {
    show: false
  },
  chart: {
    type: 'treemap',
    toolbar: {
      show: false,
    },
  },
  colors: [
    '#3B93A5',
    '#F7B844',
    '#ADD8C7',
    '#EC3C65',
    '#CDD7B6',
    '#C1F666',
    '#D43F97',
    '#1E5D8C',
    '#421243',
    '#7F94B0',
    '#EF6537',
    '#C0ADDB'
  ],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false
    }
  }
};

export const treemapChartDataSalesCampaignPerformance = [
  {
    data: [
      {
        x: 'NULL',
        y: 405
      },
      {
        x: 'PROMO COKLAT',
        y: 59
      },
      {
        x: 'Harga Spesial',
        y: 44
      },
      {
        x: 'Kejar Diskon Spesial',
        y: 32
      },

    ]
  }
];

export const treemapChartDataSalesLocationDistribution = [
  {
    data: [
      {
        x: 'DKI Jakarta',
        y: 194
      },
      {
        x: 'Jawa Barat',
        y: 137
      },
      {
        x: 'Banten',
        y: 135
      },
      {
        x: 'Jawa Timur',
        y: 42
      },

    ]
  }
];

export const treemapChartDataDeliveryMethod = [
  {
    data: [
      {
        x: 'Kurir Rekomendasi(Reguler)',
        y: 181
      },
      {
        x: 'AnterAja(Reguler)',
        y: 120
      },
      {
        x: 'SiCepat(Regular Package)',
        y: 66
      },
      {
        x: 'GoSend(Same Day 8 Jam)',
        y: 41
      },

    ]
  }
];


export const temp = [0.05, 0.21, 0.25, 0.28, 0.29, 0.31, 23, 43, 60, 100];

export const calculateFrequency = (data: number[], numBins: number = 10) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const binSize = range / numBins;

  const frequency: { [key: string]: number } = {};

  data.forEach(value => {
    const binIndex = Math.floor((value - min) / binSize);
    const binMin = min + (binIndex * binSize);
    const binMax = binMin + binSize;
    const binKey = `${binMin.toFixed(2)}-${binMax.toFixed(2)}`;
    frequency[binKey] = (frequency[binKey] || 0) + 1;
  });

  return Object.entries(frequency).map(([bin, count]) => ({
    x: bin,
    y: count,
  }));
};


const barChartDataOrderProcessTime = [{
  name: 'Frequency',
  data: calculateFrequency(temp),
}];

export const barChartOptionsOrderProcessTime = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '95%',  // Increase the column width

    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'category',
    title: {
      text: 'Process Time (Hours)',
    },
  },
  yaxis: {
    title: {
      text: 'Frequency',
    },
  },
};

export const treemapChartDataBuyerAge = [
  {
    data: [
      {
        x: 'Age 45 Plus',
        y: 38
      },
      {
        x: 'Age 35 - 44',
        y: 24
      },
      {
        x: 'Age 24-34',
        y: 10
      },
      {
        x: 'Age 18 - 23',
        y: 10
      },
      {
        x: "Under 17",
        y: 0
      }
    ]
  }
];
export function createBarChartOptions(categories: string[]): any {
  return {
    chart: {
      type: 'bar',
      height: 380,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      },
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
      '#f48024', '#69d2e7'
    ],
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return categories[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return '';
          }
        }
      }
    },
    grid: {
      show: false,
    },
    stroke: {
      show: false,
    },
  };
}