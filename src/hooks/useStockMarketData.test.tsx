import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";

import { useStockMarketData } from "./useStockMarketData";

jest.mock("axios");

describe("Hooks: useStockMarketData", () => {
  it("returns market data", async () => {
    const mockData = {
      "Meta Data": {
        "1. Information":
          "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "MOCK_STOCK_SYMBOL",
        "3. Last Refreshed": "2023-01-13 16:30:00",
        "4. Interval": "5min",
        "5. Output Size": "Full size",
        "6. Time Zone": "US/Eastern",
      },
      "Time Series (5min)": {
        "2023-01-13 16:30:00": {
          "1. open": "145.6000",
          "2. high": "145.6000",
          "3. low": "145.6000",
          "4. close": "145.6000",
          "5. volume": "223",
        },
      },
    };

    axios.get = jest.fn().mockResolvedValue({ data: mockData });

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(
      () => useStockMarketData("MOCK_STOCK_SYMBOL", "MOCK_INTERVAL"),
      { wrapper }
    );

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MOCK_STOCK_SYMBOL&interval=MOCK_INTERVAL&outputsize=full&apikey=demo"
    );
  });
});
