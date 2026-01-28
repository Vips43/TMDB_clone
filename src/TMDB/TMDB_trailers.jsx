import { Box, Typography, Card, CardContent } from "@mui/material";
import React from "react";

function TMDB_trailers({ trailers, children }) {
 if (!trailers || trailers.length === 0) return null;

 return (
  <Box sx={{ my: 4, }}>
    
   {children}

   <Box
    className="no-scrollbar"
    sx={{
     display: "flex",
     gap: 2,
     overflowX: "auto",
     pb: 2,
     scrollSnapType: "x mandatory",
     "&::-webkit-scrollbar": { display: "none" }, 
    }}
   >
    {trailers?.map((v) => (
     <Box
      key={v?.id}
      sx={{
       flexShrink: 0,
       width: { xs: "300px", md: "450px" },
       scrollSnapAlign: "start",
      }}
     >
      {/* Aspect Ratio Container */}
      <Box
       sx={{
        position: "relative",
        width: "100%",
        paddingTop: "56.25%", // 16:9 Aspect Ratio
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "black",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        transition: "transform 0.3s ease",
       }}
      >
       <iframe 
        src={`https://www.youtube.com/embed/${v?.key}?rel=0&modestbranding=1`}
        title={v?.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; compute-pressure;"
        allowFullScreen
        style={{
         position: "absolute",
         top: 0,
         left: 0,
         width: "100%",
         height: "100%",
         border: 0,
        hover: { transform: "scale(1.02)",zIndex:20 },
        }}
       />
      </Box>

      <Typography
       variant="subtitle1"
       noWrap
       sx={{ mt: 1.5, fontWeight: 500, px: 0.5, color:"white" }}
      >
       {v?.name}
      </Typography>
      <Typography
       variant="caption"
       sx={{ px: 0.5, display: "block", color:"white" }}
      >
       {v?.type} • {new Date(v?.published_at).toLocaleDateString()}
      </Typography>
     </Box>
    ))}
   </Box>
  </Box>
 );
}

export default TMDB_trailers;
