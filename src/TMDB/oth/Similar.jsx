import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchGlobal } from "./js_files/api";
import similar from "/similar.jpg";

function Similar({ type, value = "similar" }) {
 const { id } = useParams();
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const [similars, setSimilars] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();
  const { signal } = controller;

  const getData = async () => {
   try {
    const data = await fetchGlobal(type, id, value, { signal });
    setSimilars(data);
   } catch (error) {
    console.log(error);
   }
  };
  getData();
  return () => {
   controller.abort();
  };
 }, [id, type, value]);

 return (
  <>
   <Box sx={{ mb: 4 }}>
    <Typography variant="h5" fontWeight="600" sx={{ overflow: "auto" }}>
     {" "}
     Similar{" "}
    </Typography>
    <Box
     sx={{ background: "white", display: "flex", gap: 3, overflow: "auto" }}
     className="no-scrollbar"
    >
     {similars?.results?.map((s, i) => (
      <Box key={i} sx={{ flexShrink: 0, width: 220 }}>
       <Box
        component="img"
        height="200"
        alt={s.title}
        src={!s.backdrop_path ? similar : `${imgUrl}${s.backdrop_path}`}
        sx={{ borderRadius: 2, mx: "auto", width: "100%" }}
       />
       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
         variant="subtitle2"
         sx={{
          ":hover": {
           textDecoration: "underline",
           cursor: "pointer",
           lineHeight: "1rem",
          },
         }}
         className="line-clamp-1 hover:line-clamp-none hover:leading-tight"
         onClick={() => navigate(`/tmdbapp/${type}/${s.id}`)}
        >
         {s.title || s.name}
        </Typography>
        <Typography variant="subtitle2" fontWeight="600" sx={{}}>
         {Math.floor(s.vote_average * 10)}%
        </Typography>
       </Box>
      </Box>
     ))}
    </Box>
   </Box>
  </>
 );
}

export default Similar;
