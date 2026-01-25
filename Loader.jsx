import React from "react";

function Loader({ text }) {
 return (
  <>
   <div className="mx-auto my-20 w-12 h-12 border-b-4 border-t-4 border-red-700 rounded-full animate-spin "></div>
   {text && <p className="text-center">{text}</p>}
  </>
 );
}

export default Loader;
