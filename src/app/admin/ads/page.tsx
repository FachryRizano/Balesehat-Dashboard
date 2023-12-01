'use client';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';

import Widget from 'components/widget/Widget';

import Table from 'components/admin/ads/Table';
import CashflowTrends from 'components/admin/ads/CashflowTrends';
import ConversionTrends from 'components/admin/ads/ConversionTrends';
import AdLocationPieChartCard from 'components/admin/ads/AdLocationPieChartCard';
import AdLocationCashFlow from 'components/admin/ads/AdLocationCashFlow';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const Ads = () => {
    const [loading, setLoading] = useState(true);
    const [performanceAdsProduct, setPerformanceAdsProduct] = useState({})
    const [topPerformingAds, setTopPerformingAds] = useState({})
    const [clickConversionRate, setClickConversionRate] = useState({})
    const [keywordAnalysis, setKeywordAnalysis] = useState({})
    const [adsLocationRoas, setAdsLocationRoas] = useState({})
    const [adsLocationAvg,setAdsLocationAvg] = useState({})
    const [adsLocationCashflow,setAdsLocationCashflow] = useState({})
    const [expenseRatio,setExpenseRatio] = useState({})
    const [conversion,setConversion] = useState({})
    const [spend,setSpend]= useState(0)
    const [earn,setEarn]= useState(0)
    const [roas,setRoas]= useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${process.env.NEXT_PUBLIC_DEV_BACKEND_API}/api/ads-and-seo`);
                // Assuming the response structure matches your given JSON
                const data = response.data;
                setPerformanceAdsProduct(data.performance_ads_product)
                setTopPerformingAds(data.top_performing_ads)
                setClickConversionRate(data.click_conversion_rate)
                setKeywordAnalysis(data.keyword_analysis)
                setAdsLocationRoas(data.ads_location_roas)
                setAdsLocationAvg(data.ads_location_avg)
                setAdsLocationCashflow(data.ads_location_cashflow)
                setExpenseRatio(data.expense_ratio)
                setConversion(data.conversion)
                setEarn(data.earn)
                setSpend(data.spend)
                setRoas(data.roas)
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
                {/* Card widget */}

                <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={'Earnings This Month'}
                        subtitle={`${earn}k`}
                    />
                    <Widget
                        icon={<IoDocuments className="h-6 w-6" />}
                        title={'Spend This Month'}
                        subtitle={`${spend}k`}
                    />
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={'ROAS This Month'}
                        subtitle={`${roas}`}
                    />
                    
                </div>
                {/*Monthly Trends*/}
                <div className="mt-5 mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <CashflowTrends data={expenseRatio}/>
                    <ConversionTrends data={conversion}/>
                </div>

                {/* Performance Based on Ad Location */}
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* <CashflowTrends/> */}
                    <AdLocationCashFlow data={adsLocationCashflow}/>
                    <AdLocationPieChartCard roas={adsLocationRoas} avg_effectiveness={adsLocationAvg}/>
                </div>
                {/* Top Performing Ads */}
                <Table title={'Top Performing Ads'} tableData={topPerformingAds} columnOrder={['ads_group', 'clicks', 'sold', 'conversion_rate','average_effectiveness']} />
                {/* Performance of Ads Product*/}
                <Table title={'Performance Ads Per Product'} tableData={performanceAdsProduct} columnOrder={['product', 'spend', 'earn', 'average_effectiveness']} />
                {/* Click Conversation Rate*/}
                <Table title={'Click Conversion Rate'} tableData={clickConversionRate} columnOrder={['product', 'click_through_rate', 'conversion_rate']} />
                {/* Keyword Analysis (Nanti)*/}
                <Table title={'Keyword Analysis'} tableData={keywordAnalysis} columnOrder={['keyword', 'conversion_rate', 'total_sales', 'total_clicks']} />

            </div>
        );
    } else {
        return <></>
    }

};

export default Ads;
