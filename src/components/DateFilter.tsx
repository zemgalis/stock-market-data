import { useState } from "react";
import { Slider } from "@mui/material";
import { useStockMarketData } from "../hooks/useStockMarketData";

export const DateFilter = ({
  interval,
  symbol,
  setStartDateFilter,
  setEndDateFilter,
}: {
  interval: string;
  symbol: string;
  setStartDateFilter: (key: string) => void;
  setEndDateFilter: (key: string) => void;
}) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const value = [start, end];
  let dateRangePerStep = 0;

  const { isSuccess, data } = useStockMarketData(symbol, interval);

  const TIME_SERIES_KEY = `Time Series (${interval})`;

  const dateSliderIndexMap = new Map();

  if (isSuccess && !data.data["Information"]) {
    const keys = Object.keys(data.data[TIME_SERIES_KEY]);
    const length = keys.length;
    dateRangePerStep = Math.floor(length / 100);

    for (let index = 0; index < 100; index++) {
      dateSliderIndexMap.set(index, keys[index * dateRangePerStep]);
    }

    dateSliderIndexMap.set(100, keys[keys.length - 1]);
  }

  const handleChange = (_: Event, value: any) => {
    const [startPosition, endPosition] = value;
    setStartDateFilter(dateSliderIndexMap.get(startPosition));
    setEndDateFilter(dateSliderIndexMap.get(endPosition));
    setStart(startPosition);
    setEnd(endPosition);
  };

  const valueLabelFormat = (position: number) => {
    return dateSliderIndexMap.get(position);
  };

  return (
    <Slider
      getAriaLabel={() => "Date range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      valueLabelFormat={valueLabelFormat}
    />
  );
};
