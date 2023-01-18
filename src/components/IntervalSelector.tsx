import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const IntervalSelector = ({
  interval,
  onChange,
}: {
  interval: string;
  onChange: (event: any) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Interval</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={interval}
        label="Interval"
        onChange={onChange}
      >
        <MenuItem value={"1min"}>1 minutes</MenuItem>
        <MenuItem value={"5min"}>5 minutes</MenuItem>
        <MenuItem value={"15min"}>15 minutes</MenuItem>
        <MenuItem value={"30min"}>30 minutes</MenuItem>
        <MenuItem value={"60min"}>1 hour</MenuItem>
      </Select>
    </FormControl>
  );
};
