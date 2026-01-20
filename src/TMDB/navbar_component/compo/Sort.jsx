import React, { useState } from "react";
import Selector from "./Selector";
import { sort_byFunc } from "./Nav";
import { Box, Collapse, Typography } from "@mui/material";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import useNavStore from "./NavStore";

function Sort() {
 const [expanded, setExpanded] = useState(false);
 const sort_by = sort_byFunc();

 const searchData = useNavStore((s) => s.searchData);
 const setSearchData = useNavStore((s) => s.setSearchData);

 const handleSortChange = (val) => {
  setSearchData({ sort_by: val });
 };

 return (
  <Box
   sx={{
    border: "1px solid lightgrey",
    mx: 1,
    borderRadius: 2,
    overflow: "hidden",
    userSelect: "none",
   }}
  >
   <Box
    onClick={() => setExpanded(!expanded)}
    sx={{
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     p: 1.5,
     cursor: "pointer",
     bgcolor: "#f5f5f5",
    }}
   >
    <Typography variant="overline" fontWeight={600} sx={{ lineHeight: 1 }}>
     Sort
    </Typography>
    {expanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
   </Box>

   <Collapse in={expanded} timeout="auto">
    <Box sx={{ p: 1, borderTop: "1px solid lightgrey" }}>
     <Typography
      variant="caption"
      display="block"
      sx={{ mb: 1, color: "text.secondary" }}
     >
      Sort Results By
     </Typography>
     <Selector
      sort_by={sort_by}
      s={true}
      setSelected={handleSortChange}
      selected={searchData.sort_by}
     />
    </Box>
   </Collapse>
  </Box>
 );
}

export default Sort;
