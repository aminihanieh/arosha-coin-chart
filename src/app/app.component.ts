import { Component } from '@angular/core';
import { CryptoTableComponent } from './components';
import { CryptoService } from './services/crypto.service';



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
