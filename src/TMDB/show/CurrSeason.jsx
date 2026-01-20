import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import useApiStore from "../store";

function CurrSeason() {
 const url = "https://image.tmdb.org/t/p/w500";
 const movieDetail = useApiStore((state) => state.movieDetail);
 const curr = movieDetail?.seasons?.at(-1);

 if (!curr) return null;

 return (
  <Card sx={{ display: "flex", maxWidth: 620 }}>
   <CardMedia
    component="img"
    sx={{ width: 150, maxWidth: 350 }}
    image={curr.poster_path ? `${url}${curr.poster_path}` : "/no-poster.png"}
    alt={curr.name}
   />

   <Box sx={{ display: "flex", flexDirection: "column" }}>
    <CardContent>
     <Typography component="div" variant="h6" sx={{lineHeight:1.1,}}>
      {curr.name}
     </Typography>
     <span className="text-xs bg-violet-950 py-0.5 px-1 text-white rounded">★ {Math.floor(curr.vote_average*10)}%</span>

     <Typography sx={{ color: "text.secondary", fontSize:"0.7rem" }}>
      Season {curr.season_number} • {curr.episode_count} Episodes
     </Typography>

     <Typography variant="caption" sx={{ opacity: 0.7 }}>
      {curr.air_date}
     </Typography>
     <Typography  sx={{ fontSize:".7em", opacity: 0.7, lineHeight:1.1 }}>
      {curr.overview}
     </Typography>
    </CardContent>
   </Box>
  </Card>
 );
}

export default CurrSeason;
