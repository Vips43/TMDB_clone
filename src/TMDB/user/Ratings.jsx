import React from "react";

function Ratings({ rating }) {
 return (
  <>
   <div className="flex items-center text-neutral-500 gap-2 text-sm select-none">
    <div className="w-9 h-9 grid place-items-center rounded-full border-2 text-xs">
     {rating ? `${rating}% ` : "N/A"}
    </div>
    <span>My Ratings</span>
   </div>
  </>
 );
}

export default Ratings;
