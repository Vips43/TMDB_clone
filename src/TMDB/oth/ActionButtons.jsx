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
import useApiStore from "./js_files/store";

function ActionButtons({ type, id }) {
 const [user, setUser] = useState(null);
 const [sId, setSId] = useState(null);
 const [favs, setFavs] = useState([]);
 const [watchs, setWatchs] = useState([]);

 const status = useApiStore((state) => state.status);
 const setStatus = useApiStore((state) => state.setStatus);

 // Init user + session
 useEffect(() => {
  const u = localStorage.getItem("TMDB_user");
  const sid = localStorage.getItem("session_id");
  if (u) setUser(JSON.parse(u).id);
  if (sid) setSId(sid);
 }, []);

 // Fetch favorites + watchlist
 useEffect(() => {
  if (!user || !sId) return;

  const fetchLists = async () => {
   try {
    const [favRes, watchRes] = await Promise.all([
     getFav_Watch(user, type, "favorite", sId),
     getFav_Watch(user, type, "watchlist", sId),
    ]);

    setFavs(favRes?.results?.map((g) => g.id) || []);
    setWatchs(watchRes?.results?.map((g) => g.id) || []);
   } catch (err) {
    console.error("Failed to fetch lists", err);
   }
  };

  fetchLists();
 }, [user, sId, type]);

 // Sync Zustand state from server (IMPORTANT)
 useEffect(() => {
  if (!id) return;

  setStatus({
   fav: favs.includes(id),
   watch: watchs.includes(id),
  });
 }, [favs, watchs, id, setStatus]);

 // Update favorite on toggle
 useEffect(() => {
  if (!user || !sId) return;
  setFav(type, id, status.fav, user, sId);
 }, [status.fav, user, sId, type, id]);

 // Update watchlist on toggle
 useEffect(() => {
  if (!user || !sId) return;
  setWatch(type, id, status.watch, user, sId);
 }, [status.watch, user, sId, type, id]);

 // Correct toggle handler (key-based)
 const handleToggle = (key) => {
  setStatus({ [key]: !status[key] });
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
   {actions.map((a) => (
    <Tooltip key={a.id} title={a.label} arrow>
     <IconButton
      onClick={() => handleToggle(a.id)}
      sx={{
       backgroundColor: "#032541",
       color: "white",
       width: 30,
       height: 30,
       fontSize: "0.95rem",
       transition: "all .2s",
       "&:hover": {
        backgroundColor: "white",
        color: "#032541",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 10px rgba(0,0,0,.3)",
       },
      }}
     >
      {a.icon}
     </IconButton>
    </Tooltip>
   ))}
  </Box>
 );
}

export default ActionButtons;
