import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Selector({
  selected,
  setSelected,
  country,
  c = false,
  sort_by,
  s = false,
}) {
  const validValues = [
    ...(country?.map((c) => c.iso_3166_1) || []),
    ...(sort_by?.map((s) => s.key) || []),
    "",
  ];

  const safeValue = validValues.includes(selected) ? selected : "";

  return (
    <FormControl fullWidth sx={{ m: 2, maxWidth: 200 }} size="small">
      <InputLabel>{country ? "Country" : "sort by"}</InputLabel>

      <Select
        value={safeValue}
        label={c ? "Country" : "Sort-by"}
        onChange={(e) => setSelected(e.target.value)}
        sx={{ fontSize: ".8rem" }}
      >
        <MenuItem value="">Select value</MenuItem>

        {country &&
          country.map((c) => (
            <MenuItem
              key={c.iso_3166_1}
              value={c.iso_3166_1}
              sx={{ fontSize: ".8rem" }}
            >
              {c.english_name}
            </MenuItem>
          ))}

        {sort_by &&
          sort_by.map((c) => (
            <MenuItem key={c.key} value={c.key} sx={{ fontSize: ".8rem" }}>
              {c.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default Selector;
