import { lazy, Suspense, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { Box, Typography } from "@mui/material";
import useApiStore from "./oth/js_files/store";
import Toggler from "./oth/Toggler";
import Loader from "../../Loader";
const Card = lazy(() => import("./Card"));
const TMDB_trailers = lazy(() => import("./TMDB_trailers"));

function TMDB() {
 const popular = useApiStore((s) => s.popular);
 const topRated = useApiStore((s) => s.topRated);
 const trending = useApiStore((s) => s.trending);
 const trailers = useApiStore((s) => s.trailers);

 const loadingPopular = useApiStore((s) => s.loadingPopular);
 const loadingTopRated = useApiStore((s) => s.loadingTopRated);
 const loadingTrending = useApiStore((s) => s.loadingTrending);

 const fetchPopular = useApiStore((s) => s.fetchPopular);
 const fetchTopRated = useApiStore((s) => s.fetchTopRated);
 const fetchTrending = useApiStore((s) => s.fetchTrending);
 const fetchTrailers = useApiStore((s) => s.fetchTrailers);

 const [pType, setPType] = useState("movie");
 const [pTV, setPV] = useState("airing_today");
 const [pMovie, setPMovie] = useState("now_playing");
 const [rType, setRType] = useState("movie");
 const [tType, setTType] = useState("day");
 const [bg, setBg] = useState("");

 const bgStyle = {
  backgroundImage: bg ? `url("${bg}")` : "none",
  backgroundColor: bg ? undefined : "#415b70",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
 };
 const isTvToggle = pType === "tv";

 const mediaTypes = [
  { label: "Movies", key: "movie" },
  { label: "TV-Show", key: "tv" },
 ];

 const timeWindows = [
  { label: "Today", key: "day" },
  { label: "This-week", key: "week" },
 ];

 const popularTvFilters = [
  { label: "Streaming", key: "airing_today" },
  { label: "On Air", key: "on_the_air" },
  { label: "Popular", key: "popular" },
 ];

 const popularMovieFilters = [
  { label: "Streaming", key: "now_playing" },
  { label: "Popular", key: "popular" },
  { label: "Top Rated", key: "top_rated" },
  { label: "Upcoming", key: "upcoming" },
 ];
 // Popular
 useEffect(() => {
  fetchPopular(pType, isTvToggle ? pTV : pMovie);
 }, [pType, pTV, pMovie, isTvToggle]);

 // Top Rated
 useEffect(() => {
  fetchTopRated(rType);
 }, [rType]);

 // Trending
 useEffect(() => {
  fetchTrending(tType);
 }, [tType]);

 // Trailers (NO ARRAY DEPENDENCY)
 useEffect(() => {
  fetchTrailers();
 }, [tType, trending]);

 return (
  <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
   {/* TRENDING */}
   <Box
    sx={{
     p: 3,
     backgroundImage: "url('/tranding_bg.svg')",
     width: "100%",
     backgroundSize: "180% ,100%",
     height: "100%",
     backgroundRepeat: "no-repeat",
     backgroundPosition: "bottom",
    }}
   >
    <Suspense fallback={<Loader />}>
     <Card movie={trending} load={loadingTrending}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
       <Typography variant="h5" fontWeight={600}>
        Trending
       </Typography>
       <Toggler value={tType} onChange={setTType} items={timeWindows} />
      </Box>
     </Card>
    </Suspense>
   </Box>

   {/* trailers  */}
   {trailers?.length > 0 && (
    <Box style={bgStyle}>
     <Box sx={{ p: 3, bgcolor: "rgba(3, 36, 64, 0.7)",transition:"all .5s easeInOut" }}>
      <Suspense fallback={<Loader />}>
       <TMDB_trailers trailers={trailers} setBg={setBg}>
        <Box sx={{ display: "flex", gap: 2 }}>
         <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
          sx={{ color: "white" }}
         >
          Latest Trailers
         </Typography>
        </Box>
       </TMDB_trailers>
      </Suspense>
     </Box>
    </Box>
   )}

   {/* WHAT'S POPULAR */}
   <Box sx={{ p: 3 }}>
    <Suspense fallback={<Loader />}>
     <Card movie={popular} load={loadingPopular}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
       <Typography variant="h5" fontWeight={600} sx={{ width: "100%" }}>
        What's Popular
       </Typography>

       <Toggler value={pType} onChange={setPType} items={mediaTypes} />
       <Toggler
        value={isTvToggle ? pTV : pMovie}
        onChange={isTvToggle ? setPV : setPMovie}
        items={isTvToggle ? popularTvFilters : popularMovieFilters}
       />
      </Box>
     </Card>
    </Suspense>
   </Box>

   {/* TOP RATED */}
   <Box sx={{ p: 3 }}>
    <Suspense fallback={<Loader />}>
     <Card movie={topRated} load={loadingTopRated}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
       <Typography variant="h5" fontWeight={600}>
        Top Rated
       </Typography>
       <Toggler value={rType} onChange={setRType} items={mediaTypes} />
      </Box>
     </Card>
    </Suspense>
   </Box>
  </Box>
 );
}

export default TMDB;
