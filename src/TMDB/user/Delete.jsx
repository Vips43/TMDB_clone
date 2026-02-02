import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function Delete() {
 const [remove, setRemove] = useState(false);

 return (
  <>
   <div className={`flex gap-2 items-center text-sm ${remove ? "text-blue-400" : "text-neutral-500"} transition-all cursor-pointer select-none`} onClick={() => setRemove(!remove)}>
    <div
     className={`border-2 rounded-full p-1 font-bold`}
    >
     <CloseIcon fontSize="small" />
    </div>
    <span> Delete</span>
   </div>
  </>
 );
}

export default Delete;
