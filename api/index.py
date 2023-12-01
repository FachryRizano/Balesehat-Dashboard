from flask import Flask, jsonify,request
import psycopg2
import os
import itertools
from flask_cors import CORS, cross_origin
from utils import *
from ads_and_seo import *
from buyer import *
from product import *
from order import *
from shop import *
from datetime import datetime, timedelta, timezone


from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
                               
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

CORS(jwt, resources={r"/api/*": {"origins": "http://localhost:3000"}})
# Database configuration (update these with your database credentials)
DATABASE = 'balesehat01'
USER = 'admin'
# USER = 'postgres'
PASSWORD = 'asdswt123'
HOST = 'localhost'  # localhost if your database is on the same server
PORT = '5431'  # default PostgreSQL port
# PORT = '5432'  # default PostgreSQL port


@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/api/order')
@cross_origin()
def order():
    # Connect to your postgres DB
    conn = psycopg2.connect(
        dbname=DATABASE,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT
    )

    # Open a cursor to perform database operations
    cur = conn.cursor()

    # Execute a query
    cur.execute(q_bydate)
    # Retrieve query results
    byDate= remove_multi_list(cur.fetchall())
    cur.execute(q_monthly)
    # Retrieve query results
    monthly = remove_multi_list(cur.fetchall())
    cur.execute(q_daily_trend)
    # Retrieve query results
    daily = remove_multi_list(cur.fetchall())
    order_trends = {
        'Daily':daily,
        'Monthly':monthly,
        'ByDate':byDate
    }

    

    cur.execute(q_order_process_time)
    # Retrieve query results
    order_process_time = [{'name':'Frequency','data':calculate_frequency(remove_multi_list(cur.fetchall()))}]

    
    cur.execute(q_best_selling_product)
    best_selling_product = convert_list_to_dict(cur.fetchall())

    
    cur.execute(q_sales_campaign_performance)
    sales_campaign_performance = convert_list_to_dict(cur.fetchall())

    
    cur.execute(q_sales_distribution_location)
    sales_distribution_location = convert_list_to_dict(cur.fetchall())

    
    cur.execute(q_delivery_method_preferences)
    delivery_method_preferences = convert_list_to_dict(cur.fetchall())

    
    cur.execute(q_cancellation_order)
    cancellation_order = cur.fetchall()
    
    
    
    cur.execute(q_order_value_city)
    order_value_city = convert_list_to_dict(cur.fetchall())
    
    
    cur.execute(q_order_count_city)
    order_count_city = convert_list_to_dict(cur.fetchall())

    
    
    cur.execute(q_sales_value_mean)

    sales_value_mean = convert_list_to_dict(cur.fetchall())
    # Retrieve query results
        # Close communication with the database
    
    cur.execute(q_item_count_city)
    item_count_city = convert_list_to_dict(cur.fetchall())
    
    
    cur.execute(q_monthly_sales)
    monthly_sales = convert_growth(cur.fetchall())
    
    cur.execute(q_daily_sales)
    daily_sales = convert_growth(cur.fetchall())
    
    
    cur.execute(q_yearly_sales)
    yearly_sales = convert_growth(cur.fetchall())
    sales = {
        'Daily':daily_sales,
        'Monthly':monthly_sales,
        'Yearly':yearly_sales
    }
    
    
    cur.execute(q_yearly_order_count)
    yearly_order_count= cur.fetchall()
    
    cur.execute(q_monthly_order_count)
    monthly_order_count = cur.fetchall()
    
    cur.execute(q_daily_order_count)
    daily_order_count = cur.fetchall()
    order_count = {
        'Daily':convert_growth(daily_order_count),
        'Monthly':convert_growth(monthly_order_count),
        'Yearly':convert_growth(yearly_order_count)
    }
    cur.close()
    conn.close()

    records = {
       "order_trends": order_trends,
       "order_process_time":order_process_time,
       "best_selling_product":best_selling_product,
       "sales_campaign_performance":sales_campaign_performance,
       "sales_distribution_location":sales_distribution_location,
       "delivery_method_preferences":delivery_method_preferences,
       "cancellation_order":cancellation_order,
       "order_value_city":order_value_city,
       "item_count_city":item_count_city,
       'order_count':order_count,
       "sales_value_mean":sales_value_mean,
       "sales":sales,
       "order_count_city":order_count_city
    }

    return jsonify(records)

@app.route('/api/ads-and-seo')
@cross_origin()
def ads_and_seo():
    # Connect to your postgres DB
    conn = psycopg2.connect(
        dbname=DATABASE,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT
    )

    # Open a cursor to perform database operations
    cur = conn.cursor()
    
    cur.execute(q_performance_ads_product)
    performance_ads_product= convert_performances_ads_product(cur.fetchall())
    cur.execute(q_keyword_analysis)
    keyword_analysis = convert_keyword_analysis(cur.fetchall())
    
    
    cur.execute(q_click_conversion_rate)
    click_conversion_rate = convert_click_conversion_rate(cur.fetchall())
    
    
    cur.execute(q_top_performing_ads)
    top_performing_ads = convert_top_performing_ads(cur.fetchall())
    
    
    cur.execute(q_ads_location_roas)
    ads_location_roas = remove_multi_list(cur.fetchall())
    
    
    cur.execute(q_ads_location_avg_effectiveness)
    ads_location_avg = remove_multi_list(cur.fetchall())
    
    
    cur.execute(q_ads_location_cashflow)
    ads_location_cashflow = convert_ad_location_cashflow(cur.fetchall())
    
    
    cur.execute(q_expense_ratio)
    expense_ratio = convert_expense_ratio(cur.fetchall())
    
   
    cur.execute(q_conversion)
    conversion = convert_conversion(cur.fetchall())
    
    cur.execute(q_spend_earn_roas_this_month)
    temp = cur.fetchall()
    spend,earn,roas = float(round(temp[0][1]/1000,1)),float(round(temp[0][2]/1000,1)),float(temp[0][3])
    records = {
        "spend":spend,
        "earn":earn,
        "roas":roas,
       "expense_ratio": expense_ratio,
       "conversion":conversion,
       "ads_location_cashflow":ads_location_cashflow,
        "ads_location_avg":ads_location_avg,
        "ads_location_roas":ads_location_roas,
       "top_performing_ads":top_performing_ads,
       "performance_ads_product":performance_ads_product,
       "click_conversion_rate":click_conversion_rate,
       "keyword_analysis":keyword_analysis
    }
    return jsonify(records)


@app.route('/api/buyer')
@cross_origin()
def buyer():
    # Connect to your postgres DB
    conn = psycopg2.connect(
        dbname=DATABASE,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT
    )

    # Open a cursor to perform database operations
    cur = conn.cursor()
    
    cur.execute(q_gender)
    gender = convert_freq(cur.fetchall(),["Men",'Women','Unknown'])
    
    
    cur.execute(q_buyer)
    buyer = convert_freq(cur.fetchall(),["New Buyer","Regular Buyer", "Loyal Buyer"])
    
    
    cur.execute(q_age)
    age = convert_freq(cur.fetchall(),["<17","18-23","24-34","35 - 44","45 +"])
    
    
    cur.execute(q_monthly_follower_growth)
    monthly_follower_growth = convert_growth(cur.fetchall())
    
    
    cur.execute(q_daily_follower_growth)
    daily_follower_growth = convert_growth(cur.fetchall())
    
    follower_growth = {
        "Daily":daily_follower_growth,
        "Monthly":monthly_follower_growth
    }
    
    cur.execute(q_daily_buyer_growth)
    daily_buyer_growth = convert_growth(cur.fetchall())
    
    cur.execute(q_monthly_buyer_growth)
    monthly_buyer_growth = convert_growth(cur.fetchall())
    buyer_growth = {
        'Daily':daily_buyer_growth,
        'Monthly':monthly_buyer_growth
    }
    
    
    
    cur.execute(q_follower)
    follower = cur.fetchall()[0][0]
    
    cur.execute(q_buyer_count)
    buyer_count = cur.fetchall()[0][0]
    records = {
        "gender":gender,
        "buyer":buyer,
        "age":age,
        "follower_growth":follower_growth,
        'buyer_growth':buyer_growth,
        "follower":follower,
        "buyer_count":buyer_count
    }
    return jsonify(records)

@app.route('/api/product')
@cross_origin()
def product():
        # Connect to your postgres DB
    conn = psycopg2.connect(
        dbname=DATABASE,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT
    )

    # Open a cursor to perform database operations
    cur = conn.cursor()
    
    cur.execute(q_product_performance_category)
    product_performance_category = convert_product_performing_category(cur.fetchall())
    
    
    cur.execute(q_product_performance)
    product_performance = convert_product_performance(cur.fetchall())
    
    
    
    
    
    cur.execute(q_product_monthly_trend)
    product_monthly_trend = convert_product_monthly_trend(cur.fetchall())
    
    records={
        'product_monthly_trend':product_monthly_trend,
        "product_performance_category":product_performance_category,
        "product_performance":product_performance,
    }
    return jsonify(records)
    
@app.route('/api/shop')
@cross_origin()
def shop():
    conn = psycopg2.connect(
        dbname=DATABASE,
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT
    )

    # Open a cursor to perform database operations
    cur = conn.cursor()
    cur.execute(q_free_shipment)
    free_shipment = cur.fetchall()
    
    cur.execute(q_viewed_product_trend)
    view_product_trend = convert_viewed_product_trend(cur.fetchall())
    
    
    records={
        "sales_free_shipping":int(free_shipment[0][0]),
        "sales_not_free_shipping":int(free_shipment[0][1]),
        "view_product_trend":view_product_trend
    }
    return records
if __name__ == '__main__':
    app.run(debug=True)
