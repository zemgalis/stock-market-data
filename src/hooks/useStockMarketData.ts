import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useStockMarketData = (symbol: string, interval: string) => {
  const url = "https://www.alphavantage.co/";
  const queryParams = `query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=demo`;

  const query = useQuery({
    queryKey: [symbol, interval],
    queryFn: () => {
      return axios.get(`${url}${queryParams}`);
    },
  });

  return query;
};
