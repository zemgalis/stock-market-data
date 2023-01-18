import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const SymbolSelector = ({
  symbol,
  onChange,
}: {
  symbol: string;
  onChange: (event: any) => void;
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={symbol}
        label="Symbol"
        onChange={onChange}
      >
        <MenuItem value={"IBM"}>IBM</MenuItem>
        <MenuItem value={"MSFT"}>Microsoft</MenuItem>
      </Select>
    </FormControl>
  );
};
