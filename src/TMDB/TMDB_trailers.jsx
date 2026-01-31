import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

function TMDB_trailers({ trailers, children }) {
 const [activeKey, setActiveKey] = useState(null);

 if (!trailers || trailers.length === 0) return null;

 return (
  <Box sx={{ my: 4 }}>
   {children}

   <Box
    className="no-scrollbar"
    sx={{
     display: "flex",
     gap: 2,
     overflowX: "auto",
     pb: 2,
     scrollSnapType: "x mandatory",
    }}
   >
    {trailers.map((v) => {
     const isActive = activeKey === v.key;

     return (
      <Box
       key={v.id}
       sx={{
        flexShrink: 0,
        width: { xs: 300, md: 450 },
        scrollSnapAlign: "start",
       }}
      >
       {/* Aspect Ratio Container */}
       <Box
        sx={{
         position: "relative",
         width: "100%",
         paddingTop: "56.25%",
         borderRadius: 3,
         overflow: "hidden",
         bgcolor: "black",
         boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
         cursor: "pointer",
         "&:hover .overlay": {
          opacity: 1,
         },
        }}
        onClick={() => setActiveKey(isActive ? null : v.key)}
       >
        {isActive ? (
         <iframe
          src={`https://www.youtube.com/embed/${v.key}?autoplay=1&rel=0`}
          title={v.name}
          loading="lazy"
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
          {/* Thumbnail */}
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

          {/* Overlay + Play (hover only on desktop) */}
          <Box
           className="overlay"
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

            /* 🔑 Mobile: always visible */
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
             transition: "transform 0.3s ease",
            }}
           >
            <FaPlay color="white" size={22} style={{ marginLeft: 3 }} />
           </Box>
          </Box>
         </>
        )}
       </Box>

       <Typography
        variant="subtitle1"
        noWrap
        sx={{ mt: 1.5, fontWeight: 500, px: 0.5, color: "white" }}
       >
        {v.name}
       </Typography>

       <Typography
        variant="caption"
        sx={{ px: 0.5, display: "block", color: "white" }}
       >
        {v.type} • {new Date(v.published_at).toLocaleDateString()}
       </Typography>
      </Box>
     );
    })}
   </Box>
  </Box>
 );
}

export default TMDB_trailers;
