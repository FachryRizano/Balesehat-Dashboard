'use client';
import { MdBarChart } from 'react-icons/md';

import Widget from 'components/widget/Widget'
import TreemapComponent from 'components/admin/order/TreemapComponent';
import {
    treemapChartDataBuyerAge,
} from "variables/charts";
import TimeGrowth from 'components/admin/buyer/TimeGrowth';
import FrequencyBar from 'components/admin/buyer/FrequencyBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import BasicGrowth from 'components/admin/buyer/BasicGrowth';

type FreqData = {
    name: string[];

}
const Buyer = () => {
    const buyerGrowthData = {
        Daily: [1.42, 1.19, 2, 1.36, 1.7, 1.8, 1.6],
        Monthly: [21, 20.5, 16, 33.5, 11.5, 12.5, 13, 12, 19, 19.5, 28.5, 26],

    };

    const followerGrowthData = {
        Daily: [5, 3, 10, 2, 1, 18, 16],
        Monthly: [101, 50.5, 200, 250, 500, 100, 120, 200, 1250, 3000, 5000, 700],
        ByDate: Array.from({ length: 31 }, (_, i) => i + 1),
    };

    const [loading, setLoading] = useState(true)
    const [gender, setGender] = useState({ data: [], columns: [] })
    const [buyer, setBuyer] = useState({ data: [], columns: [] })
    const [age, setAge] = useState({ data: [], columns: [] })
    const [followerGrowth, setFollowerGrowth] = useState()
    const [buyerGrowth, setBuyerGrowth] = useState()
    const [follower, setFollower] = useState()
    const [buyerCount, setBuyerCount] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${process.env.NEXT_PUBLIC_DEV_BACKEND_API}/api/buyer`);
                // Assuming the response structure matches your given JSON
                const data = response.data;
                setGender(data.gender)
                setBuyer(data.buyer)
                setAge(data.age)
                setFollowerGrowth(data.follower_growth)
                setBuyerGrowth(data.buyer_growth)
                setFollower(data.follower)
                setBuyerCount(data.buyer_count)
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
                        title={'Follower'}
                        subtitle={follower}
                    />
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={'Buyer'}
                        subtitle={buyerCount}
                    />
                </div>
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                    <FrequencyBar title={'Buyer Type Frequency'} fetchData={buyer} />
                    <FrequencyBar title={'Gender Frequency'} fetchData={gender} />
                    <FrequencyBar title={'Age Frequency'} fetchData={age} />
                </div>
                {/*Order Trends*/}
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* <TimeGrowth title={'Buyer Growth'} fetchData={buyerGrowthData} /> */}
                    <BasicGrowth title={"Follower Growth"} fetchData={followerGrowth} />
                    <BasicGrowth title={"New Buyer Growth"} fetchData={buyerGrowth} />
                </div>



            </div>
        );
    } else {
        return <></>
    }
};

export default Buyer;
