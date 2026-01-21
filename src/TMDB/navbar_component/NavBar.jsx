import * as React from "react";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import NavDrawer from "./NavDrawer";
import NavDropdown from "./NavDropdown";
import Searchbtn from "../search/compo/Searchbtn";

/* ================= CONSTANTS ================= */

const MOVIE_MENU = [
 { label: "Popular", key: "popular" },
 { label: "Now Playing", key: "now_playing" },
 { label: "Top Rated", key: "top_rated" },
 { label: "Upcoming", key: "upcoming" },
];

const TV_MENU = [
 { label: "Airing Today", key: "airing_today" },
 { label: "On The Air", key: "on_the_air" },
 { label: "Popular", key: "popular" },
];

const PEOPLE_MENU = [{ label: "Popular People", key: "popular" }];

/* ================= NAVBAR ================= */

function NavBar() {
 const navigate = useNavigate();

 return (
  <>
   <Box>
    <CssBaseline />

    <AppBar
     position="sticky"
     top="0"
     sx={{
      position: "sticky",
      top: 0,
      bgcolor: "#032541",
      zIndex: (theme) => theme.zIndex.drawer + 1,
     }}
    >
     <Toolbar sx={{ display: "grid", gridTemplateColumns:"1fr 1fr", gap: 5 }}>
      
      <Box component="img" src="/TMDB_logo1.svg" sx={{ height: "15px", max:"auto", boxSizing:"content-box",  }} />
      
      <Box
       sx={{
        display: {  xs: "flex" },
        alignItems: "center",
        gap: 1,
       }}
      >
       <NavDropdown
        label="Movies"
        items={MOVIE_MENU}
        onSelect={(key) => navigate(`/tmdbapp/nav/movie/${key}`)}
       />
       <NavDropdown
        label="TV Shows"
        items={TV_MENU}
        onSelect={(key) => navigate(`/tmdbapp/nav/tv/${key}`)}
       />
       <NavDropdown
        label="People"
        items={PEOPLE_MENU}
        onSelect={(key) => navigate(`/tmdbapp/nav/person/${key}`)}
       />
      </Box>

      
     </Toolbar>
    </AppBar>

    
   </Box>
   <Searchbtn />
  </>
 );
}

export default NavBar;
