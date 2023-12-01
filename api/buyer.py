def convert_freq(input_data,columns):
    return{
		"data":input_data[0],
		"columns":columns
	}

def convert_growth(input_data):
    data = []
    labels = []
    for l in input_data:
        labels.append(l[0])
        data.append(int(l[1]))
    return {
		'data':data,
		'labels':labels
	}    
q_gender="""
    SELECT SUM(men) AS Total_Men, SUM(women) AS Total_Women, SUM(unknown) AS Total_Unknown 
    FROM tokopedia.demography
    """
q_buyer = """
SELECT SUM(new_buyer) AS New_Buyer, SUM(reguler_buyer) AS Regular_Buyer, SUM(loyal_buyer) AS Loyal_Buyer 
FROM tokopedia.demography;
"""
q_age = """
SELECT SUM("under_17_years") AS Under_17, 
SUM("18_23") AS Age_18_23, 
SUM("24_34") AS Age_24_34, 
SUM("35_44") AS Age_35_44, 
SUM("45_plus") AS Age_45_Plus 
FROM tokopedia.demography;
"""
q_monthly_follower_growth = """
WITH subquery as (SELECT 
    date, 
    followers,
    TO_CHAR(TO_TIMESTAMP(date::text, 'YYYY-MM-DD'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(date::text, 'YYYY-MM-DD'), 'YYYY') AS month_year,
    followers - LAG(followers, 1) OVER (ORDER BY date)AS daily_growth
FROM 
    tokopedia.demography)
SELECT 
month_year, 
SUM(daily_growth) 
from subquery
GROUP BY
month_year
ORDER BY
    TO_CHAR(TO_TIMESTAMP(month_year,'Mon YYYY'),'YYYY'),
    TO_CHAR(TO_TIMESTAMP(month_year,'Mon YYYY'),'MM')
"""
q_daily_follower_growth = """
SELECT 
date, 
    coalesce(followers - LAG(followers, 1) OVER (ORDER BY date),0)AS daily_growth
FROM 
    tokopedia.demography
"""
q_daily_buyer_growth = """
SELECT 
date, 
    new_buyer
FROM 
    tokopedia.demography
"""
q_monthly_buyer_growth = """
WITH subquery as (SELECT 
    date, 
    new_buyer,
    TO_CHAR(TO_TIMESTAMP(date::text, 'YYYY-MM-DD'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(date::text, 'YYYY-MM-DD'), 'YYYY') AS month_year
FROM 
    tokopedia.demography)
SELECT 
month_year, 
SUM(new_buyer) 
from subquery
GROUP BY
month_year
ORDER BY
    TO_CHAR(TO_TIMESTAMP(month_year,'Mon YYYY'),'YYYY'),
    TO_CHAR(TO_TIMESTAMP(month_year,'Mon YYYY'),'MM')
"""
q_follower = """
SELECT followers FROM tokopedia.demography
ORDER BY
    date DESC
LIMIT 1;
"""
q_buyer_count= """
SELECT count(distinct(buyer_name)) FROM tokopedia.order;
"""