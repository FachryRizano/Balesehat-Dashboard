import PieChart from "components/charts/PieChart";
import { AdLocationpieChartOptions } from "variables/charts";
import Card from "components/card";

const AdLocationePieChartCard = (props: { roas: object, avg_effectiveness: object}) => {
  const { roas, avg_effectiveness } = props;
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            ROAS
          </h4>
        </div>

        {/* <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Daily</option>
            <option value="weekly">ByDate</option>
          </select>
        </div> */}
      </div>

      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart chartOptions={AdLocationpieChartOptions} chartData={roas} />
      </div>
      <div className="px-6 py-3">
        <p className="text-lg font-semibold text-navy-700 dark:text-white">Average Effectiveness</p>
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-brand-500" />
            <p className="ml-1 text-sm font-normal text-gray-600">Recommendation</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700  dark:text-white">
            {Array.isArray(avg_effectiveness) && avg_effectiveness.length > 0
              ? `${avg_effectiveness[0] * 100} %`
              : 'Loading...'}
          </p>
        </div>

        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Search</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {Array.isArray(avg_effectiveness) && avg_effectiveness.length > 0
              ? `${avg_effectiveness[1] * 100} %`
              : 'Loading...'}
          </p>
        </div>
        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#6AD2FF]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Shop</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {Array.isArray(avg_effectiveness) && avg_effectiveness.length > 0
              ? `${avg_effectiveness[2] * 100} %`
              : 'Loading...'}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AdLocationePieChartCard;
