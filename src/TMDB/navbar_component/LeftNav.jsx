import { useParams } from "react-router";
import WatchProvider from "./compo/WatchProvider";
import Sort from "./compo/Sort";
import SearchBtn from "./compo/SearchBtn";

function LeftNav() {
 const { type, keyVal } = useParams();

 return (
  <div className="w-3xs space-y-2 bg-neutral-100 py-2">
   <h3 className="font-bold text-black! capitalize m-2 text-2xl">
    {keyVal}
   </h3>
   <Sort/>
   <WatchProvider />

   <SearchBtn/>
   
  </div>
 );
}

export default LeftNav;
