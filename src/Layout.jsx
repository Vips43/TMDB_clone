import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./TMDB/navbar_component/NavBar";
import Footer from "./TMDB/footer/Footer";

function Layout() {
 const [user, setUser] = useState(null);
 return (
  <div>
   <NavBar setUser={setUser} user={user} />
   <Outlet />
   <Footer user={user} />
  </div>
 );
}

export default Layout;
