import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Grid, Stack } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { StockMarketData } from "./StockMarketData";
import { StockMarketChart } from "./StockMarketChart";
import { SymbolSelector } from "../components/SymbolSelector";
import { IntervalSelector } from "../components/IntervalSelector";
import { DateFilter } from "../components/DateFilter";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

const App = () => {
  const [symbol, setSymbol] = useState("IBM");
  const [interval, setInterval] = useState("5min");
  const [startDateFilter, setStartDateFilter] = useState<string | null>(null);
  const [endDateFilter, setEndDateFilter] = useState<string | null>(null);

  const onSymbolChange = (event: any) => {
    setSymbol(event.target.value);
  };

  const onIntervalChange = (event: any) => {
    setInterval(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Grid container columnSpacing={5} rowSpacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <StockMarketChart
              interval={interval}
              symbol={symbol}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <DateFilter
              interval={interval}
              symbol={symbol}
              setStartDateFilter={setStartDateFilter}
              setEndDateFilter={setEndDateFilter}
            />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <StockMarketData
              interval={interval}
              symbol={symbol}
              startDateFilter={startDateFilter}
              endDateFilter={endDateFilter}
            />
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={2}>
              <SymbolSelector symbol={symbol} onChange={onSymbolChange} />
              <IntervalSelector
                interval={interval}
                onChange={onIntervalChange}
              />
            </Stack>
          </Grid>
        </Grid>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
