import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { setFav } from "../oth/js_files/Auth";

function Favourite({ id, type, isTrue }) {
 const [toggle, setToggle] = useState(isTrue);

 useEffect(() => {
  const setdata = async () => {
   const user = JSON.parse(localStorage.getItem("TMDB_user"));
   const sid = localStorage.getItem("session_id");
   await setFav(type, id, toggle, user, sid);
  };
  setdata();
 }, [toggle]);

 return (
  <>
   <div
    className={`flex gap-2 items-center text-sm transition-all cursor-pointer select-none text-neutral-500`}
    onClick={() => {
     setToggle((prev) => !prev);
    }}
   >
    <div
     className={`border-2 rounded-full p-1 transition-all ${
      toggle ? "text-red-500" : "text-neutral-500"
     }`}
    >
     {toggle ? (
      <FavoriteIcon fontSize="small" className="text-red-600" />
     ) : (
      <FavoriteBorderIcon fontSize="small" />
     )}
    </div>
    <span>Favourite</span>
   </div>
  </>
 );
}

export default Favourite;
