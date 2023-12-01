'use client';
import { MdBarChart, MdDashboard } from 'react-icons/md';
import axios from "axios";

import Widget from 'components/widget/Widget'
import TimeGrowth from 'components/admin/buyer/TimeGrowth';
import TreemapComponent from 'components/admin/order/TreemapComponent';
import OrderProcessTime from 'components/admin/order/OrderProcessTime';
import React, { useState, useEffect } from 'react';
import {
    treemapChartDataBuyerAge,
} from "variables/charts";
import BasicGrowth from 'components/admin/buyer/BasicGrowth';
const Order = () => {
    const salesGrowthData = {
        Daily: [5, 3, 10, 2, 1, 18, 16],
        Monthly: [101, 50.5, 200, 250, 500, 100, 120, 200, 1250, 3000, 5000, 700],
        ByDate: Array.from({ length: 31 }, (_, i) => i + 1),
    };
    const [loading, setLoading] = useState(true);
    const [cancellationOrderData, setCancellationOrderData] = useState();
    const [orderTrendData, setOrderTrendData] = useState({});
    const [orderProcessData, setOrderProcessData] = useState({});
    const [bestSellingProductsData, setbestSellingProductsData] = useState({});
    const [salesCampaignData, setSalesCampaignData] = useState({});
    const [salesDistributionData, setSalesDistributinData] = useState({})
    const [deliveryMethodData, setDeliveryMethodData] = useState({})
    const [orderValueCity, setOrderValueCity] = useState({})
    const [itemCountCity, setItemCountCity] = useState({})
    const [orderCount,setOrderCount] = useState({})
    const [sales,setSales] = useState({})
    const[salesValueMean,setSalesValueMean] = useState()
    const[orderCountCity,setOrderCountCity] = useState()
    // const [bestSellingProductsData, setBestSellingProductsData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${process.env.NEXT_PUBLIC_DEV_BACKEND_API}/api/order`);
                // Assuming the response structure matches your given JSON
                const data = response.data;
                setCancellationOrderData(data.cancellation_order);
                setOrderTrendData(data.order_trends);
                setOrderProcessData(data.order_process_time);
                setbestSellingProductsData(data.best_selling_product);
                setSalesCampaignData(data.sales_campaign_performance);
                setSalesDistributinData(data.sales_distribution_location);
                setDeliveryMethodData(data.delivery_method_preferences);
                setOrderValueCity(data.order_value_city)
                setItemCountCity(data.item_count_city)
                setOrderCount(data.order_count)
                setSales(data.sales)
                setSalesValueMean(data.sales_value_mean)
                setOrderCountCity(data.order_count_city)
                setLoading(false); // Set loading to false once the data is fetched
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false); // Also set loading to false in case of an error
            }
        };

        fetchData();
    }, []);
    if (!loading) {
        return (
            <div>
                <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                    
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={'Cancellation'}
                        subtitle={cancellationOrderData}
                    />
                </div>
                {/*Order Trends*/}
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <BasicGrowth title={`Order`} fetchData={orderCount}/>
                </div>
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-1">
                    <BasicGrowth title={`Sales Value`} fetchData={sales}/>
                </div>
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TimeGrowth title={'Order Trends'} fetchData={orderTrendData} />
                    <OrderProcessTime data={orderProcessData} />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TreemapComponent title={"Best Selling Products"} data={bestSellingProductsData} />
                    <TreemapComponent title={"Sales Campaign Performance"} data={salesCampaignData} />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TreemapComponent title={"Sales Distribution Location"} data={salesDistributionData} />
                    <TreemapComponent title={"Delivery Method Preferences"} data={deliveryMethodData} />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TreemapComponent title={"Order Value City Distribution"} data={orderValueCity} />
                    <TreemapComponent title={"Item Count City Distribution"} data={itemCountCity} />
                </div>
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TreemapComponent title={"Sales Values Mean"} data={salesValueMean} />
                    <TreemapComponent title={"Order Count City Distribution"} data={orderCountCity} />
                </div>

            </div>
        );
    } else {
        return <></>
    }
};

export default Order;
