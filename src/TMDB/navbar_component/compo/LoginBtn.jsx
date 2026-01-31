import { Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
 getRequestToken,
 createSession,
 getAccount,
} from "../../oth/js_files/Auth";

function LoginBtn() {
 const [anchorEl, setAnchorEl] = useState(null);
 const [user, setUser] = useState(null);

 const open = Boolean(anchorEl);

 const urlParams = new URLSearchParams(window.location.search);
 const request_token = urlParams.get("request_token");
 const approved = urlParams.get("approved");

 // 🔁 Sync from localStorage on mount
 useEffect(() => {
  const storedUser = localStorage.getItem("TMDB_user");
  if (storedUser) {
   setUser(JSON.parse(storedUser));
  }
 }, []);

 const logged = Boolean(user && user.id);

 const handleLoginClick = async (e) => {
  if (logged) {
   setAnchorEl(e.currentTarget); // open menu
   return;
  }

  const token = await getRequestToken();
  const redirectUrl = `${window.location.origin}`;

  window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${encodeURIComponent(redirectUrl)}`;
 };

 // After redirect: create session + get user
 useEffect(() => {
  const runAuth = async () => {
   if (approved === "true" && request_token) {
    const sessionData = await createSession(request_token);

    if (sessionData?.session_id) {
     const account = await getAccount(sessionData.session_id);
     setUser(account);
    }
    window.history.replaceState({}, document.title, window.location.pathname);
   }
  };

  runAuth();
 }, [approved, request_token]);

 const handleClose = () => {
  setAnchorEl(null);
 };

 const handleLogout = () => {
  localStorage.removeItem("session_id");
  localStorage.removeItem("TMDB_user");
  setUser(null); // 🔥 triggers re-render
  setAnchorEl(null);
 };

 return (
  <div className="ml-auto">
   <Button
    variant="outlined"
    sx={{
     width: "fit-content",
     textTransform: "capitalize",
     ml: "auto",
     color: "white",
    }}
    onClick={handleLoginClick} // ❌ no debounce
   >
    {user ? user.username || "No User" : "Login"}
   </Button>

   <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    slotProps={{
     paper: { style: { width: "20ch" } },
    }}
   >
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
   </Menu>
  </div>
 );
}

export default LoginBtn;
