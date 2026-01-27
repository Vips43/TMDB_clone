import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { keywords } from "../../oth/js_files/api";
import useNavStore from "./NavStore";
import { Collapse, Fade, Grow } from "@mui/material";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

function Genres({ path, type = null, select, setSelect }) {
 const setSearchData = useNavStore((state) => state.setSearchData);

 const [expanded, setExpanded] = useState(false);
 let [data, setData] = useState(null);
 let [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;

  const getData = async () => {
   setIsLoading(true);
   try {
    const result = await keywords(path, { signal });
    setIsLoading(false);

    setData(result);
   } catch (error) {
    console.error("fetch error:", error);
   } finally {
    if (!signal.aborted) setIsLoading(false);
   }
  };
  getData();
  return () => {
   controller.abort();
   setData(null);
  };
 }, [path]);

 useEffect(() => {
  if (!Array.isArray(select) || select.length === 0) {
   setSearchData({ with_genres: null });
  } else {
   setSearchData({ with_genres: select.join(",") });
  }
 }, [select, setSearchData]);

 const handleClick = (name) => {
  setSelect((prev) =>
   prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
  );
 };

 return (
  <Box
   sx={{
    borderRadius: 2,
    px: 1,
    height: "fit-content",
   }}
  >
   <Box
    onClick={() => setExpanded(!expanded)}
    sx={{
     display: "flex",
     alignItems: "center",
     justifyContent: "space-between",
     py: 0.5,
     px: 1,
     border: "1px solid lightgrey",
     borderRadius: "5px",
    }}
   >
    <Typography
     variant="overline"
     sx={{
      fontWeight: 600,
     }}
    >
     Genres
    </Typography>
    {expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
   </Box>

   <Collapse in={expanded} timeout="auto">
    {!data ? "No data for keywords" : ""}
    <Box
     sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 1,
      mt: 2,
     }}
    >
     {isLoading ? (
      <div className="p-2 grid place-items-center animate-pulse">
       Loading...
      </div>
     ) : (
      ""
     )}

     {data &&
      data?.genres.map((k) => {
       const isSelected = select?.includes(k.id);
       return (
        <Grow key={k.id} in={expanded} {...(expanded ? { timeout: 800 } : {})}>
         <Chip
          label={k.name}
          size="small"
          onClick={() => handleClick(k.id)}
          sx={{
           backgroundColor: isSelected ? "primary.main" : "#2c2c2c",
           color: isSelected ? "black" : "#fff",
           fontSize: "0.75rem",
           "&:hover": {
            backgroundColor: isSelected ? "primary.main" : "#2c2c2c",
            color: isSelected ? "black" : "#fff",
           },
          }}
         />
        </Grow>
       );
      })}
    </Box>
   </Collapse>
  </Box>
 );
}

export default Genres;
