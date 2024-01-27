# Trend penjualan 
q_daily_trend = """
-- Tren Harian
WITH subquery AS (
	SELECT 
		distinct invoice,
		TO_CHAR(TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY'), 'DY') AS days,
		TO_CHAR(TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY'),'YYYY-MM-DD') as tanggal
	FROM 
		tokopedia.order
),subquery_2 as (
SELECT
tanggal,
days,
COUNT(invoice)
FROM subquery
GROUP BY tanggal,days)
-- select * from subquery_2
select ROUND(AVG(count),2) from subquery_2 
GROUP BY days
ORDER BY 
	CASE
		WHEN days = 'SUN' THEN 7
		WHEN days = 'MON' THEN 1
		WHEN days = 'TUE' THEN 2
		WHEN days = 'WED' THEN 3
		WHEN days = 'THU' THEN 4
		WHEN days = 'FRI' THEN 5
		WHEN days = 'SAT' THEN 6
	END ASC;
"""

q_monthly="""
WITH subquery AS (
		SELECT 
			distinct invoice,
			TO_CHAR(TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY'), 'Mon') AS month,
			TO_CHAR(TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY'), 'YYYY') AS year,
			TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY') as tanggal
		FROM 
			tokopedia.order
	),
	subquery_2 as (
	SELECT
	year,
	month,
	COUNT(invoice) as total_invoice
	FROM subquery
	GROUP BY year,month)
	SELECT 
		round(avg(total_invoice),2)
	from subquery_2 GROUP BY month
	ORDER BY
		CASE
			WHEN month = 'Jan' THEN 1
			WHEN month = 'Feb' THEN 2
			WHEN month = 'Mar' THEN 3
			WHEN month = 'Apr' THEN 4
			WHEN month = 'May' THEN 5
			WHEN month = 'Jun' THEN 6
			WHEN month = 'Jul' THEN 7
			WHEN month = 'Aug' THEN 8
			WHEN month = 'Sep' THEN 9
			WHEN month = 'Oct' THEN 10
			WHEN month = 'Nov' THEN 11
			WHEN month = 'Dec' THEN 12
		END ASC;
	"""

q_bydate="""
	WITH subquery AS (
	SELECT 
		distinct invoice,
		TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY') as tanggal,
		TO_CHAR(TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY'), 'DD') AS d
	FROM 
		tokopedia.order
),
subquery_2 as (
SELECT d,tanggal, count(d)
FROM 
	subquery
GROUP BY d,tanggal
)
select round(avg(count),2)
from subquery_2 
group by d
order by d
"""

q_order_process_time="""
SELECT 
	ROUND(EXTRACT(EPOCH FROM (TO_TIMESTAMP(shipment_timestamp, 'YYYY-MM-DD HH24:MI:SS') - TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY HH24:MI:SS'))) / 3600,2) AS process_time_hours
FROM 
	tokopedia.order
WHERE EXTRACT(EPOCH FROM (TO_TIMESTAMP(shipment_timestamp, 'YYYY-MM-DD HH24:MI:SS') - TO_TIMESTAMP(payment_timestamp, 'DD-MM-YYYY HH24:MI:SS'))) / 3600 is not NULL
AND shipment_timestamp != '-'
ORDER BY 
	process_time_hours;
"""

q_best_selling_product = """
SELECT product_name, sum(product_purchase_counts) AS jumlah_terjual
FROM tokopedia.order
GROUP BY product_name
ORDER BY jumlah_terjual DESC;
"""

q_sales_campaign_performance = """
SELECT 
	COALESCE(campaign_name, '-') AS campaign_name, 
	count(distinct invoice) AS jumlah_penjualan
FROM 
	tokopedia.order
GROUP BY 
	COALESCE(campaign_name, '-')
ORDER BY 
	jumlah_penjualan DESC;

"""


q_sales_distribution_location = """
SELECT coalesce(province,'-'), COUNT(distinct invoice) AS jumlah_penjualan
FROM tokopedia.order
GROUP BY province
ORDER BY jumlah_penjualan DESC;
"""
q_delivery_method_preferences = """
SELECT coalesce(courier_name,'-'), COUNT(distinct invoice) AS jumlah_pengiriman
FROM tokopedia.order
GROUP BY courier_name
ORDER BY jumlah_pengiriman DESC;
"""

q_cancellation_order = """
SELECT COUNT(*) AS jumlah_pembatalan
FROM tokopedia.order
WHERE cancellation_timestamp IS NOT NULL;
"""

q_order_value_city = """
WITH subquery as (SELECT distinct invoice,total_sales,city FROM
	tokopedia.order)
SELECT coalesce(city,'-'),SUM(total_sales)
FROM subquery
GROUP BY
	city
ORDER BY
	SUM(total_sales)
	DESC
;
"""

q_order_count_city = """
WITH subquery as (
	SELECT distinct invoice,
	product_purchase_counts,
	city 
	FROM
		tokopedia.order)
	SELECT coalesce(city,'-'),SUM(product_purchase_counts)
	FROM subquery
	GROUP BY
		city
	ORDER BY
		SUM(product_purchase_counts)
		DESC
	;
	
"""

q_sales_value_mean="""
	WITH subquery as (SELECT distinct invoice,total_sales,city FROM
	tokopedia.order)
SELECT coalesce(city,'-'),round(avg(total_sales),2)
FROM subquery
GROUP BY
	city
ORDER BY
	SUM(total_sales)
	DESC
;
"""

q_item_count_city = """
WITH subquery as (SELECT distinct invoice,product_purchase_counts,city FROM
tokopedia.order)
SELECT coalesce(city,'-'),SUM(product_purchase_counts)
FROM subquery
GROUP BY
	city
ORDER BY
	SUM(product_purchase_counts)
	DESC
;
"""

q_monthly_sales = """
WITH subquery as (SELECT 
	distinct invoice, 
	total_sales,
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY') AS month_year
FROM 
	tokopedia.order)
SELECT 
month_year, 
coalesce(SUM(total_sales),0)::numeric 
from subquery
GROUP BY
month_year
ORDER BY
	TO_CHAR(TO_TIMESTAMP(month_year,'Mon YYYY'),'YYYY'),
	TO_CHAR(TO_TIMESTAMP(month_year,'Mon YYYY'),'MM')
"""

q_daily_sales="""
WITH subquery as (SELECT 
	distinct invoice, 
	total_sales,
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'DD-MM-YYYY') as date
FROM 
	tokopedia.order)
SELECT 
date, 
coalesce(SUM(total_sales),0)::numeric 
from subquery
GROUP BY
date
ORDER BY
	TO_TIMESTAMP(date::text, 'DD-MM-YYYY')
"""

q_yearly_sales = """
WITH subquery as (SELECT 
	distinct invoice, 
	total_sales,
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY') AS year
FROM 
	tokopedia.order)
SELECT 
year, 
coalesce(SUM(total_sales),0)::numeric 
from subquery
GROUP BY
year
ORDER BY
	TO_CHAR(TO_TIMESTAMP(year,'YYYY'),'YYYY')
"""

q_yearly_order_count="""
SELECT 
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY') AS year,
	count(DISTINCT invoice)
	
FROM
	tokopedia.order
	
GROUP BY
	year
ORDER BY
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY')
"""

q_monthly_order_count = """
SELECT 
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY') AS month_year,
	count(DISTINCT invoice)
	
FROM
	tokopedia.order
	
GROUP BY
	month_year,
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'MM'),
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY')
ORDER BY
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'YYYY'),
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'MM')
"""
q_daily_order_count ="""
SELECT 
	TO_CHAR(TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY'), 'DD-MM-YYYY') as date,
	count(DISTINCT invoice)
	
FROM
	tokopedia.order
GROUP BY
	TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY')
ORDER BY
	TO_TIMESTAMP(payment_timestamp::text, 'DD-MM-YYYY')
"""

# q_avg_net_price_purchase = """
# SELECT 
#     payment_timestamp_year,
#     payment_timestamp_month,
#     product_name,
#     ROUND(AVG(price_per_purchased_based_on_net_payment)) AS avg_price_per_purchased
# FROM 
#     tokopedia.order
# GROUP BY 
#     payment_timestamp_year,
#     payment_timestamp_month,
#     product_name;
# """

q_avg_net_price_purchase = """
WITH all_combinations AS (
    SELECT 
        y.payment_timestamp_year,
        m.payment_timestamp_month,
        p.product_name
    FROM 
        (SELECT DISTINCT payment_timestamp_year FROM tokopedia.order) y
        CROSS JOIN (SELECT DISTINCT payment_timestamp_month FROM tokopedia.order) m
        CROSS JOIN (SELECT DISTINCT product_name FROM tokopedia.order) p
)
SELECT 
    ac.payment_timestamp_year,
    ac.payment_timestamp_month,
    ac.product_name,
    COALESCE(ROUND(AVG(o.price_per_purchased_based_on_net_payment)), 0) AS avg_price_per_purchased
FROM 
    all_combinations ac
    LEFT JOIN tokopedia.order o ON ac.payment_timestamp_year = o.payment_timestamp_year
                                  AND ac.payment_timestamp_month = o.payment_timestamp_month
                                  AND ac.product_name = o.product_name
GROUP BY 
    ac.payment_timestamp_year,
    ac.payment_timestamp_month,
    ac.product_name;
"""


