import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-medicaments',
  templateUrl: './dashboard-medicaments.component.html',
  styleUrls: ['./dashboard-medicaments.component.css']
})
export class DashboardMedicamentsComponent implements OnInit, AfterViewInit {

  mostConsumedMedications: any[] = [];
  commandesByDate: any[] = [];
  commandesThisYear: number = 0;
  commandesCount: number = 0;
  monthlyCommandes: any[] = [];
  topMedications: any[] = [];
  pieChartData: any[] = [];

  constructor(private statisticsService: StatisticsService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadMostConsumedMedications();
    this.loadCommandesThisYear();
    this.loadMonthlyCommandes();
    this.loadTopMedications();
    this.loadPieChartData();

  }

  loadPieChartData(): void {
    this.statisticsService.getOrderStatusPieChartData().subscribe(
      data => {
        this.pieChartData = data;
        this.createPieChart(); // Call chart creation after data is loaded
      },
      error => {
        console.error('Error fetching pie chart data:', error);
      }
    );
  }

  
  createPieChart(): void {
    if (this.pieChartData.length > 0) {
      const labels = this.pieChartData.map(item => item.status);
      const data = this.pieChartData.map(item => item.count);

      new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Répartition des commandes',
            data: data,
            backgroundColor: [
              '#088395',
              '#37B7C3',
              '#071952',
         
              // Add more colors as needed
            ],
            hoverOffset: 4
          }]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const label = labels[tooltipItem.index] || '';
                  const value = data[tooltipItem.index] || '';
                  return `${label}: ${value}`;
                }
              }
            }
          }
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // Wait for the view to initialize before creating charts
    this.createMostConsumedMedicationsChart();
  }

  loadMostConsumedMedications(): void {
    this.statisticsService.getMostConsumedMedications().subscribe(data => {
      this.mostConsumedMedications = data;
      this.createMostConsumedMedicationsChart(); // Create chart after data is loaded
    });
  }

  createMostConsumedMedicationsChart(): void {
    if (this.mostConsumedMedications.length) {
      const labels = this.mostConsumedMedications.map(item => item[0]);
      const data = this.mostConsumedMedications.map(item => item[1]);
      new Chart('mostConsumedMedicationsChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Médicaments les plus consommés',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
 
  loadCommandesThisYear(): void {
    const startDate = '2024-01-01';
    const endDate = '2024-12-31';
    this.statisticsService.getCommandesByDate(startDate, endDate).subscribe(data => {
      this.commandesCount = data.reduce((total, item) => total + item[1], 0);
      this.startCommandesCounter();
    });
  }

  startCommandesCounter(): void {
    const speed = 50; // Adjust speed of counter (lower is faster)
    const increment = Math.ceil(this.commandesCount / (1000 / speed)); // Calculate increment step
    let currentCount = 0;

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= this.commandesCount) {
        currentCount = this.commandesCount;
        clearInterval(interval);
      }
      this.commandesThisYear = currentCount;
    }, speed);
  }
  loadMonthlyCommandes(): void {
    this.statisticsService.getMonthlyCommandes().subscribe(data => {
      this.monthlyCommandes = data;
      this.createMonthlyCommandesChart();
    });
  }

  loadTopMedications(): void {
    this.statisticsService.getTopMedications().subscribe(data => {
      this.topMedications = data;
      this.createTopMedicationsChart();
    });
  }
  createMonthlyCommandesChart(): void {
    if (this.monthlyCommandes.length > 0) {
      const labels = this.monthlyCommandes.map(item => this.getMonthName(item.month));
      const data = this.monthlyCommandes.map(item => item.count);

      new Chart('monthlyCommandesChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Commandes mensuelles',
            data: data,
            borderColor: '#36C2CE',
            backgroundColor: '#36C2CE',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createTopMedicationsChart(): void {
    if (this.topMedications.length > 0) {
      const labels = this.topMedications.map(item => item.titre);
      const data = this.topMedications.map(item => item.totalQuantity);

      new Chart('topMedicationsChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Top Médicaments par quantité',
            data: data,
            backgroundColor: ['#478CCF', '#4535C1', '#36C2CE', '#77E4C8'], // Example colors
            borderColor: '#36C2CE',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  private getMonthName(month: number): string {
    // Add logic to get month name from number (1 = January, 2 = February, etc.)
    return 'Mois ' + month;
  }
}

