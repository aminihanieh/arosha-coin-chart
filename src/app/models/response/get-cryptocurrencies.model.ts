import { Cryptocurrency } from "./cryptocurrency.model";

export interface GetCryptocurrencies {
  data: Cryptocurrency[],
  timestamp: number
}
