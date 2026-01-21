import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import useApiStore from "./oth/js_files/store";
import Card from "./Card";
import Toggler from "./oth/Toggler";
import TMDB_trailers from "./TMDB_trailers";

function TMDB() {
 const {
  popular,
  topRated,
  trending,
  fetchPopular,
  fetchTopRated,
  fetchTrending,
  trailers,
  fetchTrailers,
  loadingPopular,
  loadingTopRated,
  loadingTrending,
 } = useApiStore();

 useEffect(() => {
    fetchTrailers(trending);
 }, [trending]);

 const [pType, setPType] = useState("movie");
 const [pTV, setPV] = useState("airing_today");
 const [pMovie, setPMovie] = useState("now_playing");
 const [rType, setRType] = useState("movie");
 const [tType, setTType] = useState("day");

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

 useEffect(() => {
  fetchPopular(pType, isTvToggle ? pTV : pMovie);
  fetchTopRated(rType);
  fetchTrending(tType);
 }, [pType, pTV, pMovie, rType, tType,]);

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
    <Card movie={trending} load={loadingTrending}>
     <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Typography variant="h5" fontWeight={600}>
       Trending
      </Typography>
      <Toggler value={tType} onChange={setTType} items={timeWindows} />
     </Box>
    </Card>
   </Box>

    {/* trailers  */}
    <Box sx={{ p: 3, bgcolor:"#415b70" }}>
     <TMDB_trailers trailers={trailers}  />
    </Box>
    
   {/* WHAT'S POPULAR */}
   <Box sx={{ p: 3 }}>
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
   </Box>

   {/* TOP RATED */}
   <Box sx={{ p: 3 }}>
    <Card movie={topRated} load={loadingTopRated}>
     <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <Typography variant="h5" fontWeight={600}>
       Top Rated
      </Typography>
      <Toggler value={rType} onChange={setRType} items={mediaTypes} />
     </Box>
    </Card>
   </Box>
  </Box>
 );
}

export default TMDB;
