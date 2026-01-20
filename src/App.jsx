import React from "react";
import { Route, Routes } from "react-router-dom";
import TMDB from "./TMDB/TMDB"
import Layout from "./Layout";
import MovieDetails from "./TMDB/MovieDetails";
import TVShowDetails from "./TMDB/TVShowDetails"
import SearchPage from "../../practice react/frontend/src/compo/TMDB/search/SearchPage";
import FullCasts from "../../practice react/frontend/src/compo/TMDB/show/FullCasts";
import HeroMenus from "../../practice react/frontend/src/compo/TMDB/HeroMenus";
import PersonDetails from "../../practice react/frontend/src/compo/TMDB/person_details/PersonDetails";
import AuthSuccess from "../../practice react/frontend/src/compo/TMDB/AuthSuccess";

function App() {
 return (
  <div>
   <Routes>
    <Route element={<Layout />} />
    {/* root page */}
    <Route index element={<TMDB />} />

    {/* details page  */}
    <Route path="/auth-success" element={<AuthSuccess />} />
    <Route path="/search/:q" element={<SearchPage />} />
    <Route path="/tmdbapp/movie/:id" element={<MovieDetails />} />
    <Route path="/tmdbapp/tv/:id" element={<TVShowDetails />} />
    <Route path="/tmdbapp/:type/:id/cast" element={<FullCasts />} />
    <Route path="/tmdbapp/nav/:type/:keyVal" element={<HeroMenus />} />
    <Route path="/tmdbapp/:type/:id/:keyVal" element={<PersonDetails />} />
   </Routes>
  </div>
 );
}

export default App;
