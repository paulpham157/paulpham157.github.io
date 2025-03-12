class SkillRadar {
    constructor() {
        this.data = {
            labels: [
                'Development',
                'Research',
                'Automation',
                'Management',
                'Marketplace',
                'Social'
            ],
            datasets: [
                {
                    label: 'Skill Level',
                    data: [95, 95, 88, 70, 65, 45],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }
            ]
        };

        this.config = {
            type: 'radar',
            data: this.data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        suggestedMin: 0,
                        suggestedMax: 80,
                        ticks: {
                            stepSize: 20,
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        };
        
        this.chart = null;
        this.isVisible = true;
        this.observer = null;
        this.container = null;
        this.canvas = null;
        
        this.init();
    }

    init() {
        const techSphereContainer = document.querySelector('.tech-sphere-container');
        const container = document.createElement('div');
        container.className = 'skill-radar-container';
        container.style.cssText = `
            width: 50%;
            height: 400px;
            margin-left: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;

        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin: 0 auto;
            max-width: 1240px;
            height: 400px;
            flex-direction: row;
        `;

        techSphereContainer.style.cssText = `
            width: 50%;
            height: 400px;
        `;

        techSphereContainer.parentNode.insertBefore(wrapper, techSphereContainer);
        wrapper.appendChild(techSphereContainer);
        wrapper.appendChild(container);

        this.container = container;
        this.canvas = document.createElement('canvas');
        container.appendChild(this.canvas);

        // Thêm chú thích
        const legend = document.createElement('div');
        legend.style.cssText = `
            margin-top: 15px;
            font-size: 12px;
            color: #666;
            text-align: center;
        `;
        container.appendChild(legend);

        // Thêm Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                this.handleVisibilityChange();
            });
        }, { threshold: 0.1 });

        this.observer.observe(this.container);

        this.createChart();
    }

    createChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvas, this.config);
    }

    handleVisibilityChange() {
        if (!this.isVisible) {
            this.destroyChart();
        } else {
            this.createChart();
        }
    }

    destroyChart() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    }

    destroy() {
        this.destroyChart();
        this.observer.disconnect();
        this.container.remove();
    }

    calculateTotal() {
        return this.data.datasets[0].data.reduce((a, b) => a + b, 0);
    }
}

// Khởi tạo khi trang đã load
window.addEventListener('DOMContentLoaded', () => {
    const skillRadar = new SkillRadar();
    // Thêm sự kiện cleanup khi cần
    window.skillRadarInstance = skillRadar;
});
