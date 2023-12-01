'use client';
import Table from 'components/admin/ads/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Trend from 'components/admin/product/Trend';
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [productPerformanceCategory,setProductPerformanceCategory] = useState({})
  const [productPerformance, setProductPerformance] = useState({})
  const [productTrend,setProductTrend] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${process.env.NEXT_PUBLIC_DEV_BACKEND_API}/api/product`);
        // Assuming the response structure matches your given JSON
        const data = response.data;
        setProductPerformanceCategory(data.product_performance_category)
        setProductPerformance(data.product_performance)
        setProductTrend(data.product_monthly_trend)
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
        <Trend title={`Monthly Product`} fetchData={productTrend}/>
        <Table title={'Product Performance Category'} tableData={productPerformanceCategory} columnOrder={['category','product_purchase','revenue']} />
        <Table title={'Product Performance'} tableData={productPerformance} columnOrder={['product_name','avg_products_sold','avg_cart','avg_wishlist','avg_products_viewed','avg_conversion']} />
      </div>
    );
  } else {
    return <></>
  }
}

export default Product;
