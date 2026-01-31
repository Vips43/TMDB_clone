import React from "react";

function Loader({ text }) {
 return (
  <>
   <div className="grid place-items-center w-full h-[calc(100vh-10rem)]">
    <div className="mx-auto mb-5 mt-20 w-12 h-12 border-b-4 border-t-4 border-red-700 rounded-full animate-spin grid place-items-center"></div>
    {text && <p className="text-center">{text}</p>}
   </div>
  </>
 );
}

export default Loader;
