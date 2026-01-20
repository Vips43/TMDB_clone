import React, { useEffect } from "react";
import { getRequestToken } from "./oth/js_files/Auth";

function Dashboard() {
 useEffect(() => {
  const createSession = async () => {
   const params = new URLSearchParams(window.location.search);
   const approved = params.get("approved");
   const request_token = params.get("request_token");

   if (!approved || !request_token) {
    console.log("User did not approve login");
    return;
   }

   const res = await fetch(
    "https://api.themoviedb.org/3/authentication/session/new",
    {
     method: "POST",
     headers: {
      Authorization: "Bearer " + TMDB_BEARER,
      "Content-Type": "application/json",
     },
     body: JSON.stringify({ request_token }),
    },
   );
   const data = await res.json();
   console.log("Session Created:", data);

   if (data.success) {
    localStorage.setItem("TMDB_SESSION", data.session_id);
   }
  };

  createSession();
 }, []);

 const login = async () => {
  const token = await getRequestToken();
  window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:5173/tmdbapp`;
 };

 return (
  <>
   <div>
    <h3>Dashboard</h3>
    <h2>Logging you in with TMDB...</h2>;<button onClick={login}>login</button>
   </div>
  </>
 );
}

export default Dashboard;
