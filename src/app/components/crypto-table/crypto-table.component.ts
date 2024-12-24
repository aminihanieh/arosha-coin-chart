import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  providers: [CryptoService]
})
export class CryptoTableComponent implements OnInit {
  cryptocurrencies: any[] = [];
  @Output() currencySelected = new EventEmitter<string>();
  cryptoService: CryptoService = inject(CryptoService);

  constructor() {}

  ngOnInit() {
    this.fetchCryptocurrencies();
  }

  fetchCryptocurrencies() {
    this.cryptoService.getCryptocurrencies().subscribe((data: any) => {
      this.cryptocurrencies = data.data;
    });
  }

  onSelectCurrency(currency: string) {
    this.currencySelected.emit(currency);
  }
}
