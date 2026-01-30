import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from './TMDB/navbar_component/NavBar';
import Footer from './TMDB/footer/Footer';

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;