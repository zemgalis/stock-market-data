# Stock Market Data

Approach taken:

- `useStockMarketData()` hook connects to `https://www.alphavantage.co` API
- Date range filter narrows data set selection which impacts:
- - Candlestick chart
- - Data grid
- Controls to select stock market symbol and interval

Data range filter allows to select whole data set or particular segment of the data set

Please note: API provider limits data available for some intervals

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
