import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import { StockMarketData } from "./StockMarketData";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <StockMarketData />
      </div>
    </QueryClientProvider>
  );
};

export default App;
