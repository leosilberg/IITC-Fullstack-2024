import { Search } from "@mui/icons-material";
import {
  Card,
  CardContent,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

function Filter(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleFilterRef = useRef(null);
  function onFilterChange() {
    setSearchParams(
      titleFilterRef.current.value
        ? { search: titleFilterRef.current.value }
        : {}
    );
    props.updateFilter(titleFilterRef.current.value);
  }

  return (
    <Card>
      <CardContent>
        <TextField
          variant="outlined"
          size="small"
          inputRef={titleFilterRef}
          onChange={onFilterChange}
          defaultValue={searchParams.get("search")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
}
export default Filter;
