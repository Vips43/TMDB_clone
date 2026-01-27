import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { keywords } from "../oth/js_files/api";

function Keywords({ path, type = null, }) {

 const { id } = useParams();
 let [keys, setKeys] = useState(null);
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
 }, [id]);

  keys = type === "tv" ? keys?.results : keys?.keywords;

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
     return (
      <Chip
       key={k.id}
       label={k.name}
       size="small"
       sx={{
        backgroundColor: "#2c2c2c",
        color: "#fff",
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
