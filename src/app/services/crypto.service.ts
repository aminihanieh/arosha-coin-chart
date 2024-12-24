import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cryptocurrency, GeneralResponse, PriceHistory } from '../models/response';

@Injectable()
export class CryptoService {
  private apiUrl = 'https://api.coincap.io/v2/assets';

  constructor(private http: HttpClient) { }

  getCryptocurrencies(): Observable<Cryptocurrency[]> {
    return this.http.get<GeneralResponse<Cryptocurrency>>(this.apiUrl).pipe(map(_ => _.data));
  }

  getPriceHistory(currencyId: string): Observable<PriceHistory[]> {
    return this.http.get<GeneralResponse<PriceHistory>>(`${this.apiUrl}/${currencyId}/history?interval=m1`).pipe(map(_ => _.data));
  }
}
