import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import useApiStore from "./oth/js_files/store";
import Card from "./Card";
import Toggler from "./oth/Toggler";

function TMDB() {
 const {
  popular,
  topRated,
  trending,
  fetchPopular,
  fetchTopRated,
  fetchTrending,
  loadingPopular,
  loadingTopRated,
  loadingTrending,
 } = useApiStore();

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
 }, [pType, pTV, pMovie, rType, tType]);

 return (
  <Box sx={{ p: 3, maxWidth: "1400px", mx: "auto" }}>
   {/* WHAT'S POPULAR */}
   <Card movie={popular} load={loadingPopular}>
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
     <Typography variant="h5" fontWeight={600}>
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

   {/* TOP RATED */}
   <Card movie={topRated} load={loadingTopRated}>
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
     <Typography variant="h5" fontWeight={600}>
      Top Rated
     </Typography>
     <Toggler value={rType} onChange={setRType} items={mediaTypes} />
    </Box>
   </Card>

   {/* TRENDING */}
   <Card movie={trending} load={loadingTrending}>
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
     <Typography variant="h5" fontWeight={600}>
      Trending
     </Typography>
     <Toggler value={tType} onChange={setTType} items={timeWindows} />
    </Box>
   </Card>
  </Box>
 );
}

export default TMDB;
