import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import {
 FaRegHeart,
 FaHeart,
 FaListUl,
 FaRegBookmark,
 FaBookmark,
} from "react-icons/fa";
import { getFav_Watch, setFav_Watch } from "./js_files/Auth";

function ActionButtons({ type, id }) {
 const [user, setUser] = useState(null);
 const [sId, setSId] = useState(null);
 const [favs, setFavs] = useState([]);

 useEffect(() => {
  let currUser = localStorage.getItem("TMDB_user") || "";
  let session_id = localStorage.getItem("session_id") || "";
  if (currUser) {
   currUser = JSON.parse(currUser);
   setUser(currUser.id);
  }
  setSId(session_id);
 }, []);

 useEffect(() => {
  const getData = async () => {
   const favs = await setFav_Watch(type, id, true, user, sId);
   console.log(favs);
  };
    getData()
 }, [type, id, true, user, sId]);

 useEffect(() => {
  const getData = async () => {
   const getFav = await getFav_Watch(user);
   setFavs(getFav.results.map((g) => g.id));
   console.log(favs);
  };
  getData();
 }, [user]);

 const [status, setStatus] = useState({
  list: false,
  fav: false,
  watch: false,
 });

 const handleToggle = (key) => {
  setStatus((prev) => ({ ...prev, [key]: !prev[key] }));
 };

 const actions = [
  {
   id: "list",

   icon: <FaListUl style={{ color: status.list ? "#01b4e4" : "inherit" }} />,
   label: status.list ? "Remove from List" : "Add to List",
  },
  {
   id: "fav",
   icon: status.fav ? <FaHeart style={{ color: "#ef47b6" }} /> : <FaRegHeart />,
   label: status.fav ? "Remove Favorite" : "Mark as Favorite",
  },
  {
   id: "watch",
   icon: status.watch ? (
    <FaBookmark style={{ color: "#cf3131" }} />
   ) : (
    <FaRegBookmark />
   ),
   label: status.watch ? "Remove from Watchlist" : "Add to Watchlist",
  },
 ];

 return (
  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
   {actions.map((action) => (
    <Tooltip key={action.id} title={action.label} arrow>
     <IconButton
      onClick={() => handleToggle(action.id)}
      sx={{
       backgroundColor: "#032541",
       color: "white",
       width: "46px",
       height: "46px",
       fontSize: "1rem",
       transition: "all 0.2s ease-in-out",
       "&:hover": {
        backgroundColor: "white",
        color: "#032541",
        transform: "translateY(-1px)",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
       },
      }}
     >
      {action.icon}
     </IconButton>
    </Tooltip>
   ))}
  </Box>
 );
}

export default ActionButtons;
