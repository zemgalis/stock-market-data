import { useStockMarketData } from "../hooks/useStockMarketData";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";

export const StockMarketData = ({
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

  let rows: GridRowsProp = [];

  const OPEN = "1. open";
  const HIGH = "2. high";
  const LOW = "3. low";
  const CLOSE = "4. close";
  const VOLUME = "5. volume";

  const TIME_SERIES_KEY = `Time Series (${interval})`;

  if (isSuccess && !data.data["Information"]) {
    const keys = Object.keys(data.data[TIME_SERIES_KEY]).reverse();

    const startIndex = startDateFilter
      ? keys.findIndex((key) => key === startDateFilter)
      : 0;
    const endIndex = endDateFilter
      ? keys.findIndex((key) => key === endDateFilter)
      : keys.length - 1;

    const filteredKeys = keys.slice(startIndex, endIndex);

    rows = filteredKeys.map((key, index) => {
      return {
        id: key,
        col1: index + 1,
        col2: new Date(key).toLocaleString(),
        col3: data.data[TIME_SERIES_KEY][key][OPEN],
        col4: data.data[TIME_SERIES_KEY][key][HIGH],
        col5: data.data[TIME_SERIES_KEY][key][LOW],
        col6: data.data[TIME_SERIES_KEY][key][CLOSE],
        col7: data.data[TIME_SERIES_KEY][key][VOLUME],
      };
    });
  } else {
    rows = [];
  }

  const columns: GridColDef[] = [
    { field: "col1", headerName: "ID", width: 100 },
    { field: "col2", headerName: "Time", width: 180 },
    { field: "col3", headerName: "Open", width: 100 },
    { field: "col4", headerName: "High", width: 100 },
    { field: "col5", headerName: "Low", width: 100 },
    { field: "col6", headerName: "Close", width: 100 },
    { field: "col7", headerName: "Volume", width: 100 },
  ];

  return (
    <div style={{ height: 370, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
