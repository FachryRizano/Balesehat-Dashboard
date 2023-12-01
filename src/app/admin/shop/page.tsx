'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MdBarChart } from 'react-icons/md';
import Trend from 'components/admin/product/Trend';

import Widget from 'components/widget/Widget'
const Shop = () => {
    const [loading, setLoading] = useState(true);
    const [salesFreeShipping, setSalesFreeShipping] = useState(null)
    const [salesNotFreeShipping, setSalesNotFreeShipping] = useState(null)
    const [viewTrends, setViewTrends] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${process.env.NEXT_PUBLIC_DEV_BACKEND_API}/api/shop`);
                // Assuming the response structure matches your given JSON
                const data = response.data;
                const a = (parseFloat((data.sales_free_shipping))/ 1000000).toFixed(2);
                const b = (parseFloat((data.sales_not_free_shipping))/ 1000000).toFixed(2);

                setSalesFreeShipping(a);
                setSalesNotFreeShipping(b);
                setViewTrends(data.view_product_trend)
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
                <div className="mt-3 mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={'Sales Free Shipping'}
                        subtitle={`${salesFreeShipping} M`}
                    />
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={'Sales Not Free Shipping'}
                        subtitle={`${salesNotFreeShipping} M`}
                    />
                </div>
                <Trend title={`View Trend`} fetchData={viewTrends} />
            </div>
        );
    } else {
        return <></>
    }

};

export default Shop;
