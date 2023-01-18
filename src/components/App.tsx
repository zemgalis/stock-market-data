import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Grid, Card } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { StockMarketData } from "./StockMarketData";

import { SymbolSelector } from "../components/SymbolSelector";
import { IntervalSelector } from "../components/IntervalSelector";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

const App = () => {
  const [symbol, setSymbol] = useState("IBM");
  const [interval, setInterval] = useState("5min");

  const onSymbolChange = (event: any) => {
    setSymbol(event.target.value);
  };

  const onIntervalChange = (event: any) => {
    setInterval(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Grid container rowGap={2}>
          <Grid
            sx={{
              padding: "30px",
              color: "primary.main",
              textAlign: "center",
              fontSize: "30px",
            }}
            item
            xs={12}
          >
            Stock Market Data
          </Grid>
          <Grid item xs={7}>
            <StockMarketData interval={interval} symbol={symbol} />
          </Grid>
          <Grid item xs={4}>
            <SymbolSelector symbol={symbol} onChange={onSymbolChange} />
            <IntervalSelector interval={interval} onChange={onIntervalChange} />

            <Card>card details</Card>
          </Grid>
        </Grid>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
