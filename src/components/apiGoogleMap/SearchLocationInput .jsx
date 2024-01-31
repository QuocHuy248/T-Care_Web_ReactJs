import { useRef, useEffect, useState } from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./SearchLocationInput.css";
import { minWidth } from "@mui/system";
const SearchLocationInput = ({
  setSelectedLocation,
  setPlace,
  title,
  marginTest,
  resetInputAddress,
  children,
  onKmChange,
  onQueryChange,
  defaultValue,
  km,setKm, checkButton
}) => {
  const autoCompleteRef = useRef();

  const inputRef = useRef();
  const [query, setQuery] = useState(defaultValue || "");
  const handleScriptLoad = (updateQuery) => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "VN" },
    });

    autoCompleteRef.current.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };
  useEffect(() => {
    setQuery("");
  }, [resetInputAddress]);

  useEffect(() => {
    setQuery(defaultValue)
  }, [defaultValue])
  
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    if (onQueryChange) {
      onQueryChange(inputValue);
    }
    
  };
  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoCompleteRef.current.getPlace();

    if (addressObject && addressObject.formatted_address) {
      setPlace(addressObject.formatted_address);
      const selectedQuery = addressObject.formatted_address;
      updateQuery(selectedQuery);

      const latLng = {
        lat: addressObject?.geometry?.location?.lat(),
        lng: addressObject?.geometry?.location?.lng(),
      };

      setSelectedLocation(latLng);
    } else {
      console.error("Invalid addressObject:", addressObject);
    }
  };
  useEffect(() => {
    handleScriptLoad(setQuery);
  }, []);

  const handleChange = (event) => {

    let newAge = event.target.value;
    setKm(newAge);
  if (onKmChange) {
    onKmChange(newAge);
  }
  };
  return (
    <div className="search-location-input">
      {!children ? (
        <label htmlFor="inputSearchAddress" className="pointer">
          <h3>{title || "Bạn sống ở đâu?"} </h3>
        </label>
      ) : (
        <div className="d-flex justify-content-between">
          <h6>Bạn cần chăm sóc ở đâu ?</h6>
          <div className="d-flex ">
            <FormControl fullWidth sx={{minWidth:100}}>
              <InputLabel id="demo-simple-select-label" className={`input-index-user${km!= "" ?"acitve":""}`}>Km</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="select-index-user"
                value={km}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      <div className="d-flex" style={{ margin: marginTest || "15px 20% 0 20%" }} >
        <input
          style={{ cursor: "pointer" }}
          ref={inputRef}
          className="form-control"
          onChange={handleInputChange}
          placeholder="Tìm kiếm địa điểm"
          value={query}
          id="inputSearchAddress"
        />
        <label htmlFor="inputSearchAddress" className="pointer">
          <AddLocationIcon className="m-700-25" />
        </label>
      </div>
    </div>
  );
};
export default SearchLocationInput;
