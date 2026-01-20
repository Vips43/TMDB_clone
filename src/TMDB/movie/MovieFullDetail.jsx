import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCast } from "../oth/js_files/api.js";
import LeftCompo from "./LeftCompo.jsx";
import RightCompo from "./RightCompo.jsx";
import useApiStore from "../oth/js_files/store.js";

function MovieFullDetail({ movie }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();
 const type = "movie";

 // ✅ stable shape
 const [cast, setCast] = useState({ cast: [], crew: [] });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const setDirectorInfo = useApiStore((state) => state.setDirectorInfo);

 useEffect(() => {
  if (!id) return;

  const controller = new AbortController();

  const getData = async () => {
   try {
    setLoading(true);
    setError(null);

    const { data, dir, topCrew } = await fetchCast(id, type, "credits");

    if (!controller.signal.aborted) {
     setDirectorInfo({ name: dir, topCrew, data });
     setCast(data || { cast: [], crew: [] });
    }
   } catch (err) {
    if (!controller.signal.aborted) {
     setError("Failed to load cast");
    }
   } finally {
    if (!controller.signal.aborted) {
     setLoading(false);
    }
   }
  };
  getData();
  return () => controller.abort();
 }, [id, type, setDirectorInfo]); // Added setDirectorInfo to dependency array

 // 🔹 Loading state
 if (loading) {
  return (
   <div className="text-2xl font-bold grid place-items-center animate-pulse">
    Loading...
   </div>
  );
 }

 // 🔹 Error state
 if (error) {
  return <div className="text-center text-red-500 font-semibold">{error}</div>;
 }

 // 🔹 Empty state
 if (!cast.cast.length && !cast.crew.length) {
  return (
   <div className="text-center opacity-60">No cast information available</div>
  );
 }

 return (
  <Box
   sx={{
    display: "grid",
    p: 1,
    gap: 1,
    background: "white",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
   }}
  >
   <LeftCompo cast={cast} type={type} imgUrl={imgUrl} />
   <RightCompo movie={movie} type={type} />
  </Box>
 );
}

export default MovieFullDetail;
