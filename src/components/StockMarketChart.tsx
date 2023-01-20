import { useStockMarketData } from "../hooks/useStockMarketData";

export const StockMarketChart = ({
  interval,
  symbol,
  startDateFilter,
  endDateFilter,
}: {
  interval: string;
  symbol: string;
  startDateFilter: string | null;
  endDateFilter: string | null;
}) => {
  const { isSuccess, data } = useStockMarketData(symbol, interval);

  const TIME_SERIES_KEY = `Time Series (${interval})`;

  const OPEN = "1. open";
  const HIGH = "2. high";
  const LOW = "3. low";
  const CLOSE = "4. close";

  if (isSuccess && !data.data["Information"]) {
    const keys = Object.keys(data.data[TIME_SERIES_KEY]).reverse();

    const startIndex = startDateFilter
      ? keys.findIndex((key) => key === startDateFilter)
      : 0;
    const endIndex = endDateFilter
      ? keys.findIndex((key) => key === endDateFilter)
      : keys.length - 1;

    const filteredKeys = keys.slice(startIndex, endIndex);

    const chartData = filteredKeys.map((key) => {
      return [
        new Date(key).getTime(),
        Number(Number(data.data[TIME_SERIES_KEY][key][OPEN]).toFixed(2)),
        Number(Number(data.data[TIME_SERIES_KEY][key][HIGH]).toFixed(2)),
        Number(Number(data.data[TIME_SERIES_KEY][key][LOW]).toFixed(2)),
        Number(Number(data.data[TIME_SERIES_KEY][key][CLOSE]).toFixed(2)),
      ];
    });

    //@ts-ignore
    Highcharts.stockChart("container", {
      rangeSelector: {
        selected: 1,
      },

      title: {
        text: `${symbol} Stock Price`,
      },

      series: [
        {
          type: "candlestick",
          name: `${symbol} Stock Price`,
          data: chartData,
          dataGrouping: {
            units: [
              [
                "week", // unit name
                [1], // allowed multiples
              ],
              ["month", [1, 2, 3, 4, 6]],
            ],
          },
        },
      ],
    });
  }

  return null;
};
