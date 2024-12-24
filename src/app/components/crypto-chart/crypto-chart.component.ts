import { Component, inject, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.scss'],
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  providers: [CryptoService]
})
export class CryptoChartComponent implements OnChanges {

  cryptoService: CryptoService = inject(CryptoService);

  @Input() currencyId: string | null = null;
  chartOptions: any;
  Highcharts = Highcharts;

  constructor() { }

  ngOnChanges() {
    if (this.currencyId) {
      this.fetchPriceHistory(this.currencyId);
    }
  }

  fetchPriceHistory(currencyId: string) {
    this.cryptoService.getPriceHistory(currencyId).subscribe((data: any) => {
      const prices = data.data.map((item: any) => [new Date(item.date).getTime(), parseFloat(item.priceUsd)]);
      this.chartOptions = {
        title: { text: `${currencyId} Price History` },
        series: [{ data: prices }],
        xAxis: { type: 'datetime' },
        yAxis: { title: { text: 'Price (USD)' } },
      };
    });
  }
}
