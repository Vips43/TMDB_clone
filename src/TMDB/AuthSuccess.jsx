import { useEffect } from "react";

const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;

export default function AuthSuccess() {
  useEffect(() => {
    const createSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const request_token = params.get("request_token");
      const approved = params.get("approved");

      if (!approved || !request_token) {
        console.log("Approval missing");
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
        }
      );

      const data = await res.json();
      console.log("SESSION CREATED:", data);

      if (data.success) {
        localStorage.setItem("TMDB_SESSION", data.session_id);
        localStorage.removeItem("TMDB_Token"); // cleanup
      }
    };

    createSession();
  }, []);

  return <h2>TMDB Login Success. Creating session...</h2>;
}
