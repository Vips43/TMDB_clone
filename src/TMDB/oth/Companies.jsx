import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchGlobal } from "./js_files/api";
import { useParams } from "react-router";

function Companies({ movie, type }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 return (
  <>
   <Typography variant="h6" fontWeight="600">
    {" "}
    Production Companies
   </Typography>
   <Box
    sx={{
     p: 1,mb:2,
     border: "1px solid lightgrey", borderRadius:2,
     columnCount: { xs: 2, sm: 2, md: 3 }, // responsive columns
     columnGap: "12px",
    }}
   >
    {movie?.production_companies?.map((p) => (
     <Box
      key={p.id}
      sx={{
       background: "#b1b1b1",
       p: "6px",
       mb: "12px", // spacing between items
       boxShadow: "1px 1px 5px #1a191967",
       borderRadius: ".3rem",
       textAlign: "center",
       display: "inline-block", // 🔑 REQUIRED for column layout
       width: "100%",
       breakInside: "avoid", // 🔑 prevents splitting
      }}
     >
      {p.logo_path && (
       <Box
        component="img"
        src={`${imgUrl}${p.logo_path}`}
        sx={{ width: 80, mb: 0.5, mx: "auto" }}
        alt={p.name}
       />
      )}

      <Typography
       sx={{
        fontSize: "0.8rem",
        textDecoration: "underline",
       }}
      >
       {p.name}
      </Typography>
     </Box>
    ))}
   </Box>
   <Box sx={{ border: "1px solid lightgrey", borderRadius:2, p:1 }}>
    <Watch_Provider type={type} />
   </Box>
  </>
 );
}

export default Companies;

function Watch_Provider({ type }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const { id } = useParams();

 const [providers, setProviders] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!id) return;

  const controller = new AbortController();

  const getData = async () => {
   try {
    setLoading(true);

    const data = await fetchGlobal(type, id, "watch/providers");

    const region = data?.results?.IN || data?.results?.US || null;

    setProviders(region);
   } catch (err) {
    console.error("Watch providers error", err);
    setProviders(null);
   } finally {
    setLoading(false);
   }
  };

  getData();
  return () => controller.abort();
 }, [id, type]);

 if (loading) {
  return <Typography sx={{ opacity: 0.7 }}>Loading providers…</Typography>;
 }

 if (!providers) {
  return (
   <Typography sx={{ opacity: 0.7 }}>No watch providers available</Typography>
  );
 }

 const ProviderGrid = ({ title, list }) => {
  if (!list?.length) return null;

  return (
   <Box sx={{ height: "auto", }}>
    <Typography variant="subtitle1" fontWeight={600} sx={{ opacity: 0.7 }}>
     {title}
    </Typography>

    <Box
     sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
      gap: 1,
     }}
    >
     {list.map((p) => (
      <Box
       key={p.provider_id}
       sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
       }}
      >
       {/* LOGO BOX */}
       <Box
        sx={{
         width: 44,
         height: 44,
         background: "#f1f1f1",
         borderRadius: 1,
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
        }}
       >
        {p.logo_path && (
         <Box
          component="img"
          src={`${imgUrl}${p.logo_path}`}
          alt={p.provider_name}
          sx={{
           width: "80%",
           height: "80%",
           objectFit: "contain",
          }}
         />
        )}
       </Box>

       {/* NAME */}
       <Typography
        variant="caption"
        sx={{
         textAlign: "center",
         maxWidth: 72,
         lineHeight: 1.2,
         opacity: 0.7,
         display: "-webkit-box",
         WebkitLineClamp: 2,
         WebkitBoxOrient: "vertical",
         overflow: "hidden",
        }}
       >
        {p.provider_name}
       </Typography>
      </Box>
     ))}
    </Box>
   </Box>
  );
 };

 return (
  <Box sx={{ mt: 2, }}>
   <Typography variant="h6" fontWeight={600} sx={{}}>
    Watch Providers
   </Typography>

   <ProviderGrid title="Stream" list={providers.flatrate} />
   <ProviderGrid title="Rent" list={providers.rent} />
   <ProviderGrid title="Buy" list={providers.buy} />
  </Box>
 );
}
