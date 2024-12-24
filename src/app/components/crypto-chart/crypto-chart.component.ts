import { Component, inject, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CryptoService } from '../../services/crypto.service';
import { PriceHistory } from '../../models/response';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule, MatProgressSpinnerModule],
  providers: [CryptoService],
})
export class CryptoChartComponent {
  cryptoService: CryptoService = inject(CryptoService);

  private _currencyId: string | null = null;
  loading = false; // Spinner loading state
  chartOptions: any;
  Highcharts = Highcharts;

  @Input()
  get currencyId(): string | null {
    return this._currencyId;
  }
  set currencyId(value: string | null) {
    this._currencyId = value;
    if (value) {
      this.fetchPriceHistory(value);
    }
  }

  fetchPriceHistory(currencyId: string) {
    this.loading = true; // Start loading spinner
    this.cryptoService.getPriceHistory(currencyId).subscribe({
      next: (data: PriceHistory[]) => {
        const prices = data.map((item: PriceHistory) => [
          new Date(item.time).getTime(),
          parseFloat(item.priceUsd),
        ]);

        this.chartOptions = {
          chart: {
            height: 250,
            width: null, // Responsive width
          },
          title: {
            text: `${currencyId} Price History (Last 12 Hours)`
          },
          legend: {
            enabled: false  // Disable the legend
          },
          series: [{
            name: currencyId,
            data: prices,
            tooltip: {
              valueDecimals: 2
            },
            color: '#007bff',
            connectNulls: true,
          }],
          xAxis: {
            type: 'datetime',
            title: { text: 'Time' },
            tickInterval: 3600 * 1000,
            dateTimeLabelFormats: {
              hour: '%H:%M'
            }
          },
          yAxis: {
            title: { text: 'Price (USD)' },
          },
          tooltip: {
            shared: true,
            crosshairs: true
          },
          plotOptions: {
            series: {
              lineWidth: 2
            }
          }
        };

      },
      error: (err) => {
        console.error('Error fetching price history:', err);
      },
      complete: () => {
        this.loading = false; // Stop loading spinner
      },
    });
  }
}
