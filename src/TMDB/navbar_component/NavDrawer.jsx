import {
 Accordion,
 AccordionSummary,
 AccordionDetails,
 Box,
 Drawer,
 List,
 ListItemButton,
 ListItemText,
 Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";

const noHoverBg = {
 "&:hover": {
  backgroundColor: "transparent",
  color: "grey",
 },
 "&.Mui-focusVisible": {
  backgroundColor: "transparent",
  color: "grey",
 },
 "&.Mui-expanded": {
  backgroundColor: "transparent",
  color: "grey",
 },
 "&:active": {
  backgroundColor: "transparent",
  color: "grey",
 },
};

function NavDrawer({
 mobileOpen,
 setMobileOpen,
 MOVIE_MENU,
 TV_MENU,
 PEOPLE_MENU,
}) {
 const navigate = useNavigate();

 const handleNav = (path) => {
  navigate(path);
  setMobileOpen(false);
 };

 return (
  <Drawer
   anchor="left"
   open={mobileOpen}
   onClose={() => setMobileOpen(false)}
   sx={{ display: { xs: "block", sm: "none" } }}
   ModalProps={{ keepMounted: true, disableRestoreFocus: true }}
  >
   <Box sx={{ width: 360, bgcolor: "#032541", height: "100%", color: "#fff" }}>
    {/* MOVIES */}
    <Typography
     variant="h6"
     onClick={() => navigate("/tmdbapp/")}
     sx={{
      fontWeight: 800,
      cursor: "pointer",
      background: "linear-gradient(to right, #90cea1, #01b4e4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      my:2,
      textAlign:"center"
     }}
    >
     TMDB
    </Typography>
    <Accordion disableGutters sx={{ bgcolor: "transparent", color: "#fff" }}>
     <AccordionSummary
      disableRipple
      sx={noHoverBg}
      expandIcon={
       <ExpandMoreIcon
        sx={{ color: "#fff", "&:hover": { background: "transparent" } }}
       />
      }
     >
      <Typography>Movies</Typography>
     </AccordionSummary>
     <AccordionDetails sx={{ background: "#01203a", p: 0 }}>
      <List dense>
       {MOVIE_MENU.map((item) => (
        <ListItemButton
         key={item.key}
         onClick={() => handleNav(`/tmdbapp/nav/movie/${item.key}`)}
        >
         <ListItemText primary={item.label} />
        </ListItemButton>
       ))}
      </List>
     </AccordionDetails>
    </Accordion>

    {/* TV SHOWS */}
    <Accordion disableGutters sx={{ bgcolor: "transparent", color: "#fff" }}>
     <AccordionSummary
      sx={noHoverBg}
      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
     >
      <Typography>TV Shows</Typography>
     </AccordionSummary>
     <AccordionDetails sx={{ background: "#01203a", p: 0 }}>
      <List dense>
       {TV_MENU.map((item) => (
        <ListItemButton
         key={item.key}
         onClick={() => handleNav(`/tmdbapp/nav/tv/${item.key}`)}
        >
         <ListItemText primary={item.label} />
        </ListItemButton>
       ))}
      </List>
     </AccordionDetails>
    </Accordion>

    {/* PEOPLE */}
    <Accordion disableGutters sx={{ bgcolor: "transparent", color: "#fff" }}>
     <AccordionSummary
      sx={noHoverBg}
      expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
     >
      <Typography>People</Typography>
     </AccordionSummary>
     <AccordionDetails sx={{ background: "#01203a", p: 0 }}>
      <List dense>
       {PEOPLE_MENU.map((item) => (
        <ListItemButton
         key={item.key}
         onClick={() => handleNav(`/tmdbapp/nav/person/${item.key}`)}
        >
         <ListItemText primary={item.label} />
        </ListItemButton>
       ))}
      </List>
     </AccordionDetails>
    </Accordion>
   </Box>
  </Drawer>
 );
}

export default NavDrawer;
