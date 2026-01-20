import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import img from "/No-image.png";
import useApiStore from "../../oth/js_files/store";

function SearchPeople({ movie }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const isLoading = useApiStore((s) => s.isLoading);
 if (isLoading) {
  return (
   <div className="mx-auto grid place-items-center text-2xl font-bold my-14 animate-bounce">
    Loading...
   </div>
  );
 }
 return (
  <>
   <Box sx={{}} className="space-y-2">
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
     <span className="opacity-35"></span>
    </Typography>

    {movie?.map((f) => {
     const knownForTitles =
      f.known_for
       ?.map((item) => item.original_title || item.original_name)
       .filter(Boolean)
       .join(", ") || "";
     return (
      <Card
       key={f.id}
       sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        boxShadow: "none",
        height: "fit-content",
       }}
      >
       {/* IMAGE */}
       <CardMedia
        component="img"
        image={f.profile_path ? `${imgUrl}${f.profile_path}` : img}
        alt={f.name}
        sx={{
         width: 70,
         height: 70,
         minWidth: 64,
         objectFit: "cover",
         borderRadius: 2,
         flexShrink: 0,
        }}
       />
       {/* CONTENT */}
       <CardContent sx={{ pt: 1 }}>
        <Typography
         variant="body1"
         sx={{
          fontWeight: 600,
          lineHeight: 1.2,
          "&:hover": { textDecoration: "underline" },
         }}
        >
         {f.name}
        </Typography>
        <Typography
         variant="caption"
         sx={{
          lineHeight: 1.1,
          opacity: 0.9,
          "&:hover": { textDecoration: "underline" },
         }}
        >
         <strong>{f.known_for_department}</strong> {"•"}
         <span className="leading-1">
          {" "}
          {knownForTitles}
         </span>
        </Typography>
       </CardContent>
      </Card>
     );
    })}
   </Box>
  </>
 );
}

export default SearchPeople;
