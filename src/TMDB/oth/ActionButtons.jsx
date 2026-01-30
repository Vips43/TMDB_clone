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
import { getFav_Watch, setFav, setWatch } from "./js_files/Auth";

function ActionButtons({ type, id }) {
 const [user, setUser] = useState(null);
 const [sId, setSId] = useState(null);
 const [favs, setFavs] = useState([]);
 const [watchs, setWatchs] = useState([]);
 const [status, setStatus] = useState({
  list: false,
  fav: false,
  watch: false,
 });

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
  if (!user || !sId) return;

  const getData = async () => {
   await setFav(type, id, status.fav, user, sId);
   //    console.log(status, favs);
  };
  getData();
 }, [status.fav, user, sId, type, id]);

 useEffect(() => {
  if (!user || !sId) return;

  const setData = async () => {
   await setWatch(type, id, status.watch, user, sId);
  };

  setData();
 }, [status.watch, user, sId, type, id]);

 useEffect(() => {
  if (!user) return;

  const getWatchs = async () => {
   const res = await getFav_Watch(user, type, "watchlist", sId);
   setWatchs(res.results.map((g) => g.id));
  };

  getWatchs();
 }, [user]);

 useEffect(() => {
  if (!user) return;

  const getWatchs = async () => {
   const res = await getFav_Watch(user, type, "favorite", sId);
   setFavs(res.results.map((g) => g.id));
  };

  getWatchs();
 }, [user]);

 useEffect(() => {
  if (!favs || !id) return;

  setStatus((prev) => ({ ...prev, fav: favs.includes(id) }));
 }, [favs, id]);

 useEffect(() => {
  if (!watchs || !id) return;

  setStatus((prev) => ({ ...prev, watch: watchs.includes(id) }));
 }, [watchs, id]);

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
