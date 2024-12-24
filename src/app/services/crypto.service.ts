import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CryptoService {
  private apiUrl = 'https://api.coincap.io/v2/assets';

  constructor(private http: HttpClient) { }

  getCryptocurrencies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPriceHistory(currencyId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${currencyId}/history?interval=d1`);
  }
}
