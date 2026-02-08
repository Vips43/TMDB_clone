import React from "react";
import loader from "./public/loader/loader.gif"

function Loader({ text }) {
 return (
  <>
   <div className="min-h-[calc(100dvh-10rem)] flex items-center justify-center">
      <img src={loader} alt="" className="h-10 " />
   </div>
  </>
 );
}

export default Loader;
