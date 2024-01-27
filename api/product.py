from datetime import datetime
def parse_date(date_str):
    return datetime.strptime(date_str, "%b %Y")

def convert_to_multi_index_dict(data_list):
    result = {}
    for item in data_list:
        year, month, product_name, value = item

        # Create a nested dictionary with year and product name as keys
        if year not in result:
            result[year] = {}
        if product_name not in result[year]:
            result[year][product_name] = {'data': []}
        result[year][product_name]['data'].append(int(value))

    return result

def convert_product_performing_category(input_data):
    result = []

    for item in input_data:

        # Create a dictionary for each product
        product_data = {
            "category": item[0],
            "product_purchase": int(item[1]),
            "revenue": int(item[2]),
        }

        result.append(product_data)

    return result
def convert_rarely_sold_products(input_data):
    result = []

    for item in input_data:

        # Create a dictionary for each product
        product_data = {
            "product_name": item[0],
            "sold": int(item[1]),
        }

        result.append(product_data)

    return result

def convert_product_performance(input_data):
    result = []

    for item in input_data:

        # Create a dictionary for each product
        product_data = {
            "product_name": item[0],
            "avg_products_sold": float(item[1]),
            "avg_cart": float(item[2]),
            "avg_wishlist": float(item[3]),
            "avg_products_viewed": float(item[4]),
            "avg_conversion": float(item[5]),
        }

        result.append(product_data)

    return result

def convert_product_monthly_trend(input_data):
    result = {}
    for item in input_data:
        product, date, quantity = item
        # Check if the product is already in the dictionary
        if product not in result:
            result[product] = {'labels': [], 'data': []}
        # Append the date to the labels list and quantity to the data list
        # result[product]['labels'].append(sorted(date, key=parse_date))
        result[product]['labels'].append(date)
        result[product]['data'].append(int(quantity))
    # for product in result.keys():
    #     result[product]['labels'] = sorted(result[product]['labels'],key=parse_date)
    # Function to sort dates
    def sort_dates(data):
        for product in data:
            combined = list(zip(data[product]['labels'], data[product]['data']))
            combined.sort(key=lambda x: datetime.strptime(x[0], '%b %Y'))
            data[product]['labels'], data[product]['data'] = zip(*combined)
        return data

    # Sorting the dates
    result = sort_dates(result)
    return result
    

q_product_performance_category = """
    WITH cat as (
    SELECT distinct product_name, category
    FROM tokopedia.product )
    SELECT 
        category,
        SUM(product_purchase_counts)::numeric,
        SUM(original_price*product_purchase_counts)::numeric as revenue 
    FROM 
        tokopedia.order as o
    JOIN cat as c on c.product_name = o.product_name
    GROUP BY
        category
    ORDER BY
        revenue desc
    """
q_product_performance = """
SELECT 
    product_name, 
    round(AVG(products_sold),2) as avg_products_sold, 
    round(AVG(cart),2) as avg_cart, 
    round(AVG(wishlist),2) as avg_wishlist,
    round(AVG(products_viewed),2) as avg_products_viewed,
    round(AVG(conversion::numeric),2) as avg_conversion
FROM tokopedia.product
GROUP BY product_name
ORDER BY AVG(products_sold) desc, AVG(cart) desc, AVG(wishlist) desc, AVG(products_viewed) desc;
"""
q_product_monthly_trend = """
WITH date_range AS (
    SELECT generate_series(MIN(TO_DATE(SPLIT_PART(payment_timestamp, ' ', 1), 'DD/MM/YYYY')), MAX(TO_DATE(SPLIT_PART(payment_timestamp, ' ', 1), 'DD/MM/YYYY')), '1 month'::interval)::date AS month_start
    FROM tokopedia.order
),
all_products AS (
    SELECT DISTINCT product_name
    FROM tokopedia.order
),
all_combinations AS (
    SELECT p.product_name, TO_CHAR(d.month_start, 'Mon YYYY') AS month_year
    FROM all_products p
    CROSS JOIN date_range d
),
subquery AS (
    SELECT 
        product_name,
        TO_CHAR(TO_DATE(SPLIT_PART(payment_timestamp, ' ', 1), 'DD/MM/YYYY'), 'Mon YYYY') AS month_year,
        SUM(product_purchase_counts) AS total_penjualan
    FROM 
        tokopedia.order
    GROUP BY product_name, month_year
)
SELECT 
    ac.product_name,
    ac.month_year,
    COALESCE(s.total_penjualan, 0) AS total_penjualan
FROM 
    all_combinations ac
LEFT JOIN subquery s ON ac.product_name = s.product_name AND ac.month_year = s.month_year
ORDER BY ac.month_year, ac.product_name;
"""