import React from "react";
import useApiStore from "../../oth/js_files/store";

function SearchNetwork() {
 const isLoading = useApiStore((s) => s.isLoading);

 if (isLoading)
  <div className="mt-14 text-2xl font-bold animate-bounce grid place-items-center">
   Loading...
  </div>;
 return (
  <>
   <div>
    <div className="mt-14 text-2xl font-bold grid place-items-center">
     No Data network...
    </div>
   </div>
  </>
 );
}

export default SearchNetwork;
