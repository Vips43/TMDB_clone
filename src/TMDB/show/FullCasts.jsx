import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchCast } from "../oth/js_files/api";

function FullCasts() {
 const { id, type } = useParams();
 const [casts, setCast] = useState({ cast: [], crew: [] });
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  if (!id || !type) return;

  const getData = async () => {
   setIsLoading(true);
   
   const section = type === "tv" ? "aggregate_credits" : "credits";
   const data = await fetchCast( id, type, section );
   setIsLoading(false);
   setCast(data || { cast: [], crew: [] });
  };
  getData();
 }, [id, type]);

 if (isLoading) {
  return (
   <div className="mx-auto grid place-items-center text-2xl font-bold my-14 animate-bounce">
    Loading...
   </div>
  );
 }
 
 if (!casts) return;

 return (
  <>
   <Box sx={{ background: "white" }}>
    <Typography>Series Cast length</Typography>
    <Box
     sx={{
      p: 4,
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
      gap: 2,
     }}
    >
     <CastStrips data={casts.cast} title={`Series Cast `} type="cast" />
     <CastStrips data={casts.crew} title={`Series Crew `} type="crew" />
    </Box>
   </Box>
  </>
 );
}

export default FullCasts;
