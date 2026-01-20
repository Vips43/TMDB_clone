import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchImages } from "./js_files/api";

function Images({ type = "movie", imgUrl }) {
 const { id } = useParams(); // unused for now

 const [active, setActive] = useState("backdrops");
 const [visibleCount, setVisibleCount] = useState(5);
 const [loading, setLoading] = useState(false);

 const [images, setImages] = useState({
  backdrops: [],
  posters: [],
  logos: [],
 });

const data = (images[active] || []).slice(0, visibleCount);

const handleShowMore=()=>{
    setVisibleCount((prev)=> prev+10)
}

 const tabs = [
  { label: "Backdrops", key: "backdrops" },
  { label: "Posters", key: "posters" },
  { label: "Logos", key: "logos" },
 ];

 useEffect(() => {
  const getData = async () => {
   setLoading(true);
   try {
    let data = await fetchImages(id, type);

    setImages(data);
   } catch (error) {
    console.error("Images fetch error:", error);
   } finally {
    setLoading(false);
   }
  };
  getData();
 }, [id, type]);

 if(loading) return <h4 className="text-2xl font-bold text-center mt-20 animate-pulse">Loading...</h4>

 return (
  <>
   <Box sx={{ height:"225px", mb:2, }}>
    {/* TABS */}
    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
     <Typography fontWeight="600" sx={{ fontSize: "1.25rem" }}>
      Media
     </Typography>
     {tabs.map((tab) => (
      <Typography
       key={tab.key}
       onClick={() => {setActive(tab.key); setVisibleCount(5)}}
       sx={{
        textTransform: "none",
        fontSize: ".75rem",
        textDecoration: active === tab.key ? "underline" : "none",
        "&:hover": {
         background: "transparent",
         color: "black",
         cursor: "pointer",
        },
       }}
      >
       {tab.label} (<span className="opacity-60">{images[tab.key].length}</span>
       )
      </Typography>
     ))}
    </Box>

    {/* GRID */}
    <Box
     sx={{
      overflow: "auto",
      height: "fit-content",
      background: "grey",
      borderRadius: 2,
     }}
     className="no-scrollbar"
    >
     <Box
      sx={{
       display: "flex",
       gap: 1,
      }}
     >
      {data.map((img, i) => (
       <Box
        key={i}
        component="img"
        src={`${imgUrl}${img.file_path}`}
        alt=""
        sx={{
         flexShrink: 0,
         maxHeight:"200px",
         objectFit:"contain",
         background: "white",
         cursor: "pointer",
         transition: "transform .2s ease",
        }}
       />
      ))}
      <Box
       onClick={handleShowMore}
       sx={{
        whiteSpace: "nowrap",
        display: "grid",
        placeItems: "center",
        px: 2,
       }}
      >
       Show More →{" "}
      </Box>
     </Box>
    </Box>
   </Box>

  </>
 );
}

export default Images;
