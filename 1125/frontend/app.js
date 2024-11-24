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
        console.log('Received data from backend:', data);  // 打印接收到的数据

        // 显示最终财富
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<h2>预测结果</h2><p>${time}个月后的财富: ${data.final_wealth.toFixed(2)}</p>`;

        // 显示预测结果
        const ctx = document.getElementById('resultChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: data.monthly_wealth.length}, (_, i) => i + 1),
                datasets: [{
                    label: 'Monthly Wealth Growth',
                    data: data.monthly_wealth,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Wealth'
                        }
                    }
                }
            }
        });
    })
    .catch(error => console.error('Error:', error));
});