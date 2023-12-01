# import sqlalchemy
# Wawasan Iklan
# Performa

def convert_keyword_analysis(input_data):
    result = []

    for item in input_data:

        # Create a dictionary for each product
        product_data = {
            "keyword": item[0],
            "conversion_rate": float(item[1]*100),
            "total_sales": int(item[2]),
            "total_clicks": int(item[3])
        }

        result.append(product_data)

    return result
    
def convert_click_conversion_rate(input_data):
    result = []

    for item in input_data:

        # Create a dictionary for each product
        product_data = {
            "product":item[0],
            "click_through_rate": float(item[1])*100,
            "conversion_rate": float(item[2])*100,
        }

        result.append(product_data)

    return result
def convert_ad_location_cashflow(input_data):
    converted_data = {}
    for item in input_data:
        category, month_year, spend, earn = item
        if category not in converted_data:
            converted_data[category] = []
        converted_data[category].append({
            "totalSpend": int(spend),
            "totalEarn": int(earn),
            "month_year": month_year
        })
    return converted_data

def convert_expense_ratio(input_data):
    lst_month_year = []
    lst_spend = []
    lst_earn = []
    for l in input_data:
        lst_month_year.append(l[0])
        lst_spend.append(int(l[1]))
        lst_earn.append(int(l[2]))
    converted_data = {
        'month_year':lst_month_year,
        'spend':lst_spend,
        'earn':lst_earn,
    }
    return converted_data
def convert_performances_ads_product(input_data):
    result = []

    for item in input_data:
        # Ensure the 'average_effectiveness' value is not None before processing
        avg_effectiveness = item[3] if item[3] is not None else 0

        # Create a dictionary for each product
        product_data = {
            "product": item[0],
            "spend": int(item[1]),
            "earn": int(item[2]),
            "average_effectiveness": float(avg_effectiveness)
        }

        result.append(product_data)

    return result

def convert_top_performing_ads(input_data):
    result = []

    for item in input_data:

        # Create a dictionary for each product
        product_data = {
            "ads_group": item[0],
            "sold": int(item[1]),
            "clicks": int(item[2]),
            'conversion_rate':round(float(item[3]if item[3] != None else 0),2),
            "average_effectiveness": float(item[4])
        }

        result.append(product_data)

    return result

def convert_conversion(input_data):
    lst_month_year = []
    lst_click = []
    lst_sold = []
    for l in input_data:
        lst_month_year.append(l[0])
        lst_click.append(int(l[1]))
        lst_sold.append(int(l[2]))
    converted_data = {
        'month_year':lst_month_year,
        'click':lst_click,
        'sold':lst_sold,
    }
    return converted_data
q_performance_ads_product="""
SELECT 
    COALESCE(products,'-') AS products,
    SUM(spend) AS total_spend,
    SUM(earn) AS total_earn,
    AVG(ads_effectiveness) AS average_effectiveness
FROM 
    tokopedia.ads
GROUP BY 
    COALESCE(products,'-')
ORDER BY
    average_effectiveness DESC, total_earn DESC, total_spend ASC;
"""


q_keyword_analysis = """
SELECT 
    keyword,
    COALESCE(SUM(sold) / NULLIF(SUM(click), 0),0) AS conversion_rate,
    SUM(sold) as total_sales,
    SUM(click) as total_clicks
FROM 
    tokopedia.seo
GROUP BY 
    keyword

ORDER BY 
    conversion_rate DESC, total_sales DESC, total_clicks DESC;    
"""
q_click_conversion_rate = """
SELECT 
    COALESCE(products,'-'),
    round(SUM(click) / NULLIF(SUM(appearance), 0)::numeric, 4) AS click_through_rate,
    COALESCE(round((SUM(sold) / NULLIF(SUM(click), 0))::numeric, 4),0) AS conversion_rate
FROM 
    tokopedia.ads
GROUP BY 
    products

ORDER BY
    conversion_rate DESC, click_through_rate DESC;
"""
q_top_performing_ads = """
SELECT 
    ads_group_name,
    COALESCE(SUM(sold),0) AS total_sold,
    SUM(click) AS total_clicks,
    COALESCE(SUM(sold),0)/NULLIF(SUM(click),0)*100 as conversion_rate,
    COALESCE(ROUND(AVG(ads_effectiveness)::numeric,2),0) AS average_effectiveness
FROM 
    tokopedia.ads
GROUP BY 
    ads_group_name
ORDER BY 
    total_sold DESC, total_clicks DESC, average_effectiveness DESC
"""
q_ads_location_roas = """
SELECT 
    round(COALESCE(SUM(earn)/SUM(spend), 0),2) AS roas
FROM 
    tokopedia.ads
GROUP BY 
    ads_location
ORDER BY 
    ads_location;
"""
q_ads_location_avg_effectiveness = """
SELECT 
    ROUND(COALESCE(AVG(ads_effectiveness)::numeric,0),2) as avg_effectiveness
FROM tokopedia.ads
GROUP BY
    ads_location
ORDER BY
    ads_location;
"""
q_ads_location_cashflow="""
SELECT 
ads_location,
TO_CHAR(TO_TIMESTAMP(month::text, 'MM'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(year::text, 'YYYY'), 'YYYY') AS month_year,
sum(spend) as totalSpend,
sum(earn) as totalEarn
FROM tokopedia.ads
GROUP BY
    month_year,
    ads_location,
    month,year
ORDER BY 
    ads_location,
    month , year
"""

q_expense_ratio = """
SELECT 
    TO_CHAR(TO_TIMESTAMP(month::text, 'MM'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(year::text, 'YYYY'), 'YYYY') AS month_year,
    sum(spend) as totalSpend,
    sum(earn) as totalEarn
    FROM tokopedia.ads
    GROUP BY
        month_year,
        month,year
    ORDER BY 
        month , year
"""
q_conversion ="""
SELECT 
TO_CHAR(TO_TIMESTAMP(month::text, 'MM'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(year::text, 'YYYY'), 'YYYY') AS month_year,
sum(click) as totalClick,
sum(sold) as totalSold
FROM tokopedia.ads
GROUP BY
    month_year,
    month,year
ORDER BY 
    month , year
"""

q_spend_earn_roas_this_month = """
SELECT 
    TO_CHAR(TO_TIMESTAMP(month::text, 'MM'), 'Mon') || ' ' || TO_CHAR(TO_TIMESTAMP(year::text, 'YYYY'), 'YYYY') AS month_year,
    sum(spend) as totalSpend,
    sum(earn) as totalEarn,
    round(sum(earn)/sum(spend),2) as roas
    FROM tokopedia.ads
    GROUP BY
        month_year,
        month,year
    ORDER BY 
        year DESC, month DESC
LIMIT 1

"""