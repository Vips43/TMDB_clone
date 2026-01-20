import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import img from "/No-image.png"
import useApiStore from "../../oth/js_files/store";

function SearchCard({ movie }) {
 const imgUrl = "https://image.tmdb.org/t/p/w185"; // smaller = faster
 const navigate = useNavigate();
 const isLoading = useApiStore((state) => state.isLoading);

 if (isLoading) {
   return <div className="mt-14 text-2xl font-bold animate-bounce grid place-items-center">
   Loading...
  </div>
 } 

 if (!movie || movie.length === 0) {
  return <Typography>No results found</Typography>;
 }

 return (
  <Box sx={{ }}>
   {movie.map((d) => {
    // NORMALIZE TYPE
    const type = d.media_type ?? (d.first_air_date ? "tv" : "movie");

    // NORMALIZE FIELDS
    const title = d.title || d.name;
    const date = d.release_date || d.first_air_date;
    return (
     <Box
      key={d.id}
      sx={{
       display: "flex",
       gap: 2,
       mb: 2,
       border: "1px solid #e0e0e0",
       borderRadius: 2,
       cursor: "pointer",
       transition: "background 0.2s",
       "&:hover": {
        backgroundColor: "#f9f9f9",
       },
      }}
      onClick={() => navigate(`/tmdbapp/${type}/${d.id}`)}
     >
      {/* LEFT IMAGE */}
      <Box
       component="img"
       src={d.poster_path ? `${imgUrl}${d.poster_path}` : img}
       alt={title}
       sx={{
        width: 90,
        height: 135,
        borderRadius: "5px 0 0 5px",
        objectFit: "cover",
        flexShrink: 0,
       }}
      />

      {/* RIGHT CONTENT */}
      <Box sx={{ flex: 1 }}>
       <Typography fontWeight={700} fontSize="1rem" sx={{mt:1.5, letterSpacing:1, lineHeight:1.1}} >
        {title}
       </Typography>

       <Typography fontSize="0.8rem" color="text.secondary" sx={{ mb: 1 }}>
        {date || ""}
       </Typography>

       <Typography fontSize="0.8rem" color="text.secondary" sx={{ mb: 1 }}>
        {d.adult ? <span className="p-1 bg-gray-600 text-xs rounded-sm text-white">Adult</span> : <span className="p-1 bg-gray-600 text-xs rounded-sm text-white">U/A</span>  }
       </Typography>

       <Typography
        fontSize="0.85rem"
        color="text.secondary"
        sx={{
         display: "-webkit-box",
         WebkitLineClamp: 3,
         WebkitBoxOrient: "vertical",
         overflow: "hidden",
        }}
       >
        {d.overview || "No description available."}
       </Typography>
      </Box>
     </Box>
    );
   })}
  </Box>
 );
}

export default SearchCard;
