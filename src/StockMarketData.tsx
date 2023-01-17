import { useStockMarketData } from "./hooks/useStockMarketData";

export const StockMarketData = () => {
  const { isSuccess, data } = useStockMarketData("IBM", "5min");

  if (isSuccess) {
    console.log(data.data['Time Series (5min)']);
  }

  return <p>Stock Market Data</p>;
};
