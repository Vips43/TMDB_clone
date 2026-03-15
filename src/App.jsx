import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./TMDB/ScrollToTop";
import UserInfo from "./TMDB/user/UserInfo";
import ShowList from "./TMDB/user/ShowList";
import Loader from "./TMDB/oth/Loader";

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
    <Route element={<Layout />}>
     <Route index element={<TMDB />} />
     <Route path="auth-success" element={<AuthSuccess />} />
     <Route path="search/:q" element={<SearchPage />} />
     <Route path="user" element={<UserInfo />} />
     <Route path="/list/:list_id/:list_name" element={<ShowList />} />
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
