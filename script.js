
const data = [
    { "VIN": "1HGCM82633A123456", "County": "Los Angeles", "City": "Los Angeles", "State": "CA", "Model Year": 2023, "Make": "Tesla", "Model": "Model 3", "Electric Range": 353, "Base MSRP": 39990 },
    { "VIN": "1FMCU0J90KUB12345", "County": "Cook", "City": "Chicago", "State": "IL", "Model Year": 2022, "Make": "Ford", "Model": "Mustang Mach-E", "Electric Range": 300, "Base MSRP": 42995 },
    { "VIN": "1N4BL4BV9LC123456", "County": "Miami-Dade", "City": "Miami", "State": "FL", "Model Year": 2023, "Make": "Nissan", "Model": "Leaf", "Electric Range": 226, "Base MSRP": 31490 },
    { "VIN": "5YJSA1E26MF123456", "County": "Santa Clara", "City": "San Jose", "State": "CA", "Model Year": 2022, "Make": "Tesla", "Model": "Model S", "Electric Range": 405, "Base MSRP": 89990 },
    { "VIN": "3FADP4EJ7KL123456", "County": "Harris", "City": "Houston", "State": "TX", "Model Year": 2021, "Make": "Ford", "Model": "Fiesta", "Electric Range": 0, "Base MSRP": 19900 },
    { "VIN": "1HGCV1F30JA123456", "County": "King", "City": "Seattle", "State": "WA", "Model Year": 2021, "Make": "Honda", "Model": "Clarity", "Electric Range": 47, "Base MSRP": 33600 }
];


let salesChart;
let engagementChart;


function createSalesChart(data) {
    const labels = data.map(item => item.Make);  
    const electricRange = data.map(item => item["Electric Range"]);

    const ctx = document.getElementById('salesChart').getContext('2d');
    if (salesChart) {
        salesChart.destroy(); 
    }
    salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Electric Range (miles)',
                data: electricRange,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Electric Range (miles)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Vehicle Make'
                    }
                }
            }
        }
    });
}


function createEngagementChart(data) {
    const labels = data.map(item => item.Make);
    const userEngagement = data.map(item => Math.floor(Math.random() * 100));  

    const ctx = document.getElementById('engagementChart').getContext('2d');
    if (engagementChart) {
        engagementChart.destroy();
    }
    engagementChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'User Engagement',
                data: userEngagement,
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Engagement Score'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Vehicle Make'
                    }
                }
            }
        }
    });
}


function updateDisplay(selectedBrand) {
    const filteredData = selectedBrand === 'all' ? data : data.filter(item => item.Make === selectedBrand);

    
    createSalesChart(filteredData);
    createEngagementChart(filteredData);

  
    const tableBody = document.getElementById('dataTable').querySelector('tbody');
    tableBody.innerHTML = ''; 
    filteredData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.VIN}</td>
            <td>${item.County}</td>
            <td>${item.City}</td>
            <td>${item.State}</td>
            <td>${item["Model Year"]}</td>
            <td>${item.Make}</td>
            <td>${item.Model}</td>
            <td>${item["Electric Range"]}</td>
            <td>${item["Base MSRP"]}</td>
        `;
        tableBody.appendChild(row);
    });
}


document.getElementById('stateFilter').addEventListener('change', (event) => {
    updateDisplay(event.target.value);
});


updateDisplay('all');
