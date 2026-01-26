import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { keywords } from "../oth/js_files/api";
import useNavStore from "../navbar_component/compo/NavStore";

function Keywords({ path, type = null, genre = false }) {
 const setSearchData = useNavStore((state) => state.setSearchData);

 const { id } = useParams();
 let [keys, setKeys] = useState(null);
 const [select, setSelect] = useState([]);
 let [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;

  const getData = async () => {
   setIsLoading(true);
   try {
    const data = await keywords(path, { signal });
    setIsLoading(false);
    setKeys(data);
   } catch (error) {
    console.error("fetch error:", error);
   } finally {
    if (!signal.aborted) setIsLoading(false);
   }
  };
  getData();
  return () => {
   controller.abort();
   setKeys(null);
  };
 }, [genre ? path : id]);

 if (!genre) {
  keys = type === "tv" ? keys?.results : keys?.keywords;
 } else {
  keys = keys?.genres;
 }

 useEffect(() => {
  if (select.length === 0) return;
  setSearchData({ with_genres: select.join(",") });
 }, [select, setSearchData]);

 const handleClick = (name) => {
  setSelect((prev) =>
   prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
  );
 };

 if (isLoading) {
  return <Typography sx={{ opacity: 0.5 }}>Loading keywords…</Typography>;
 }

 return (
  <Box
   sx={{
    borderRadius: 2,
    px: 1,
    height: "fit-content",
   }}
  >
   <Typography
    variant="subtitle1"
    sx={{
     fontSize: "1.25rem",
     fontWeight: 600,
     mb: 1,
     color: "black",
    }}
   >
    Keywords
   </Typography>
   {!keys ? "No data for keywords" : ""}
   <Box
    sx={{
     display: "flex",
     flexWrap: "wrap",
     gap: 1,
    }}
   >
    {isLoading ? (
     <div className="p-2 grid place-items-center animate-pulse">Loading...</div>
    ) : (
     ""
    )}
    {keys?.map((k) => {
     const isSelected = select.includes(k.name);
     return (
      <Chip
       key={k.id}
       label={k.name}
       size="small"
       onClick={() => handleClick(k.id)}
       sx={{
        backgroundColor: isSelected ? "primary.main" : "#2c2c2c",
        color: isSelected ? "black" : "#fff",
        fontSize: "0.75rem",
       }}
      />
     );
    })}
   </Box>
  </Box>
 );
}

export default Keywords;
