import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Loader";

// import Layout from "./Layout";
// import TMDB from "./TMDB/TMDB";
// import MovieDetails from "./TMDB/MovieDetails";
// import TVShowDetails from "./TMDB/TVShowDetails";
// import SearchPage from "./TMDB/search/SearchPage";
// import AuthSuccess from "./TMDB/AuthSuccess";
// import FullCasts from "./TMDB/show/FullCasts";
// import HeroMenus from "./TMDB/HeroMenus";
// import PersonDetails from "./TMDB/person_details/PersonDetails";

const Layout = lazy(() => import("./Layout"));
const TMDB = lazy(() => import("./TMDB/TMDB"));
const MovieDetails = lazy(() => import("./TMDB/MovieDetails"));
const TVShowDetails = lazy(() => import("./TMDB/TVShowDetails"));
const SearchPage = lazy(() => import("./TMDB/search/SearchPage"));
const AuthSuccess = lazy(() => import("./TMDB/AuthSuccess"));
const FullCasts = lazy(() => import("./TMDB/show/FullCasts"));
const HeroMenus = lazy(() => import("./TMDB/HeroMenus"));
const PersonDetails = lazy(() => import("./TMDB/person_details/PersonDetails"));

function App() {
 document.title = `The Movie Database`;

 return (
  <Suspense fallback={<Loader />}>
   <Routes>
    {/* LAYOUT WRAPPER */}
    <Route element={<Layout />}>
     {/* ROOT / HOME */}

     <Route index element={<TMDB />} />

     {/* AUTH / SEARCH */}
     <Route path="auth-success" element={<AuthSuccess />} />
     <Route path="search/:q" element={<SearchPage />} />

     {/* DETAILS */}
     <Route path="tmdbapp/movie/:id" element={<MovieDetails />} />
     <Route path="tmdbapp/tv/:id" element={<TVShowDetails />} />
     <Route path="tmdbapp/:type/:id/cast" element={<FullCasts />} />
     <Route path="tmdbapp/nav/:type/:keyVal" element={<HeroMenus />} />
     <Route path="tmdbapp/:type/:id/:keyVal" element={<PersonDetails />} />
    </Route>
   </Routes>
  </Suspense>
 );
}

export default App;
