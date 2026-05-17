import { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CreateListModal from "./CreateListModal";

function Lists() {
 const [open, setOpen] = useState(false);

 return (
  <>
   <div
    className={`flex gap-2 items-center select-none cursor-pointer text-sm transition-all hover:text-blue-500 text-neutral-500`}
    onClick={() => {
     setOpen(true);
    }}
   >
    <div className="border-2 rounded-full p-1">
     <FormatListBulletedIcon fontSize="small" />
    </div>
    <span>Lists</span>
   </div>

   <CreateListModal open={open} onClose={() => setOpen(false)} />
  </>
 );
}

export default Lists;
