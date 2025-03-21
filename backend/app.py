from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 解决跨域问题

# 计算未来财富的函数
def calculate_future_wealth(initial, investment, deposit, return_rate, time):
    monthly_wealth = []
    current_wealth = initial

    for month in range(time):
        current_wealth = current_wealth * (1 + return_rate) + investment + deposit
        monthly_wealth.append(current_wealth)

    final_wealth = current_wealth
    return monthly_wealth, final_wealth

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

    monthly_wealth, final_wealth = calculate_future_wealth(initial, investment, deposit, return_rate, time)
    print(f"Calculated monthly wealth: {monthly_wealth}")  # 打印计算结果
    print(f"Final wealth after {time} months: {final_wealth}")  # 打印最终财富
    return jsonify({'monthly_wealth': monthly_wealth, 'final_wealth': final_wealth})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)