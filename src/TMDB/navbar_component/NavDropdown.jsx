import * as React from "react";
import { Typography, Menu, MenuItem } from "@mui/material";

function NavDropdown({ label, items, onSelect }) {
 const [anchorEl, setAnchorEl] = React.useState(null);

 const handleClose = () => {
  document.activeElement?.blur();  // release focus safely
  setAnchorEl(null);
 };

 return (
  <>
   <Typography
    onClick={(e) => setAnchorEl(e.currentTarget)}
    sx={{
     color: "#fff",
     fontSize: "0.85rem",
     cursor: "pointer",
     px: 0.5,
     whiteSpace: "nowrap",
     userSelect: "none",
     "&:hover": { opacity: 0.7 },
    }}
   >
    {label}
   </Typography>

   <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    disableRestoreFocus
    disableAutoFocusItem
    disableEnforceFocus
    disablePortal
    keepMounted
   >
    {items.map((item) => (
     <MenuItem
      key={item.key}
      onClick={() => {
       onSelect(item.key);
       handleClose();
      }}
      sx={{ fontSize: "0.8rem" }}
     >
      {item.label}
     </MenuItem>
    ))}
   </Menu>
  </>
 );
}

export default NavDropdown;
