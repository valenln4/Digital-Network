document.addEventListener('DOMContentLoaded', function() {
  const statsContainer = document.getElementById('statsContainer');
  
  setTimeout(() => {
    const statsData = [
      { title: "Horas promedio en redes", value: "2h 45m", trend: "up" },
      { title: "Usuarios activos diarios", value: "4.8B", trend: "up" },
      { title: "Ansiedad relacionada", value: "42%", trend: "up" },
      { title: "Verificación de datos", value: "64%", trend: "down" }
    ];
    
    renderStats(statsData);
  }, 1500);
  
  function renderStats(data) {
    statsContainer.innerHTML = `
      <div class="row">
        ${data.map(item => `
          <div class="col-6 col-md-3 mb-4">
            <div class="stat-card">
              <h3 class="stat-value">${item.value}</h3>
              <p class="stat-title">${item.title}</p>
              <div class="stat-trend ${item.trend}">
                <i class="fas fa-arrow-${item.trend === 'up' ? 'up' : 'down'}"></i>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      <a href="estadisticas.html" class="btn btn-sm btn-outline-primary">Ver más estadísticas</a>
    `;
  }
});


//

document.addEventListener('DOMContentLoaded', function() {
    let currentChart = null;
    const chartElement = document.getElementById('mainChart');
    const chartTitle = document.getElementById('chartTitle');
    const chartSource = document.getElementById('chartSource');
    const chartSelector = document.getElementById('chartSelector');

    const chartsData = {
        usage: {
            title: "Uso Diario Promedio",
            source: "Fuente: Digital Report 2023 - We Are Social",
            type: "line",
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Minutos por día',
                    data: [135, 142, 158, 168, 175, 182],
                    backgroundColor: 'rgba(222, 56, 156, 0.1)',
                    borderColor: 'rgba(222, 56, 156, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 130
                    }
                }
            }
        },
        platforms: {
            title: "Redes Más Usadas",
            source: "Fuente: Estudio Global 2023 - Hootsuite",
            type: "doughnut",
            data: {
                labels: ['WhatsApp', 'Instagram', 'Facebook', 'TikTok', 'Twitter'],
                datasets: [{
                    data: [78, 72, 65, 58, 42],
                    backgroundColor: [
                        'rgba(222, 56, 156, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                },
                cutout: '65%'
            }
        },
        health: {
            title: "Efectos en Salud Mental",
            source: "Fuente: Universidad de Pensilvania (2023)",
            type: "bar",
            data: {
                labels: ['Ansiedad', 'Depresión', 'Baja autoestima', 'Trastorno sueño', 'FOMO'],
                datasets: [{
                    label: 'Incremento %',
                    data: [42, 38, 35, 29, 27],
                    backgroundColor: 'rgba(222, 56, 156, 0.5)',
                    borderColor: 'rgba(222, 56, 156, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        },
        attention: {
            title: "Tiempo de Atención",
            source: "Fuente: Microsoft Attention Span Research",
            type: "line",
            data: {
                labels: ['2000', '2008', '2013', '2018', '2023'],
                datasets: [{
                    label: 'Segundos de atención promedio',
                    data: [12, 10, 8, 6.5, 5.3],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        }
    };


    function renderChart(chartKey) {
        if (currentChart) {
            currentChart.destroy();
        }

        const chartConfig = chartsData[chartKey];
        
        chartTitle.textContent = chartConfig.title;
        chartSource.textContent = chartConfig.source;
        
        currentChart = new Chart(
            chartElement.getContext('2d'),
            {
                type: chartConfig.type,
                data: chartConfig.data,
                options: chartConfig.options
            }
        );
    }

    chartSelector.addEventListener('change', function() {
        renderChart(this.value);
    });

    renderChart('usage');

    window.addEventListener('resize', function() {
        if (currentChart) {
            currentChart.resize();
        }
    });
});

