import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";

import { userNav } from "./user";
import UserFav_WatchCard from "./UserFav_WatchCard";
import useUserStore from "./userStore.js";
import { getAccount } from "../oth/js_files/Auth.js";

function UserInfo() {
 const img = `https://image.tmdb.org/t/p/w154`;

 const [activeMenu, setActiveMenu] = useState(null);
 const [user, setUser] = useState(null);

 const selected = useUserStore((state) => state.selected);
 const setSelected = useUserStore((state) => state.setSelected);

 useEffect(() => {
  const sid = localStorage.getItem("session_id");
  const getdata = async () => {
   const users = await getAccount(sid);
   setUser(users);
  };
  getdata();
 }, []);

 const bgAvatar = user?.avatar?.gravatar?.hash
  ? `url(https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash})`
  : "none";

 return (
  <main>
   <header
    className="bg-[#314d64] h-44 grid place-items-center text-white font-semibold bg-cover bg-center"
    style={{ backgroundImage: bgAvatar }}
   >
    <img
     src={
      user?.avatar?.tmdb?.avatar_path
       ? `${img}${user.avatar.tmdb.avatar_path}`
       : "/fallback-avatar.png"
     }
     alt="profile"
     className="h-26 w-26 rounded-full object-cover border"
    />
    <h3>{user?.name || "User"}</h3>
   </header>

   <nav className="border border-gray-300">
    <Container className="p-2 flex text-sm items-center justify-around">
     {userNav.map((item) => (
      <div
       key={item.label}
       className="relative cursor-pointer"
       onMouseEnter={() => setActiveMenu(item.label)}
       onMouseLeave={() => setActiveMenu(null)}
      >
       <span className="flex items-center gap-1">
        {item.label}
        {item.type && (
         <span
          className={`text-[.6rem] transition-transform ${
           activeMenu === item.label ? "rotate-180" : ""
          }`}
         >
          ▼
         </span>
        )}
       </span>

       {activeMenu === item.label && item.type && (
        <div className="absolute top-full left-0 bg-white border border-gray-300 py-2 pr-6 pl-2 rounded shadow-lg z-50">
         {item.type.map((i, index) => {
          const label = typeof i === "string" ? i : i.label;
          const key = typeof i === "string" ? i : i.key;

          return (
           <p
            key={index}
            className="hover:text-blue-400 whitespace-nowrap"
            onClick={() =>
             setSelected({
              text: item.label,
              type: label,
              listType: key,
             })
            }
           >
            {label}
           </p>
          );
         })}
        </div>
       )}
      </div>
     ))}
    </Container>
   </nav>

   <div className="h-full my-4">
    <UserFav_WatchCard>
     <h3 className="font-bold text-2xl">My {selected?.text || "Overview"}</h3>
     <span>Movies</span>
     <span>TV</span>
    </UserFav_WatchCard>
   </div>
  </main>
 );
}

export default UserInfo;
