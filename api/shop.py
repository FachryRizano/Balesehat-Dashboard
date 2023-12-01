from datetime import datetime
def convert_viewed_product_trend(input_data):
    result = {}
    for item in input_data:
        date,product, quantity = item
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
    
# Widget
q_free_shipment = """
SELECT 
  SUM(sales_from_free_shipping) AS sales_free_shipping,
  SUM(sales_not_from_free_shipping) AS sales_not_free_shipping
FROM tokopedia.shop;
"""

q_viewed_product_trend = """
SELECT 
  TO_CHAR(TO_DATE(date, 'DD/MM/YYYY'), 'Mon YYYY') AS month_year,
  labels,
  CASE 
    WHEN labels = 'conversion_rate' OR labels = 'new_orders_free_shipping_rate' THEN AVG(data)
    ELSE SUM(data)
  END AS data
FROM (
SELECT date, 'products_viewed' AS labels, products_viewed AS data
FROM tokopedia.shop
UNION ALL
SELECT date, 'new_orders_free_shipping_rate' as labels, 
	CASE WHEN
		orders > 0 THEN (new_orders_from_free_shipping * 1.0 / orders)*100
		ELSE 0
	END as data
FROM tokopedia.shop
UNION ALL
SELECT 
date, 
'conversion_rate' AS labels, 
CASE 
    WHEN products_viewed > 0 THEN (orders * 1.0 / products_viewed) * 100
    ELSE 0.0
END AS data
FROM tokopedia.shop
) AS subquery
GROUP BY month_year, labels
ORDER BY month_year, labels;

"""
q_new_order_free_shipping = """
SELECT 
  TO_CHAR(TO_DATE(date, 'DD/MM/YYYY'), 'Mon YYYY') AS month_year,
  SUM(new_orders_from_free_shipping) / SUM(orders) * 100 AS percentage_new_orders_free_shipping,
  SUM(orders) / SUM(products_viewed) *100 AS conversion_ratio
FROM tokopedia.shop
GROUP BY month_year,
year,month
ORDER BY year,month;
"""


