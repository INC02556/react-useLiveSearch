import "./App.css";
import useLiveSearch from "./useLiveSearch";
import { Autocomplete, TextField ,Box } from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getProducts } from "./api";


function App() {
  const [productOptions, productLoading, handleChangeProduct] = useLiveSearch(getProducts);
  const [Products,setProducts] = useState({})
  const handleChangeInput = (value,name) =>{
    setProducts({...Products,[name]: value})
  }

  return (
    <div className="App">
      <div>
        <label className="mb-2 ">product</label>
        <Autocomplete
          disablePortal
          onChange={(e, value) =>
            handleChangeInput(value?.title, "title")
          }
          options={productOptions?.products || []}
          loading={productLoading}
          size="small"
          sx={{ marginTop: "15px" }}
          getOptionLabel={(option) => option?.title || ""}
          getOptionValue={(option) => option?.title || ""}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option?.title}({option?.brand})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  handleChangeProduct(e.target.value)
                }
              }}
              placeholder="Product"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {productLoading ? (
                      <CircularProgress color="inherit" size={16} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          noOptionsText="No Products"
        />
      </div>
    </div>
  );
}

export default App;
