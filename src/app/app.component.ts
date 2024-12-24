import { Component } from '@angular/core';
import { CryptoService } from './services/crypto.service';
import { CryptoTableComponent } from './components/crypto-table/crypto-table.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CryptoTableComponent],
  providers: [CryptoService]
})
export class AppComponent {
  selectedCurrencyId: string | null = null;

  onCurrencySelect(currencyId: string) {
    this.selectedCurrencyId = currencyId;
  }
}
