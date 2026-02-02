import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Loader";
import ScrollToTop from "./TMDB/ScrollToTop";
import UserInfo from "./TMDB/user/UserInfo";

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
    <ScrollToTop />
   <Routes>
    {/* LAYOUT WRAPPER */}
    <Route element={<Layout />}>
     {/* ROOT / HOME */}

     <Route index element={<TMDB />} />

     {/* AUTH / SEARCH */}
     <Route path="auth-success" element={<AuthSuccess />} />
     <Route path="search/:q" element={<SearchPage />} />

      {/* user details  */}
     <Route path="user" element={<UserInfo />} />

     {/* DETAILS */}
     <Route path="tmdbapp/movie/:id" element={<MovieDetails />} />
     <Route path="tmdbapp/tv/:id" element={<TVShowDetails />} />
     <Route path="tmdbapp/:type/:id/cast" element={<FullCasts />} />
     <Route path="tmdbapp/nav/:type/:keyVal" element={<HeroMenus />} />
     <Route path="/:type/:id/:keyVal" element={<PersonDetails />} />
    </Route>
   </Routes>
  </Suspense>
 );
}

export default App;
