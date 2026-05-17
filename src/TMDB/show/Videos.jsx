import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { videos } from "../oth/js_files/api";
import { useParams } from "react-router";
import { FaPlay } from "react-icons/fa";

function Videos({ type }) {
 const { id } = useParams();
 const [data, setData] = useState(null);
 const [activeKey, setActiveKey] = useState(null);

 useEffect(() => {
  const controller = new AbortController();

  const fetchVideos = async () => {
   if (!id || !type) return;
   const res = await videos(id, type, { signal: controller.signal });
   setData(res);
  };

  fetchVideos();
  return () => controller.abort();
 }, [id, type]);

 if (!data) return <Typography>Loading videos…</Typography>;

 const trailers = data.results?.filter(
  (v) => v.site === "YouTube" && v.type === "Trailer",
 );

 if (!trailers?.length) {
  return <Typography>No trailers available</Typography>;
 }

 return (
  <>
   <Typography variant="h5" fontWeight={600} mb={1}>
    Videos
   </Typography>

   {/* HORIZONTAL SCROLL CONTAINER */}
   <Box
    className="no-scrollbar"
    sx={{
     display: "flex",
     gap: 2,
     overflowX: "auto",
     pb: 2,
    }}
   >
    {trailers.map((v) => {
     const isActive = activeKey === v.key;

     return (
      <Box
       key={v.id}
       sx={{
        flexShrink: 0,
        width: { xs: 280, sm: 320, md: 420 },
       }}
      >
       {/* CARD */}
       <Box
        sx={{
         position: "relative",
         paddingTop: "56.25%", // 16:9
         borderRadius: 2,
         overflow: "hidden",
         cursor: "pointer",

         /* ✅ HOVER TARGET */
         "&:hover .overlay": {
          opacity: 1,
         },
        }}
       >
        {isActive ? (
         <iframe
          src={`https://www.youtube.com/embed/${v.key}?autoplay=1&rel=0`}
          title={v.name}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
           position: "absolute",
           inset: 0,
           width: "100%",
           height: "100%",
           border: 0,
          }}
         />
        ) : (
         <>
          {/* THUMBNAIL */}
          <img
           src={`https://img.youtube.com/vi/${v.key}/hqdefault.jpg`}
           alt={v.name}
           loading="lazy"
           style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
           }}
          />

          {/* OVERLAY (CLICK TARGET) */}
          <Box
           className="overlay"
           onClick={() => setActiveKey(v.key)}
           sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
             "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
            opacity: 0,
            transition: "opacity 0.3s ease",

            /* 📱 mobile: always visible */
            "@media (hover: none)": {
             opacity: 1,
            },
           }}
          >
           <Box
            sx={{
             width: 64,
             height: 64,
             borderRadius: "50%",
             bgcolor: "rgba(0,0,0,0.65)",
             display: "grid",
             placeItems: "center",
            }}
           >
            <FaPlay color="white" size={22} style={{ marginLeft: 3 }} />
           </Box>
          </Box>
         </>
        )}
       </Box>

       {/* TEXT */}
       <Typography variant="subtitle1" noWrap sx={{ mt: 1, fontWeight: 500 }}>
        {v.name}
       </Typography>
      </Box>
     );
    })}
   </Box>
  </>
 );
}

export default Videos;
