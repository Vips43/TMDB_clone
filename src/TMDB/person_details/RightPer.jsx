import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useApiStore from "../oth/js_files/store";
import { getFindById, getPersonFull } from "../oth/js_files/api";
import { useNavigate, useParams } from "react-router";
import RightOth from "./RightOth";

function RightPer({infos}) {
 const imgUrl = `https://image.tmdb.org/t/p/original`;

 const { id } = useParams();
 const navigate = useNavigate();

 const isLoading = useApiStore((s) => s.isLoading);
 const globalData = useApiStore((s) => s.globalData);
 const [more, setMore] = useState(false);
 const [info, setInfo] = useState([]);
 const [loading, setLoading] = useState(false);

 const imdb_id = globalData.imdb_id;

 useEffect(() => {
  if (!imdb_id) return;
  const controller = new AbortController();
  const signal = controller;

  const getData = async () => {
   setLoading(true);
   const data = await getFindById(imdb_id, { signal });
   setInfo(data.person_results[0]);
   setLoading(false);
  };
  getData();
  return () => controller.abort();
 }, [imdb_id,]);

 return (
  <>
   <Box>
    <Typography fontWeight={600} fontSize="1.8rem" sx={{ mb: 3 }}>
     {" "}
     {globalData.name}
    </Typography>

    <Typography fontWeight="bold" fontSize="1.2rem">
     Biography
    </Typography>

    <Typography
     fontSize="1rem" fontWeight="200"
     className={`${!more ? "line-clamp-7" : "line-clamp-none"}`}
    >
     {globalData?.biography || `We dont have biography for ${globalData.name}`}
    </Typography>
    <strong
     className={`text-cyan-700 cursor-pointer ${more ? "hidden" : "block"}`}
     onClick={() => setMore(true)}
    >
     Read more
    </strong>

    <Box>
     <Typography sx={{ fontSize: "1.125rem", fontWeight: "600", mt: 3 }}>
      Known For
     </Typography>
     <Box sx={{ display: "flex", gap: 1, overflow: "auto" }}>
      {info?.known_for?.map((k,i) => (
       <>
        <Box key={i}
         sx={{ flexShrink: 0, display: "grid", gap: 2, placeItems: "center" }} onClick={()=> navigate(`/tmdbapp/${k?.media_type}/${k?.id}`)}
        >
         <Box
          component="img"
          maxHeight={200}
          src={`${imgUrl}${k?.poster_path}`}
          sx={{ borderRadius: 2 }}
         />
         <Typography sx={{ fontSize: ".75em" }}>
          {k?.name || k?.title || ""}
         </Typography>
        </Box>
       </>
      ))}
     </Box>
     <Box>
       <RightOth info={infos} />
     </Box>
    </Box>
   </Box>
  </>
 );
}

export default RightPer;
