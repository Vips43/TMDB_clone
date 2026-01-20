import React, { useEffect, useMemo, useState } from "react";
import { Box, NativeSelect, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function RightOth({ info }) {
    const navigate = useNavigate();
 const movie = useMemo(
  () =>
   info?.combined_credits?.cast?.filter((c) => c.media_type === "movie") || [],
  [info],
 );
 const tv = useMemo(
  () =>
   info?.combined_credits?.cast?.filter((c) => c.media_type !== "movie") || [],
  [info],
 );
 console.log(tv)


 const [type, setType] = useState("movie");
 const [radio, setRadio]= useState(null)

 const data = type === "movie" ? movie : tv;

 return (
  <>
   <Box sx={{ display: "flex", gap: 2, alignItems: "center", my: 2 }}>
    <Typography fontWeight={600}>Acting</Typography>
    <Box sx={{ fontSize: ".8rem" }}>
     <NativeSelect
      defaultValue={30}
      inputProps={{
       name: "type",
       id: "uncontrolled-native",
      }}
      sx={{ fontSize: ".8rem" }}
      onChange={(e)=>setType(e.target.value)}
     >
      <option value="movie">Movie</option>
      <option value="tv">TV</option>
     </NativeSelect>
    </Box>
   </Box>

   <Box
    sx={{ border: "1px solid lightgrey",  overflow: {xs:"visible", }, bgcolor:"white" }}
    className="no-scrollbar"
   >
    {data?.map((i,e) => (
     <Box
      key={e}
      sx={{
       display: "flex",
       alignItems: "center",
       justifyContent:"flex-start",
       gap: 2,
       p: 1,
       borderBottom: "1px solid lightgrey",
      }}
     >
      <Typography fontSize=".8rem">
       {i?.release_date?.slice(0, 4) || i?.first_air_date?.slice(0,4)|| ""}
      </Typography>
      <div className="border w-2 h-2 rounded-2xl p-px" onClick={()=>setRadio(radio===i.id? null: i.id)}><div className={`"w-full h-full rounded-full" ${radio === i.id ? "bg-black" : ""}`}></div></div>
      <Box>
       <Typography fontSize=".9rem" fontWeight={600} onClick={()=> navigate(`/tmdbapp/${i.media_type}/${i.id}`)} sx={{cursor:"pointer"}}>
        {i?.title || i.name || ""}
       </Typography>
       <Typography fontSize=".8rem">
        <span className="text-gray-400 text-sm">as </span>
        {i?.character}
       </Typography>
      </Box>
     </Box>
    ))}
   </Box>
  </>
 );
}

export default RightOth;
