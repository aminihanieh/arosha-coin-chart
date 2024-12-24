import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CryptoService } from '../../services/crypto.service';
import { CommonModule } from '@angular/common';
import { Cryptocurrency, GetCryptocurrencies } from '../../models/response';
import { CryptoChartComponent } from '../crypto-chart/crypto-chart.component';
@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.scss'],
  standalone: true,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule, CryptoChartComponent],
  providers: [CryptoService]
})
export class CryptoTableComponent implements OnInit {
  cryptoService: CryptoService = inject(CryptoService);

  cryptocurrencies: Cryptocurrency[] = [];
  dataSource = new MatTableDataSource<Cryptocurrency>(this.cryptocurrencies);
  columnsToDisplayWithExpand = ['rank', 'name', 'symbol', 'priceUsd', 'marketCapUsd', 'volumeUsd24Hr', 'expand'];

  expandedElement: Cryptocurrency | null = null;
  loading = true;
  error: string | null = null;

  @Output() currencySelected = new EventEmitter<string>();


  ngOnInit() {
    this.fetchCryptocurrencies();
  }

  fetchCryptocurrencies() {
    this.cryptoService.getCryptocurrencies().subscribe({
      next: (data: GetCryptocurrencies) => {
        this.cryptocurrencies = data.data;
        this.dataSource.data = this.cryptocurrencies;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load cryptocurrencies. Please try again later.';
        this.loading = false;
      }
    });
  }


  onSelectCurrency(currency: string) {
    this.currencySelected.emit(currency);
  }
}


