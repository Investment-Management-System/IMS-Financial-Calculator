document.getElementById('financial-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission behavior
    updateForecast();
});

function updateForecast() {
    const initial = document.getElementById('initial').value;
    const salary = document.getElementById('salary').value;
    const budget = document.getElementById('budget').value;
    const investment = document.getElementById('investment').value;
    const deposit = document.getElementById('deposit').value;
    const returnRate = document.getElementById('returnRate').value / 100;  // Convert to decimal
    const time = document.getElementById('time').value;

    // Send a request to the backend using Fetch
    fetch('https://ims-backend-yyqt.onrender.com//api/forecast', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({initial, salary, budget, investment, deposit, returnRate, time }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Received data from backend:', data);  // Print the received data

        // Display the final wealth
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<h2>Forecast Result</h2><p>Wealth after ${time} months: ${data.final_wealth.toFixed(2)}</p>`;

        // Display the forecast chart
        const ctx = document.getElementById('resultChart').getContext('2d');
        if (window.myChart) {
            window.myChart.destroy();
        }
        window.myChart = new Chart(ctx, {
            type: 'bar',  // Change the chart type to bar chart
            data: {
                labels: Array.from({length: data.monthly_wealth.length}, (_, i) => i + 1),
                datasets: [{
                    label: 'Monthly Wealth Growth',
                    data: data.monthly_wealth,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
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
}

// Update the value of input and slider and call the update function
function syncInputAndSlider(inputId, sliderId) {
    document.getElementById(sliderId).addEventListener('input', function() {
        document.getElementById(inputId).value = this.value;
        updateForecast();
    });

    document.getElementById(inputId).addEventListener('input', function() {
        document.getElementById(sliderId).value = this.value;
        updateForecast();
    });
}

syncInputAndSlider('initial-input', 'initial');
syncInputAndSlider('salary-input', 'salary');
syncInputAndSlider('budget-input', 'budget');
syncInputAndSlider('investment-input', 'investment');
syncInputAndSlider('deposit-input', 'deposit');
syncInputAndSlider('returnRate-input', 'returnRate');
syncInputAndSlider('time-input', 'time');