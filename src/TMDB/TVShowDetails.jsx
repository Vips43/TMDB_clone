import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useApiStore from "./oth/js_files/store";
import { fetchGlobal } from "./oth/js_files/api";
import Vote from "./oth/Vote";
import ActionButtons from "./oth/ActionButtons";
import ShowExtraDetails  from "./show/ShowExtraDetails";

function TVShowDetails() {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const originalImgUrl = "https://image.tmdb.org/t/p/original";

 const { id } = useParams();
 const [content_rating, setContenet_Rating] = useState(null);

 const movieDetail = useApiStore((state) => state.tvDetail);
 const setMovieDetail = useApiStore((state) => state.setMovieDetail);

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();
  const { signal } = controller;

  setMovieDetail(id, "tv", { signal });

  const getData = async () => {
   try {
    let data = await fetchGlobal("tv", id, "content_ratings", { signal });
    // Try to find India first, fallback to US
    data =
     data?.results?.find((d) => d.iso_3166_1 === "IN") ??
     data?.results?.find((d) => d.iso_3166_1 === "US");
    setContenet_Rating(data);
   } catch (error) {
    console.error("Failed to fetch ratings", error);
   }
  };
  getData();

  return () => {
   controller.abort();
  };
 }, [id, setMovieDetail]);

 /* 🔑 PREVENT CRASH ON REFRESH */
 if (!movieDetail || !movieDetail.id) {
  return (
   <Typography
    sx={{
     mt: 10,
     textAlign: "center",
     fontWeight: "700",
    }}
    className="animate-pulse"
   >
    Loading TV show details...
   </Typography>
  );
 }

 // --- HELPER: CREATOR INFO COMPONENT ---
 // We define this once and use it in both Desktop (Hero) and Mobile (Body) sections
 const CreatorInfo = () => {
  if (!movieDetail.created_by || movieDetail.created_by.length === 0)
   return null;

  return (
   <Box sx={{ mt: 3 }}>
    <Typography fontWeight="bold" sx={{ mb: 1, textDecoration: "underline" }}>
     Created By
    </Typography>
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
     {movieDetail.created_by.map((c) => (
      <Box key={c.id} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
       {/* Optional: Show Creator Face if available */}
       <Box
        component="img"
        src={c.profile_path ? `${imgUrl}${c.profile_path}` : "/no-user.png"}
        sx={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
       />

       <Box>
        <Typography fontWeight="bold" variant="body1">
         {c.name}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
         Creator
        </Typography>
       </Box>
      </Box>
     ))}
    </Box>
   </Box>
  );
 };

 return (
  // Main Container (Dark Theme)
  <>
   <Box sx={{ backgroundColor: "#0f0f0f", color: "white", minHeight: "100%" }}>
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
     {/* Gradient Overlay */}
     <Box
      sx={{
       background:
        "linear-gradient(to right, rgba(10,10,10,1) 150px, rgba(10,10,10,0.84) 100%)",
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
        alignItems: { xs: "flex-start", sm: "flex-start", md: "center" },
        gap: { xs: 3, md: 5 },
       }}
      >
       {/* POSTER CARD */}
       <Box
        component="img"
        src={
         movieDetail.poster_path
          ? `${imgUrl}${movieDetail.poster_path}`
          : "/no-poster.png"
        }
        alt={movieDetail.name}
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
        {/* Title & Year */}
        <Typography
         variant="h1"
         sx={{
          fontWeight: 700,
          fontSize: { xs: "1.75rem", sm: "2rem", md: "3rem" },
          lineHeight: 1.1,
          color: "white",
         }}
        >
         {movieDetail.name}{" "}
         <Typography
          component="span"
          sx={{
           opacity: 0.7,
           fontWeight: 400,
           fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2.2rem" },
          }}
         >
          ({movieDetail.first_air_date?.split("-")[0]})
         </Typography>
        </Typography>

        {/* Facts Row */}
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
         {content_rating?.rating && (
          <span
           style={{
            border: "1px solid rgba(255,255,255,0.6)",
            padding: "1px 6px",
            borderRadius: "4px",
           }}
          >
           {content_rating.rating}
          </span>
         )}
         <span>{movieDetail.first_air_date}</span>
         <span>•</span>
         <span>{movieDetail.genres?.map((g) => g.name).join(", ")}</span>
         <span>•</span>
         <span>{movieDetail.type}</span>
        </Box>

        {/* Score */}
        <Box
         sx={{
          display: "flex",
          alignItems: { xs: "center", sm: "flex-start" },
          justifyContent: { xs: "center", sm: "flex-start" },
          flexDirection: "column",
          gap: 2,
          mb: { xs: 0, md: 3 },
         }}
        >
         <Box
          sx={{
           display: "flex",
           alignItems: "center",
           gap: 1,
          }}
         >
          <Vote
           vote={Math.floor(movieDetail.vote_average * 10)}
           w="w-12 md:w-16"
           h="h-12 md:h-16"
           showDetails={true}
          />
         </Box>
         <ActionButtons />
        </Box>

        {/* --- DESKTOP ONLY: Tagline, Overview, Creators --- */}
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

         <CreatorInfo />
        </Box>
       </Box>
      </Box>
     </Box>
    </Box>

    {/* --- MOBILE ONLY: Tagline, Overview, Creators (Below Hero) --- */}
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
     <CreatorInfo />
    </Box>
   </Box>
   <>
    <ShowExtraDetails url={imgUrl} movieDetail={movieDetail} />
   </>
  </>
 );
}

export default TVShowDetails;
