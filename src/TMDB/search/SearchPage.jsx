import Box from "@mui/material/Box";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import useApiStore from "../oth/js_files/store";
import SearchCard from "./compo/SearchCard";
import SearchCompany from "./compo/SearchCompany";
import SearchKeyword from "./compo/SearchKeyword";
import SearchNetwork from "./compo/SearchNetwork";
import SearchPeople from "./compo/SearchPeople";
import SearchList from "./compo/SearchList";

function SearchPage() {
 const navigate = useNavigate();
 const searchMovie = useApiStore((state) => state.searchMovie);
 const movie = useApiStore((state) => state.searchResults);
 const query = useApiStore((state) => state.query);
 const searchtype = useApiStore((state) => state.searchtype);

 useEffect(() => {
  if (!query) return; 
    searchMovie(query, searchtype);
 }, [query, searchtype, searchMovie]);


 return (
  <Box sx={{ px: 2 }}>
   <Typography
    variant="body1"
    sx={{ fontWeight: 600, display: "grid", placeItems: "center", my: 2 }}
   >
    searched for: {query}
   </Typography>

   <Box></Box>

   {/* MAIN LAYOUT */}
   <Box
    sx={{
     display: "flex",
     gap: 3,
     alignItems: "flex-start",
    }}
   >
    {/* LEFT SIDEBAR */}
    <Box sx={{ width: {xs:180,sm:260}, flexShrink: 0, position: "sticky", top: 5 }}>
     <SearchList />
    </Box>

    {/* RIGHT CONTENT */}
    <Box sx={{ flex: 1 }}>
     {searchtype === "movie" ? <SearchCard movie={movie?.results} /> : ""}
     {searchtype === "tv" ? <SearchCard movie={movie?.results} /> : ""}
     {searchtype === "person" ? <SearchPeople movie={movie?.results} /> : ""}
     {searchtype === "collection" ? <SearchCard movie={movie?.results} /> : ""}
     {searchtype === "network" ? <SearchNetwork movie={movie} /> : ""}
     {searchtype === "keyword" ? <SearchKeyword movie={movie} /> : ""}
     {searchtype === "company" ? <SearchCompany movie={movie} /> : ""}
     {searchtype === "award" ? <SearchAward movie={movie} /> : ""}

     {/* <Outlet /> */}
    </Box>
   </Box>
  </Box>
 );
}

export default SearchPage;

function SearchAward() {
 const isLoading = useApiStore((s) => s.isLoading);

 if (isLoading)
  <div className="mt-14 text-2xl font-bold animate-bounce grid place-items-center">
   Loading...
  </div>;
 // if(!movie) return
 return (
  <>
   <div>
    <div className="mt-14 text-2xl font-bold grid place-items-center animate-pulse">
     No Data for Awards...
    </div>
   </div>
  </>
 );
}
