document.getElementById('financial-form').addEventListener('submit', function(event) {
    event.preventDefault();  // 阻止表单默认提交行为

    const salary = document.getElementById('salary').value;
    const budget = document.getElementById('budget').value;
    const returnRate = document.getElementById('returnRate').value / 100;  // 转换为小数
    const initial = document.getElementById('initial').value;
    const time = document.getElementById('time').value;
    const investment = document.getElementById('investment').value;
    const deposit = document.getElementById('deposit').value;

    // 通过 Fetch 向后端发送请求
    fetch('http://127.0.0.1:5000/api/forecast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({initial, investment, deposit, returnRate, time }),
    })
    .then(response => response.json())
    .then(data => {
        // 显示预测结果
        document.getElementById('result').textContent = `未来财富增长为：${data.future_wealth}`;
    })
    .catch(error => console.error('Error:', error));
});
