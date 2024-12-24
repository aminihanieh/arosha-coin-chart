import { Component, inject, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import { CryptoService } from '../../../services/crypto.service';
import { PriceHistory } from '../../../models/response';

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

  loading: boolean = false;
  chartOptions: any;
  Highcharts = Highcharts;

  private _currencyId: string | null = null;
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
    this.loading = true;
    this.cryptoService.getPriceHistory(currencyId).subscribe({
      next: (data: PriceHistory[]) => {
        this.generateHighChart(data, currencyId);
      },
      error: (err) => {
        console.error('Error fetching price history:', err);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private generateHighChart(data: PriceHistory[], currencyId: string) {
    const prices = data.map((item: PriceHistory) => [
      new Date(item.time).getTime(),
      parseFloat(item.priceUsd),
    ]);

    this.chartOptions = {
      chart: {
        height: 450,
        width: null,
      },
      title: {
        text: `${currencyId} Price History (Last 12 Hours)`
      },
      legend: {
        enabled: false
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
  }
}
