import { useParams } from "react-router";
import WatchProvider from "./compo/WatchProvider";
import Sort from "./compo/Sort";
import SearchBtn from "./compo/SearchBtn";
import Keywords from "../show/Keywords";
import useNavStore from "./compo/NavStore";
import { useEffect } from "react";

function LeftNav() {
 const clearSearches = useNavStore((s) => s.clearSearches);
 const { type, keyVal } = useParams();

 useEffect(() => {
  clearSearches();
 }, [type, keyVal]);

 return (
  <div className="w-3xs space-y-2 bg-neutral-100 py-2">
   <h3 className="font-bold text-black! capitalize m-2 text-2xl">{keyVal}</h3>
   <Sort />
   <WatchProvider />
   <Keywords path={`genre/movie/list`} genre={true} />
   <SearchBtn />
   <button
    className="border text-sm p-1 bg-red-500 text-white "
    onClick={clearSearches}
   >
    Clear filter
   </button>
  </div>
 );
}

export default LeftNav;
