import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Box, Typography } from "@mui/material";
import Keywords from "../show/Keywords";

function OthInfo({ movie, type }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";

 const getLanguageName = (code) => {
  if (!code) return "Unknown";
  try {
   return new Intl.DisplayNames(["en"], { type: "language" }).of(code);
  } catch {
   return code.toUpperCase();
  }
 };

 const formatMoney = (value) => {
  if (!value || value === 0) return "Not Available";
  return `$${value.toLocaleString()}`;
 };

 return (
  <Box sx={{ p: 3, height: "fit-content", background: "white" }}>
   <InsertLinkIcon sx={{ opacity: 0.7 }} />

   {movie?.tagline && (
    <Typography
     fontWeight={600}
     sx={{
      opacity: 0.7,
      fontSize: "1.25rem",
      mt: 2,
      mb: 1,
      textAlign: "center",
      whiteSpace: "normal",
     }}
    >
     {movie.tagline}
    </Typography>
   )}

   <Box sx={{ mt: 2 }}>
    <Typography fontWeight={600}>Released on</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1.5 }}>
     {movie?.first_air_date || movie?.release_date || "N/A"}
    </Typography>

    <Typography fontWeight={600}>Original Name</Typography>
    <Typography sx={{ opacity: 0.8, mb: 1 }}>
     {movie?.original_name || movie?.original_title || "N/A"}
    </Typography>

    <Typography fontWeight={600}>Original Language</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
     {getLanguageName(movie?.original_language)}
    </Typography>

    {movie?.type && (
     <>
      <Typography fontWeight={600}>Type</Typography>
      <Typography sx={{ opacity: 0.8, mb: 1 }}>{movie.type}</Typography>
     </>
    )}

    {movie?.budget !== undefined && (
     <>
      <Typography fontWeight={600}>Budget</Typography>
      <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
       {formatMoney(movie.budget)}
      </Typography>
     </>
    )}

    {movie?.revenue !== undefined && (
     <>
      <Typography fontWeight={600}>Revenue</Typography>
      <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
       {formatMoney(movie.revenue)}
      </Typography>
     </>
    )}

    <Typography fontWeight={600}>Status</Typography>
    <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
     {movie?.status || "N/A"}
    </Typography>

    {movie?.seasons?.length > 0 && (
     <>
      <Typography fontWeight={600}>Last Episode</Typography>
      <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
       {movie?.last_episode_to_air?.name || "N/A"} — <strong>Aired on:</strong>{" "}
       {movie?.last_air_date || "N/A"}
      </Typography>

      <Typography fontWeight={600}>Total</Typography>
      <Typography sx={{ fontSize: ".95rem", mb: 1 }}>
       <strong className="opacity-75">Seasons:</strong>{" "}
       {movie.number_of_seasons} —{" "}
       <strong className="opacity-75">Episodes:</strong>{" "}
       {movie.number_of_episodes}
      </Typography>
     </>
    )}

    {movie?.networks?.length > 0 && (
     <>
      <Typography fontWeight={600}>Network</Typography>
      {movie.networks.map((n) => (
       <Box key={n.id} sx={{ mb: 1, display: "flex", alignItems: "center" }}>
        {n.logo_path && (
         <Box
          component="img"
          src={`${imgUrl}${n.logo_path}`}
          alt={n.name}
          sx={{ height: 25, mr: 1 }}
         />
        )}
       </Box>
      ))}
     </>
    )}
   </Box>

   <Box sx={{ mt: 4 }}>
    <Keywords type={type} />
   </Box>
  </Box>
 );
}

export default OthInfo;
