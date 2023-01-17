import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Grid } from "@mui/material";

import { StockMarketData } from "./StockMarketData";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid container>
        <Grid
          sx={{
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
          <StockMarketData />
        </Grid>
      </Grid>
    </QueryClientProvider>
  );
};

export default App;
