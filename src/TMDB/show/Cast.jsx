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
 console.log(img);
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
  <Box
   sx={{
    display: "flex",
    gap: 1,
    overflow: "auto",
    py: 0.2,
    background: "white",
   }}
   className={"no-scrollbar"}
  >
   {slicedCast?.map((c, i) => (
    <Card
     key={i}
     sx={{
      width: cardWidth,
      flexShrink: 0,
      transition: "all .8s easeInOut",
     }}
    >
     <CardActionArea
      disableRipple
      sx={{ cursor: "default", "&:hover": { backgroundColor: "transparent" } }}
     >
      <CardMedia
       component="img"
       height="140"
       image={c?.profile_path ? `${url}${c.profile_path}` : img}
       //  image={`${url}${c.profile_path}` || img}
       alt={c.name || c.character}
       sx={{ border: c.profile_path ? "" : "1px solid lightgrey" }}
      />

      <CardContent sx={{ p: 0.5 }}>
       <Typography
        variant="subtitle2"
        sx={{
         fontWeight: 600,
         lineHeight: 1,
         "&:hover": {
          textDecoration: "underline",
          opacity: 0.8,
          cursor: "pointer",
         },
        }}
        onClick={() => navigate(`/person/${c.id}/${c.name}`)}
       >
        {c.name}
       </Typography>

       <p className="text-xs leading-3.5 mt-0.5 opacity-50 line-clamp-2">
        {c.roles?.map((r) => r?.character).join(", ")}
       </p>

       <Typography
        variant="caption"
        sx={{
         display: "block",
         mt: 1,
         color: "text.secondary",
         lineHeight: 1,
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
