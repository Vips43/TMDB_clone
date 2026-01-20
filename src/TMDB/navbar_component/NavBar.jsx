import * as React from "react";
import {
 AppBar,
 Box,
 CssBaseline,
 Toolbar,
 Typography,
} from "@mui/material";
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
 const [mobileOpen, setMobileOpen] = React.useState(false);

 return (
  <>
  <Box>
   <CssBaseline />

   <AppBar position="sticky" sx={{ bgcolor: "#032541" }}>
    <Toolbar>
     <MenuIcon
      onClick={() => setMobileOpen(true)}
      sx={{ cursor: "pointer", display: { sm: "none" }, mr: 2 }}
     />

     <Typography
      variant="h6"
      onClick={() => navigate("/")}
      sx={{
       fontWeight: 800,
       cursor: "pointer",
       background: "linear-gradient(to right, #90cea1, #01b4e4)",
       WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
       mr: 3,
      }}
     >
      TMDB
     </Typography>

     <Box
      sx={{
       display: { xs: "none", sm: "flex" },
       alignItems: "center",
       gap: 1,
       flexGrow: 1,
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

     <Searchbtn />
    </Toolbar>
   </AppBar>

   <NavDrawer
    mobileOpen={mobileOpen}
    setMobileOpen={setMobileOpen}
    MOVIE_MENU={MOVIE_MENU}
    TV_MENU={TV_MENU}
    PEOPLE_MENU={PEOPLE_MENU}
   />
  </Box>
  </>
 );
}

export default NavBar;
