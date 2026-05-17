import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Pagination, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { lazy, memo } from "react";

const Vote = lazy(() => import("./oth/Vote"));

const Card = memo(function Card({
  movie,
  children,
  totalPages,
  page,
  active = false,
  setPage,
  card = false,
}) {
  const imgUrl = "https://image.tmdb.org/t/p/w185";
  const navigate = useNavigate();

  if (!movie || movie.length === 0) return null;

  return (
    <Box sx={{ mt: 2 }}>
      {children}

      <AnimatePresence>
        <motion.div
          key="movie-container"
          className="no-scrollbar"
          style={{
            flex: 1,
            width: "100%",
            display: card ? "grid" : "flex",
            gridTemplateColumns: "repeat(auto-fill,minmax(115px,1fr))",
            overflowX: "auto",
            padding: 8,
            gap: 16,
            flexWrap: active ? "wrap" : "nowrap",
            scrollSnapType: "x mandatory",
          }}
        >
          {movie.map((d) => {
            const type = d.media_type ?? (d?.first_air_date ? "tv" : "movie");
            const title = type === "movie" ? d.title : d.name;
            const date = type === "movie" ? d.release_date : d.first_air_date;

            return (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                whileHover={{ opacity: 0.85, y: -5 }}
                style={{
                  cursor: "pointer",
                  borderRadius: 8,
                  boxShadow: "2px 2px 5px grey",
                  scrollSnapAlign: "start",
                }}
                onClick={() => navigate(`/tmdbapp/${type}/${d.id}`)}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    loading="lazy"
                    src={`${imgUrl}${d.poster_path}`}
                    alt={title}
                    sx={{
                      aspectRatio: "2 / 3",
                      maxHeight: "225px",
                      borderRadius: 1,
                      width: "100%",
                    }}
                  />

                  <Box sx={{ position: "absolute", bottom: -16, left: 8 }}>
                    <Vote vote={Math.floor(d.vote_average * 10)} />
                  </Box>
                </Box>

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
      </AnimatePresence>

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
});

export default Card;
