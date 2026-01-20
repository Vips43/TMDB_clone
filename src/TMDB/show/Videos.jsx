import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { videos } from "../oth/js_files/api";
import { useParams } from "react-router";

function Videos({ type }) {
 const { id } = useParams();
 const [data, setData] = useState(null);

 useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchVideos = async () => {
   if (!id || !type) return;
   const res = await videos(id, type, { signal });
   setData(res);
  };

  fetchVideos();
  return () => controller.abort();
 }, [id, type]);

 if (!data) return <Typography>Loading videos…</Typography>;

 const trailers = data.results?.filter(
  (v) => v.site === "YouTube" && v.type === "Trailer"
 );
  
 if (!trailers.length) {
  return <Typography>No trailers available</Typography>;
 }

 return (
  <>
   <Typography variant="h5" fontWeight={600} mb={1}>
    Videos
   </Typography>
   <Box sx={{ maxHeight: "300px", overflow: "auto", mb:2 }} className="no-scrollbar">
    <Box
     sx={{
      display: "grid",
      gridTemplateColumns: {
       xs: "1fr",
       md: "repeat(2, 1fr)",
      },
      gap: 2,
     }}
    >
     {trailers.map((v) => (
      <Box
       key={v.id}
       sx={{
        position: "relative",
        paddingTop: "56.25%", // 16:9
        borderRadius: 2,
        overflow: "hidden",
       }}
      >
       <iframe
        src={`https://www.youtube.com/embed/${v.key}`}
        title={v.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
         position: "absolute",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         border: 0,
        }}
       />
      </Box>
     ))}
    </Box>
   </Box>
  </>
 );
}

export default Videos;
