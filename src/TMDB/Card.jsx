import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Pagination, Stack } from "@mui/material";
import Vote from "./oth/Vote";
import { motion } from "framer-motion";

function Card(props) {
 const { movie, children, totalPages, page, active = false, setPage } = props;
 const imgUrl = "https://image.tmdb.org/t/p/w185";
 const navigate = useNavigate();

 if (!movie || movie.length === 0) return null;

 return (
  <Box sx={{ mt: 2 }}>
   {children}

   {/* MOVIE LIST */}
   <motion.div
    key={movie.length}
    initial="hidden"
    animate="visible"
    variants={{
     hidden: { opacity: 0 },
     visible: {
      opacity: 1,
      transition: {
       staggerChildren: 0.1,
      },
     },
    }}
    style={{
     display: "flex",
     justifyContent: "space-evenly",
     overflowX: "auto",
     padding: 8,
     gap: 16,
     flexWrap: active ? "wrap" : "nowrap",
    }}
    className="no-scrollbar"
   >
    {movie.map((d) => {
     const type = d.media_type ?? (d?.first_air_date ? "tv" : "movie");
     const title = type === "movie" ? d.title : d.name;
     const date = type === "movie" ? d.release_date : d.first_air_date;

     return (
      <motion.div
       key={`${d.id}-${type}`}
       variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
       }}
       transition={{ duration: 0.25, ease: "easeOut" }}
       whileHover={{ y: -4 }}
       style={{
        flexShrink: 1,
        flexGrow: 0,
        cursor: "pointer",
        borderRadius: 8,
        boxShadow: "2px 2px 5px grey",
       }}
       onClick={() => navigate(`/tmdbapp/${type}/${d.id}`)}
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
      </motion.div>
     );
    })}
   </motion.div>

   {/* PAGINATION */}
   {active && (
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
   )}
  </Box>
 );
}

export default Card;