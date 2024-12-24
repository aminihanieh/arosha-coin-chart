import { Component } from '@angular/core';
import { CryptoChartComponent, CryptoTableComponent } from './components';
import { CryptoService } from './services/crypto.service';



@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto">
      <app-crypto-table (currencySelected)="onCurrencySelect($event)"></app-crypto-table>
      <app-crypto-chart [currencyId]="selectedCurrencyId"></app-crypto-chart>
    </div>
  `,
  standalone: true,
  imports: [CryptoTableComponent, CryptoChartComponent],
  providers: [CryptoService]
})
export class AppComponent {
  selectedCurrencyId: string | null = null;

  onCurrencySelect(currencyId: string) {
    this.selectedCurrencyId = currencyId;
  }
}
