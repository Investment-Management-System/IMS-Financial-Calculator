document.getElementById('financial-form').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止表单默认提交行为

    const salary = document.getElementById('salary').value;
    const budget = document.getElementById('budget').value;
    const returnRate = document.getElementById('returnRate').value / 100;  // 转换为小数

    // 通过 Fetch 向后端发送请求
    fetch('http://127.0.0.1:5000/api/forecast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ salary, budget, returnRate }),
    })
    .then(response => response.json())
    .then(data => {
        // 显示预测结果
        document.getElementById('result').textContent = `未来财富增长为：${data.future_wealth}`;
    })
    .catch(error => console.error('Error:', error));
});
