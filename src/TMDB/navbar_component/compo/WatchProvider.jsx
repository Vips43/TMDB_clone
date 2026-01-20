import { Box, Collapse, Typography } from "@mui/material";
import ProviderLogos from "./ProviderLogos";
import Selector from "./Selector";
import { useEffect, useState } from "react";
import { fetchCountries } from "../../oth/js_files/api";
import useNavStore from "./NavStore";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

function WatchProvider() {
 const [expanded, setExpanded] = useState(false);

 const setCountry = useNavStore((s) => s.setCountry);
 const country = useNavStore((s) => s.country);
 const searchData = useNavStore((s) => s.searchData);
 const setSearchData = useNavStore((s) => s.setSearchData);
 const setProviders = useNavStore((s) => s.setProviders);
 const selected = useNavStore((s) => s.selected);
 const setSelected = useNavStore((s) => s.setSelected);

 useEffect(() => {
  const getData = async () => {
   const data = await fetchCountries();
   setCountry(data);
  };
  getData();
 }, []);

 useEffect(() => {
  setProviders(selected);
 }, [selected]);

 const handleCountryChange = (val) => {
  setSearchData({ watch_region: val, with_watch_providers: null });
 };

 return (
  <>
   <Box
    sx={{
     border: "1px solid lightgrey",
     borderRadius: 2,
     mx: 1,
     display: "grid",
     justifyItems: "center",
    }}
   >
    <Typography
     variant="overline"
     fontWeight={600}
     sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      px: 1,
      py: 0.5,
      borderBottom: "1px solid lightgrey",
      cursor:"pointer"
     }}
     onClick={() => setExpanded(!expanded)}
    >
     Where to Watch
     {expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
    </Typography>
    <Collapse in={expanded} timeout="auto">
     <Typography sx={{ fontSize: ".8rem", mt: 1, ml: 1 }}>
      Search by Watch Providers
     </Typography>
     <Selector
      country={country}
      c={true}
      selected={searchData.watch_region}
      setSelected={handleCountryChange}
     />
     <Box
      sx={{
       display: "flex",
       justifyContent: "center",
       gap: 0.5,
       my: 2,
       flexWrap: "wrap",
       maxHeight: "200px",
       overflow: "auto",
      }}
      className="no-scrollbar"
     >
      <ProviderLogos />
     </Box>
    </Collapse>
   </Box>
  </>
 );
}

export default WatchProvider;
