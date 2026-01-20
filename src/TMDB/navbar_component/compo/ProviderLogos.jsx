import { Box, IconButton, Tooltip } from "@mui/material";
import useNavStore from "./NavStore";
import { useState } from "react"; // You can use local state for UI optimization if needed

export default function ProviderLogos() {
 const imgUrl = `https://image.tmdb.org/t/p/original`;
 const providers = useNavStore((s) => s.providers);
 const searchData = useNavStore((s) => s.searchData);
 const setSearchData = useNavStore((s) => s.setSearchData);

 if (!providers) return <div>Select a country to see providers...</div>;

 const handleClick = (provider) => {
  // 1. Get current list from store
  let currentIds = searchData.with_watch_providers
   ? searchData.with_watch_providers.split("|")
   : [];

  const clickedId = String(provider.provider_id);

  // 2. Toggle Logic
  if (currentIds.includes(clickedId)) {
   currentIds = currentIds.filter((id) => id !== clickedId);
  } else {
   currentIds.push(clickedId);
  }

  // 3. Update Store
  const newValue = currentIds.length > 0 ? currentIds.join("|") : null;
  setSearchData({ with_watch_providers: newValue });
 };

 return (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
   {providers.map((provider) => {
    // Check store for selection state
    const isSelected = searchData.with_watch_providers
     ?.split("|")
     .includes(String(provider.provider_id));

    return (
     <Tooltip key={provider.provider_id} title={provider.provider_name} arrow>
      <IconButton
       onClick={() => handleClick(provider)}
       sx={{
        width: "40px",
        height: "40px",
        p: 0,borderRadius:2,
        border: isSelected ? "2px solid #01b4e4" : "2px solid transparent",
        opacity: isSelected ? 1 : 0.5,
       }}
      >
       <Box
        component="img"
        src={`${imgUrl}${provider.logo_path}`}
        sx={{ width: "100%", borderRadius: 1 }}
       />
      </IconButton>
     </Tooltip>
    );
   })}
  </Box>
 );
}