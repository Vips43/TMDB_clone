import { capitalize } from "@mui/material";

const TMDB_Key = import.meta.env.VITE_TMDB_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;


export function capitalizeFirstLetter(letter) {
  return String(letter).charAt(0).toUpperCase() + String(letter).slice(1);
}


export async function getRequestToken() {
  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/token/new",
    {
      headers: {
        Authorization: "Bearer " + TMDB_BEARER,
        accept: "application/json",
      },
    }
  );
  const data = await res.json();
  return data.request_token;
}


export async function setFav_Watch(type, id, fav, userId, SESSION_ID) {

  const options = {
    method: 'POST',
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: 'Bearer ' + TMDB_BEARER
    },
    body: JSON.stringify({
      media_type: type,
      media_id: id,
      favorite: fav,
    }),
  };

  const res = await fetch(`https://api.themoviedb.org/3/account/${userId}/favorite?session_id=${SESSION_ID}`, options);
  const data = await res.json();
  return data;
}

export async function getFav_Watch() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + TMDB_BEARER
    }
  };

  const res = await fetch('https://api.themoviedb.org/3/account/22466989/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', options)
  const data = await res.json();
  console.log(data)
}

export async function Auth() {
  const session_id = localStorage.getItem("TMDB_SESSION")

  const options = {
    headers: { Authorization: 'Bearer ' + TMDB_BEARER }
  };

  const res = await fetch(`https://api.themoviedb.org/3/account?session_id=${session_id}`, options)
  const data = await res.json();

  localStorage.setItem("TMDB_AC", JSON.stringify(data.id))
}

export async function getAccountStates(type, id, session_id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/account_states?session_id=${session_id}`,
    {
      headers: {
        Authorization: "Bearer " + TMDB_BEARER,
        accept: "application/json",
      },
    }
  );
  const data = await res.json();
  return data
}