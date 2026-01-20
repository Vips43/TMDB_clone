import { Box, Chip, Typography } from "@mui/material";
import React from "react";

function SearchKeyword({movie}) {

 return (
  <>
   <Box
    sx={{
     border: "1px solid #2f2f2f",
     borderRadius: 2,
     p: 2,
     background: "#1f1f1f",
    }}
   >
    <Typography
     variant="subtitle1"
     sx={{
      fontWeight: 600,
      mb: 1,
      opacity: 0.8,
      color: "white",
     }}
    >
     Keywords
    </Typography>

    <Box
     sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 1,
     }}
    >
     {movie.results.map((k) => (
      <Chip
       key={k.id}
       label={k.name}
       size="small"
       sx={{
        backgroundColor: "#2c2c2c",
        color: "#fff",
        fontSize: "0.75rem",
        "&:hover": {
         backgroundColor: "#3a3a3a",
        },
       }}
      />
     ))}
    </Box>
   </Box>
  </>
 );
}

export default SearchKeyword;
