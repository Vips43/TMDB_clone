import React, { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function Lists() {
 const [list, setList] = useState(false);
 return (
  <>
   <div
    className={`flex gap-2 items-center text-neutral-500 select-none cursor-pointer text-sm ${list ? "*:text-blue-500 border-blue-500" : "text-neutral-500"}`}
    onClick={() => setList(!list)}
   >
    <div className={`border-2 rounded-full text-neutral-500 p-1`}>
     <FormatListBulletedIcon fontSize="small" />
    </div>
    <span >Lists</span>
   </div>
  </>
 );
}

export default Lists;
