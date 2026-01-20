import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useApiStore from "./oth/js_files/store";
import Vote from "./oth/Vote";
import { duration } from "./oth/js_files/api";
import MovieFullDetail from "./movie/MovieFullDetail";
import ActionButtons from "./oth/ActionButtons";

function MovieDetails() {
 const navigate = useNavigate();
 const imgUrl = "https://image.tmdb.org/t/p/original";
 const originalImgUrl = "https://image.tmdb.org/t/p/original";
 const { id } = useParams();

 const type = "movie";

 const movieDetail = useApiStore((state) => state.movieDetail);
 const isLoading = useApiStore((state) => state.isLoading);
 const directorInfo = useApiStore((state) => state.directorInfo);

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();
  const { signal } = controller;

  useApiStore.getState().setMovieDetail(id, "movie", { signal });

  return () => controller.abort();
 }, [id]);

 if (!movieDetail || !movieDetail.id) {
  return (
   <Box sx={{ color: "white", p: 4, textAlign: "center" }}>
    No results found...
   </Box>
  );
 }

 if (isLoading)
  return (
   <div className="text-center text-2xl font-bold my-20 text-white">
    Loading...
   </div>
  );

 // Helper component for Crew/Director to avoid code duplication
 const CrewInfo = () => (
  <Box
   sx={{
    mt: 3,
    display: "grid",
    gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" },
    gap: 2,
    maxWidth: "600px",
    mx: { xs: "auto", sm: 0 },
    textAlign: "left",
   }}
  >
   <Box>
    {/* FIX: Add Array.isArray check here */}
    {Array.isArray(directorInfo?.name) &&
     directorInfo.name.map((n) => (
      <Box key={n.id}>
       {" "}
       {/* Wrap items in a Box or Fragment with key */}
       <Typography
        fontWeight="bold"
        sx={{ userSelect: "none", cursor: "pointer", "&:hover":{textDecoration:"underline", opacity:0.6, fontWeight:"800"} }}
        onClick={() => navigate(`/tmdbapp/person/${n.id}/${n.name}`)}
       >
        {n.name}
       </Typography>
       <Typography variant="caption" sx={{ opacity: 0.8 }}>
        {n.job}
       </Typography>
      </Box>
     ))}
   </Box>

   {/* Existing Top Crew logic */}
   {directorInfo?.topCrew?.slice(0, 5).map((t, i) => (
    <Box key={i}>
     <Typography
      fontWeight="bold"
      sx={{cursor:"pointer", "&:hover":{textDecoration:"underline", opacity:0.6}}}
      onClick={() => navigate(`/tmdbapp/person/${t.id}/${t.name}`)}
     >
      {t?.name}
     </Typography>
     <Typography variant="caption" sx={{ opacity: 0.8 }}>
      {t?.job}
     </Typography>
    </Box>
   ))}
  </Box>
 );

 return (
  <>
   {movieDetail && (
    <Box
     sx={{ backgroundColor: "#0f0f0f", color: "white", minHeight: "100vh" }}
    >
     {/* --- HERO SECTION --- */}
     <Box
      sx={{
       position: "relative",
       width: "100%",
       backgroundImage: movieDetail.backdrop_path
        ? `url(${originalImgUrl}${movieDetail.backdrop_path})`
        : "none",
       backgroundPosition: "center top",
       backgroundSize: "cover",
       backgroundRepeat: "no-repeat",
      }}
     >
      <Box
       sx={{
        background:
         "linear-gradient(to right, rgba(10,10,10,1) 150px, rgba(10,10,10,0.6) 100%)",
        "@media (max-width: 900px)": {
         background:
          "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.9) 100%)",
        },
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 6 },
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
       }}
      >
       <Box
        sx={{
         maxWidth: "1300px",
         width: "100%",
         display: "flex",
         flexDirection: { xs: "column", sm: "row" },
         alignItems: { xs: "start", sm: "flex-start", md: "center" },
         gap: { xs: 3, md: 5 },
        }}
       >
        {/* POSTER CARD */}
        <Box
         component="img"
         src={
          movieDetail.poster_path
           ? `${imgUrl}${movieDetail.poster_path}`
           : "https://via.placeholder.com/300x450"
         }
         alt={movieDetail.title}
         sx={{
          width: { xs: "160px", sm: "220px", md: "300px" },
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
          flexShrink: 0,
         }}
        />

        {/* INFO AREA */}
        <Box sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}>
         {/* --- ALWAYS VISIBLE (Title, Facts, Score) --- */}
         <Typography
          variant="h1"
          sx={{
           fontWeight: 700,
           fontSize: { xs: "1.75rem", sm: "2rem", md: "3rem" },
           lineHeight: 1.1,
           color: "white",
          }}
         >
          {movieDetail.title}{" "}
          <Typography
           component="span"
           sx={{
            opacity: 0.7,
            fontWeight: 400,
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2.2rem" },
           }}
          >
           ({movieDetail.release_date?.split("-")[0]})
          </Typography>
         </Typography>

         <Box
          sx={{
           display: "flex",
           flexWrap: "wrap",
           alignItems: "center",
           justifyContent: { xs: "center", sm: "flex-start" },
           gap: 1.5,
           mt: 1,
           mb: 2,
           fontSize: { xs: "0.8rem", md: "1rem" },
          }}
         >
          <span
           style={{
            border: "1px solid rgba(255,255,255,0.6)",
            padding: "1px 6px",
            borderRadius: "4px",
           }}
          >
           {movieDetail.adult ? "R" : "PG-13"}
          </span>
          <span>{movieDetail.release_date}</span>
          <span>•</span>
          <span>{movieDetail.genres?.map((g) => g.name).join(", ")}</span>
          <span>•</span>
          <span>{duration(movieDetail.runtime)}</span>
         </Box>

         <Box
          sx={{
           display: "flex",
           flexDirection: { xs: "row", sm: "column" },
           alignItems: { xs: "center", sm: "flex-start" },
           justifyContent: { xs: "center", sm: "flex-start" },
           gap: 2,
           mb: { xs: 0, md: 3 }, // Remove bottom margin on mobile as content ends here
          }}
         >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           <Vote
            vote={Math.floor(movieDetail.vote_average * 10)}
            w="w-12 md:w-16"
            h="h-12 md:h-16"
            showDetails={true}
           />
          </Box>
          <Box>
           <ActionButtons id={movieDetail.id} type={type} />
          </Box>
         </Box>

         {/* --- DESKTOP ONLY: Tagline, Overview, Crew --- */}
         <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography
           sx={{
            fontStyle: "italic",
            opacity: 0.7,
            mb: 1.5,
            fontSize: "1.1rem",
           }}
          >
           {movieDetail.tagline}
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
           Overview
          </Typography>
          <Typography
           sx={{
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: "800px",
           }}
          >
           {movieDetail.overview}
          </Typography>
          <CrewInfo />
         </Box>
        </Box>
       </Box>
      </Box>
     </Box>

     {/* --- MOBILE ONLY: Tagline, Overview, Crew (Below Hero) --- */}
     <Box
      sx={{
       display: { xs: "block", md: "none" },
       px: 3,
       py: 3,
       borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
     >
      <Typography
       sx={{
        fontStyle: "italic",
        opacity: 0.7,
        mb: 2,
        fontSize: "1rem",
        textAlign: "center",
       }}
      >
       {movieDetail.tagline}
      </Typography>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
       Overview
      </Typography>
      <Typography
       sx={{
        fontSize: "0.95rem",
        lineHeight: 1.6,
        mb: 3,
        opacity: 0.9,
       }}
      >
       {movieDetail.overview}
      </Typography>
      <CrewInfo />
     </Box>

     {/* --- BODY SECTION (Stats, Full Detail Component) --- */}
     <Box
      sx={{
       maxWidth: "1300px",
       mx: "auto",
       px: { xs: 3, md: 6 },
       py: 4,
       display: "flex",
       flexDirection: { xs: "column", md: "row" },
       gap: 4,
      }}
     >
      {/* RIGHT SIDEBAR: Stats & Collection */}
      <Box
       sx={{
        width: { xs: "100%", md: "300px" },
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 3,
       }}
      >
       <Box>
        <Typography variant="subtitle1" fontWeight="bold">
         Original Title
        </Typography>
        <Typography variant="body2">{movieDetail.original_title}</Typography>
       </Box>

       {movieDetail.belongs_to_collection && (
        <Box
         sx={{
          mt: 1,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${imgUrl}${movieDetail.belongs_to_collection.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 2,
         }}
        >
         <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
          Part of the {movieDetail.belongs_to_collection.name}
         </Typography>
         <Box
          sx={{
           bgcolor: "rgba(255,255,255,0.1)",
           borderRadius: 4,
           width: "fit-content",
           px: 2,
           py: 0.5,
           fontSize: "0.8rem",
           cursor: "pointer",
           "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
         >
          VIEW COLLECTION
         </Box>
        </Box>
       )}
      </Box>
     </Box>
    </Box>
   )}
   <>
    <MovieFullDetail movie={movieDetail} />
   </>
  </>
 );
}

export default MovieDetails;
