import { capitalize } from "@mui/material";

const TMDB_Key = import.meta.env.VITE_TMDB_KEY;
const TMDB_BEARER = import.meta.env.VITE_TMDB_BEARER;


export function capitalizeFirstLetter(letter) {
  return String(letter).charAt(0).toUpperCase() + String(letter).slice(1);
}

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }
}

export async function getRequestToken() {
  const res = await fetch("https://api.themoviedb.org/3/authentication/token/new",
    {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + TMDB_BEARER,
        accept: "application/json",
      },
    }
  );
  const data = await res.json();
  return data.request_token;
}

export async function createSession(request_token) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + TMDB_BEARER
    },
    body: JSON.stringify({ request_token: request_token })

  };
  const res = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, options)
  const data = await res.json();
  if (!data.success) return;

  localStorage.setItem("session_id", data.session_id)
  return data;
}


export async function setFav(type, id, fav, userId, SESSION_ID) {

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

  console.log(data)
  return data;
}
export async function setWatch(type, id, watch, userId, SESSION_ID) {

  const options = {
    method: 'POST',
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: 'Bearer ' + TMDB_BEARER
    },
    body: JSON.stringify({
      "media_type": type,
      "media_id": id,
      "watchlist": watch,
    }),
  };

  const res = await fetch(`https://api.themoviedb.org/3/account/${userId}/watchlist?session_id=${SESSION_ID}`, options);
  const data = await res.json();

  return data;
}

export async function getFav_Watch(user_id, type, listType, SESSION_ID) {
  const mediaType = type === "movie" ? "movies" : "tv";
  
  const cleanListType = listType.toLowerCase(); // important
  
  const url = `https://api.themoviedb.org/3/account/${user_id}/${cleanListType}/${mediaType}?session_id=${SESSION_ID}`;
  
  console.log("API URL:", url);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + TMDB_BEARER,
    },
  };
  
  const res = await fetch(url, options);
  
  if (!res.ok) {
    throw new Error(`TMDB error: ${res.status}`);
  }
  
  const data = await res.json();
  
  console.log("Response:", data);

  return data;
}

// getFav_Watch(22466989, "movie", "favorite", 'f13b59cf65134ac8a5ad46c9ee220b173db99a26')

export async function getAccount(sessionId) {

  const res = await fetch(`https://api.themoviedb.org/3/account?session_id=${sessionId}`, {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + TMDB_BEARER,
    },
  })
  const data = await res.json();
  localStorage.setItem("TMDB_user", JSON.stringify(data));
  return data;
}

export async function getAccountStates(type, id, session_id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/account_states?session_id=${session_id}&api_key=${TMDB_Key}`,
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

export async function getAccountDetails(user_id, session_id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/account/${user_id}?session_id=${session_id}&api_key=${TMDB_Key}`,
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
// getAccountDetails(22466989, 'bb20922d977e09a05896e13a6c52ebc01ce16912')