import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import img from "/casts.png";
import useApiStore from "../oth/js_files/store";

function Cast({ cast, url, cardWidth = 120 }) {

  const navigate = useNavigate();

 const isLoading = useApiStore((state) => state.isLoading);
 const slicedCast = cast?.cast?.slice(0, 10);
 if (isLoading) {
  return (
   <Typography sx={{ opacity: 0.6, p: 2 }} className="animate-bounce">
    Loading cast…
   </Typography>
  );
 }

 return (
  <Box sx={{ display: "flex", gap: 1, overflow: "auto", py: 0.2, background:"white" }}
   className={"no-scrollbar"} >
   {slicedCast?.map((c, i) => (
    <Card
     key={i}
     sx={{
      width: cardWidth,
      flexShrink: 0,
      transition:"all .8s easeInOut",
     }}
    >
     <CardActionArea
      disableRipple
      sx={{ cursor: "default", "&:hover": { backgroundColor: "transparent" },
      }}
     >
      <CardMedia
       component="img"
       height="140"
       image={c.profile_path ? `${url}${c.profile_path}` : img}
       alt={c.name || c.character}
      />

      <CardContent sx={{ p: 0.5, 
      "&:hover":{textDecoration:"underline", opacity:0.8, cursor:"pointer"} }} 
      onClick={()=> navigate(`/tmdbapp/person/${c.id}/${c.name}`)} 
      >
       <Typography
        variant="subtitle2"
        sx={{
         fontWeight: 600,
         lineHeight: 1,
        }}
       >
        {c.name}
       </Typography>

       <Typography
        variant="caption"
        sx={{
         lineHeight: 1.1,
         display: "block",
         opacity: 0.85,
         overflow: 'hidden',
        }}
        className="line-clamp-2"
       >
        {c.roles?.map((r) => r?.character).join(", ")}
       </Typography>

       <Typography
        variant="caption"
        sx={{
         display: "block",
         mt:1,
         color: "text.secondary",
         lineHeight:1
        }}
       >
        {c.known_for_department}
        <span className="block">{c.total_episode_count} episodes</span>
       </Typography>
      </CardContent>
     </CardActionArea>
    </Card>
   ))}
  </Box>
 );
}

export default Cast;
