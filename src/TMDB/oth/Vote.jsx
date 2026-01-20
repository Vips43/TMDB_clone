import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SCORE_THRESHOLDS = [
 { threshold: 70, color: "#21D07A", track: "#204529", emoji: "🤩" },
 { threshold: 40, color: "#d2d531", track: "#423d0f", emoji: "😌" },
 { threshold: 0, color: "#db2360", track: "#571435", emoji: "😐" },
];

function Vote({ vote, w = "w-10", h = "h-10", showDetails = false }) {
 // 1. Get color and emoji based on score
 const activeConfig =
  SCORE_THRESHOLDS.find((c) => vote >= c.threshold) || SCORE_THRESHOLDS[2];
 const { color, track, emoji } = activeConfig;

 return (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
   {/* --- CIRCLE ICON (Always Visible) --- */}
   <Box className={`relative ${w} ${h} rounded-full bg-neutral-800 p-0.5`}>
    <Box
     className="w-full h-full rounded-full flex items-center justify-center"
     sx={{
      backgroundColor: "#081C22",
      background: `radial-gradient(closest-side, #081C22 79%, transparent 80% 100%),
              conic-gradient(${color} ${vote}%, ${track} 0)`,
     }}
    >
     <Typography
      variant="caption"
      sx={{
       color: "white",
       fontWeight: "bold",
       fontSize: "0.8em",
       lineHeight: 1,
      }}
     >
      {vote || "NR"}
      {vote > 0 && (
       <Typography
        component="span"
        sx={{ fontSize: "0.6em", verticalAlign: "super", opacity: 0.7 }}
       >
        %
       </Typography>
      )}
     </Typography>
    </Box>
   </Box>

   {/* --- DETAILS (Only if showDetails is true) --- */}
   {showDetails && (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 0.5 }}>
     <Typography
      fontWeight="bold"
      lineHeight={1.2}
      sx={{ color: "white", fontSize: "1rem" }}
     >
      User <br /> Score
     </Typography>
     <Typography sx={{ fontSize: "1.5rem", lineHeight: 1 }}>{emoji}</Typography>
    </Box>
   )}
  </Box>
 );
}

export default Vote;
