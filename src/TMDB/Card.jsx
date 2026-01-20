import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Pagination, Stack } from "@mui/material";
import Vote from "./oth/Vote";

function Card(props) {
 const { movie, children, totalPages,page, active = false, setPage } = props;
 const imgUrl = "https://image.tmdb.org/t/p/w185";
 const navigate = useNavigate();

 if (!movie || movie.length === 0) return null;


 return (
  <Box
   sx={{
    mt: 2,
   }}
  >
   {children}

   <Box
    sx={{
     display: "flex",
     justifyContent:"space-evenly",
     overflowX: "auto",
     p: 1,
     gap: 2,
     flexWrap: active ? "wrap" : "nowrap",
    }}
    className="no-scrollbar"
   >
    {movie?.map((d) => {
     const type = d.media_type ?? (d?.first_air_date ? "tv" : "movie");

     const title = type === "movie" ? d.title : d.name;
     const date = type === "movie" ? d.release_date : d.first_air_date;

     return (
      <Box
       key={d.id}
       sx={{
        flexShrink: 1,
        flex: active ? 1 : "",
        boxShadow: "2px 2px 5px grey",
        cursor: "pointer",
        borderRadius: 1,
        transition: "transform 0.2s",
        flexGrow:0,
        "&:hover": {
         opacity: 0.85,
        },
       }}
       onClick={() => {
        const type = d.media_type ?? (d.first_air_date ? "tv" : "movie");
        navigate(`/tmdbapp/${type}/${d.id}`);
       }}
      >
       {/* IMAGE */}
       <Box sx={{ position: "relative" }}>
        <Box
         component="img"
         src={`${imgUrl}${d.poster_path}`}
         alt={title}
         sx={{
          width: "100%",
          aspectRatio: "2 / 3",
          borderRadius: 1,
          borderBottomRightRadius: 1,
          borderBottomLeftRadius: 1,
         }}
        />

        <Box sx={{ position: "absolute", bottom: -16, left: 8 }}>
         <Vote vote={Math.floor(d.vote_average * 10)} />
        </Box>
       </Box>

       {/* TEXT */}
       <Box sx={{ mt: 3, width: 130, px: 1 }}>
        <Typography fontSize="0.9rem" fontWeight={600} noWrap>
         {title}
        </Typography>
        <Typography fontSize="0.75rem" color="text.secondary">
         {date}
        </Typography>
       </Box>
      </Box>
     );
    })}
   </Box>
   {active ? (
    <Stack spacing={4} alignItems="center" sx={{ my: 4 }}>
  <Pagination
    color="primary"
    count={totalPages}
    page={page}
    size="small"
    shape="rounded"
    onChange={(e, val) => {
      e.preventDefault();
      setPage(val);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />
</Stack>

   ) : (
    ""
   )}
  </Box>
 );
}

export default Card;
