from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 解决跨域问题

# 计算未来财富的函数
def calculate_future_wealth(initial, investment, deposit, return_rate, time):
    # 初始投资的增长
    initial_wealth_future = initial * (1 + return_rate) ** time

    # 每月投资的增长
    investment_future = 0
    for i in range(time):
        investment_future += investment * (1 + return_rate) ** (time - i - 1)

    # 每月存款的累积
    deposit_future = deposit * time

    # 计算总财富
    total_wealth = initial_wealth_future + investment_future + deposit_future

    return total_wealth

# 定义API路由，处理前端发送的POST请求
@app.route('/api/forecast', methods=['POST'])
def forecast():
    data = request.get_json()
    print(f"Received data from frontend: {data}")  # 打印接收到的数据
    initial = data.get('initial')
    investment = data.get('investment')
    deposit = data.get('deposit')
    return_rate = data.get('returnRate')
    time = data.get('time')

    if not initial or not investment or not deposit or not time or not return_rate:
        return jsonify({'error': 'Invalid input'}), 400

    # 将所有输入转换为浮点数进行计算
    initial = float(initial)
    investment = float(investment)
    deposit = float(deposit)
    return_rate = float(return_rate)
    time = int(time)

    future_wealth = calculate_future_wealth(initial, investment, deposit, return_rate, time)
    return jsonify({'future_wealth': future_wealth})

if __name__ == '__main__':
    app.run(debug=True)


