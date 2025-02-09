from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
app = Flask(__name__)
CORS(app)  # 解决跨域问题

# 计算未来财富的函数
def calculate_future_wealth(salary, budget, return_rate):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Lbjloves120418",
        database="IMS",
    )
    cursor = conn.cursor()

    monthly_investment = float(salary) - float(budget)
    future_wealth = monthly_investment * ((1 + return_rate) ** 12)  # 简单的年增长计算
    return future_wealth

# 定义API路由，处理前端发送的POST请求
@app.route('/api/forecast', methods=['POST'])
def forecast():
    data = request.get_json()
    print(f"Received data from frontend: {data}")  # 打印接收到的数据
    salary = data.get('salary')
    budget = data.get('budget')
    return_rate = data.get('returnRate')

    if not salary or not budget or not return_rate:
        return jsonify({'error': 'Invalid input'}), 400

    future_wealth = calculate_future_wealth(salary, budget, return_rate)
    return jsonify({'future_wealth': future_wealth})


if __name__ == '__main__':
    app.run(debug=True)
