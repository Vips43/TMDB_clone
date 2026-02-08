import { Box, Container } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

import Vote from "../oth/Vote";
import Delete from "./Delete";
import Lists from "./Lists";
import Favourite from "./Favourite";
import Ratings from "./Ratings";

import useUserStore from "./userStore";
import { getFav_Watch } from "../oth/js_files/Auth";

function UserFav_WatchCard({ children }) {
 const img = `https://image.tmdb.org/t/p/w154`;

 const [val, setVal] = useState([]);

 const selected = useUserStore(useShallow((state) => state.selected));
 const setData = useUserStore(useShallow((state) => state.setData));
 const data = useUserStore(useShallow((state) => state.data));
 const setDataLoader = useUserStore(useShallow((state) => state.setDataLoader));
 const dataLoader = useUserStore(useShallow((state) => state.dataLoader));

 useEffect(() => {
  if (!selected?.listType) return;

  const user = JSON.parse(localStorage.getItem("TMDB_user"));
  const session_ID = localStorage.getItem("session_id");

  const getData = async () => {
   setDataLoader(true);

   try {
    const datas = await getFav_Watch(
     user.id,
     selected.listType,
     selected.text,
     session_ID,
    );

    const results = datas?.results || [];
    setData(results);
    setVal(results.map((d) => d.id));
   } catch (error) {
    console.log("error", error);
   } finally {
    setDataLoader(false);
   }
  };

  getData();
 }, [selected, setData, setDataLoader]);

 if (dataLoader) return <div>Loading...</div>;

 return (
  <Container maxWidth="lg">
   <div>{children}</div>

   <main className="flex flex-col gap-4">
    {data?.map((d) => {
     const type = d?.title ? "movie" : "tv";
     const isTrue = val.includes(d.id);
     const rating = Math.floor((d.rating || 0) * 10);

     return (
      <Box
       key={d.id}
       sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid lightgray",
        borderRadius: "10px",
        overflow: "hidden",
       }}
      >
       {/* Top content */}
       <Box
        sx={{
         display: "flex",
         gap: { xs: 1, sm: 2 },
         // p: { xs: 1, sm: 2 },
        }}
       >
        <Box
         component="img"
         loading="lazy"
         src={`${img}${d.poster_path}`}
         sx={{
          width: { xs: 90, sm: 120 },
          height: { xs: 135, sm: 180 },
          objectFit: "cover",
          border: "1px solid lightgray",
          flexShrink: 0,
         }}
        />

        <Box
         sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          minWidth: 0,
          p: { xs: 1, sm: 2 },
         }}
        >
         <div className="flex gap-2">
          <Vote vote={Math.floor(d.vote_average * 10)} />

          <p className="grid text-sm sm:text-base">
           <strong className="truncate">
            {d.name || d.title}
            <span className="text-neutral-400 font-normal">
             ({d.original_name || d.original_title})
            </span>
           </strong>

           <span className="text-neutral-400 text-xs sm:text-sm">
            {d.first_air_date || d.release_date || ""}
           </span>
          </p>
         </div>

         <p className="line-clamp-3 text-xs sm:text-sm">{d.overview}</p>
        </Box>
       </Box>

       {/* Bottom action bar */}
       <Box
        sx={{
         borderTop: "1px solid #e5e5e5",
         px: { xs: 1, sm: 2 },
         py: 1,
        }}
       >
        <div className="flex flex-wrap justify-between sm:justify-start gap-2">
         <Ratings rating={rating} id={d.id} type={type} />
         <Lists id={d.id} type={type} />
         <Favourite id={d.id} type={type} isTrue={isTrue} />
         <Delete id={d.id} type={type} />
        </div>
       </Box>
      </Box>
     );
    })}
   </main>
  </Container>
 );
}

export default UserFav_WatchCard;
