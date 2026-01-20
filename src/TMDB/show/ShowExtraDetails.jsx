import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import useApiStore from "../oth/js_files/store";
import RightCompo from "../movie/RightCompo";
import LeftCompo from "../movie/LeftCompo";

function ShowExtraDetails({ url, movieDetail }) {
 const { id } = useParams();
 const setCasts = useApiStore((state) => state.setCasts);
 const casts = useApiStore((state) => state.casts);
 const type = "tv";

 useEffect(() => {
  if (id) setCasts(id, type);
 }, [id, setCasts]);
 if (!casts) return null;
 return (
  <>
   <Box
    sx={{
        background:"white",
     px: 2,
     display:"grid", gridTemplateColumns:"1fr 1fr", gap:1,
    }}
   >
    <LeftCompo cast={casts} type={type} imgUrl={url} />
    <RightCompo movie={movieDetail} type={type} />
   </Box>
   
  </>
 );
}

export default ShowExtraDetails;
