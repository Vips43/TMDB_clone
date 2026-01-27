import { Button } from "@mui/material";
import useNavStore from "./NavStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SearchBtn() {
 const { type } = useParams();

 const searchData = useNavStore((state) => state.searchData);
 const fetchSearches = useNavStore((state) => state.fetchSearches);

 const handleClick = () => {
  const filtered = Object.fromEntries(
   Object.entries(searchData).filter(([_, d]) => d !== null && d !== ""),
  );

  const query = new URLSearchParams(filtered).toString();

  console.log("Filtered:", filtered);
  console.log("Query:", query);

  fetchSearches(type, query);
 };

 return (
  <>
   <Button
    variant="contained"
    sx={{ m: 2, width: "auto" }}
    onClick={handleClick}
   >
    Search
   </Button>
  </>
 );
}

export default SearchBtn;
