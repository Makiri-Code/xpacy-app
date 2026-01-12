import { Autocomplete, TextField } from "@mui/material";
import { CustomPaper } from "./SearchPropertyOwner";
const amenitites = [
    "Washing Machine",
    "Heat Extractor",
    "Water Heater",
    "A/C",
    "CCTV",
    "Free Wifi",
    "24 Hour Power",
    "24 Hour Security",
    "Elevator",
    "Smart Home",
    "Fully-fitted Kitchen",
    "Fully-fitted Bathrooms",
    "Garden Area",
    "Swimming Pool",
    "Fully-equiped Gym",
];

const SelectAmeneties = ({ propertyAmenities, setPropertyAmenities }) => {
  return (
    <div className="flex flex-col gap-2 font-mono">
          <span>Select Amenities</span>
          <Autocomplete
              freeSolo
              sx={{
                  bgcolor: "#fff",
                  "& .MuiInputBase-input": {
                      height: "2rem",
                  },
                  "& > div > placeholder": {
                      color: "red",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                      border: "1.5px solid #DADADA",
                      borderRadius: "8px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#DADADA",
                  },
                  "& .MuiAutocomplete-inputRoot > input::placeholder": {
                      fontFamily: "Unitext Regular",
                  },
              }}
              ChipProps={{
                  sx: {
                      bgcolor: "#E3ECF2",
                      color: "#585858",
                      fontFamily: "Unitext Regular",
                  },
              }}
              multiple
              options={amenitites}
              value={propertyAmenities}
              onBlur={(event) => !propertyAmenities.includes(event.target.value) ? event.target.value !== " " : setPropertyAmenities((prev) => [...prev, event.target.value])}
              renderInput={(params) => (
                  <TextField {...params} placeholder="Select amenities" />
              )}
              onChange={(event, newValue) => {
                  setPropertyAmenities(newValue);
              }}
              PaperComponent={CustomPaper}
          />
    </div>
  );
};

export default SelectAmeneties;