import { useParams } from "react-router";
import WatchProvider from "./compo/WatchProvider";
import Sort from "./compo/Sort";
import SearchBtn from "./compo/SearchBtn";
import useNavStore from "./compo/NavStore";
import { useEffect, useState } from "react";
import Genres from "./compo/Genres";
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function LeftNav() {
 const [open, setOpen] = useState(false);
 const [select, setSelect] = useState([]);

 const setSearchData = useNavStore((s) => s.setSearchData);
 const clearSearches = useNavStore((s) => s.clearSearches);
 const { type, keyVal } = useParams();

 const action = (
  <>
   <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={() => setOpen(false)}
   >
    <CloseIcon fontSize="small" />
   </IconButton>
  </>
 );
 const handleClose = (event, reason) => {
  if (reason === "clickaway") return;
  setOpen(false);
 };

 useEffect(() => {
  clearSearches();
  setSelect([]);
 }, [type, keyVal]);

 return (
  <div className="w-3xs space-y-2 bg-neutral-100 py-2">
   <h3 className="font-bold text-black! capitalize m-2 text-2xl">{keyVal}</h3>
   <Sort />
   <WatchProvider />
   <Genres path={`genre/movie/list`} select={select} setSelect={setSelect} />
   <SearchBtn />
   <button
    className="border text-sm p-1 bg-red-500 text-white "
    onClick={() => {
     clearSearches();
     setSelect([]);
     setSearchData({
      sort_by: "popularity.desc",
      watch_region: "IN",
      with_watch_providers: null,
      with_genres: null,
     });
     setOpen(true);
    }}
   >
    Clear filter
   </button>
   <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    message="Filters cleared"
    action={action}
    sx={{ zIndex: 999 }}
   />
  </div>
 );
}

export default LeftNav;
