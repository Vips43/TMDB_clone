import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaListUl,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { getFav_Watch, setFav, setWatch } from "./js_files/Auth";
import useApiStore from "./js_files/store";

function ActionButtons({ type, id }) {
  const [user, setUser] = useState(null);
  const [sId, setSId] = useState(null);

  const status = useApiStore((s) => s.status);
  const setStatus = useApiStore((s) => s.setStatus);

  /* ---------- init user + session ---------- */
  useEffect(() => {
    const u = localStorage.getItem("TMDB_user");
    const sid = localStorage.getItem("session_id");
    if (u) setUser(JSON.parse(u).id);
    if (sid) setSId(sid);
  }, []);

  /* ---------- hydrate from server ---------- */
  useEffect(() => {
    if (!user || !sId || !id) return;
    const mediaId = Number(id)

    const hydrate = async () => {
      try {
        const [favRes, watchRes] = await Promise.all([
          getFav_Watch(user, type, "favorite", sId),
          getFav_Watch(user, type, "watchlist", sId),
        ]);

        const favIds = favRes?.results?.map((r) => r.id) || [];
        const watchIds = watchRes?.results?.map((r) => r.id) || [];

        setStatus({
          fav: favIds.includes(mediaId),
          watch: watchIds.includes(mediaId),
        });
        console.log(status,favIds,mediaId)
      } catch (e) {
        console.error("Hydration failed", e);
      }
    };

    hydrate();
  }, [user, sId, id, type, setStatus]);

  /* ---------- USER ACTION ONLY ---------- */
  const handleToggle = async (key) => {
    if (!user || !sId) return;

    const next = !status[key];

    // optimistic UI
    setStatus({ [key]: next });

    try {
      if (key === "fav") {
        await setFav(type, id, next, user, sId);
      }

      if (key === "watch") {
        await setWatch(type, id, next, user, sId);
      }
    } catch (e) {
      // rollback on failure
      setStatus({ [key]: !next });
      console.error("Update failed", e);
    }
  };

  const actions = [
    {
      id: "list",
      icon: <FaListUl />,
      label: "List",
    },
    {
      id: "fav",
      icon: status.fav ? (
        <FaHeart style={{ color: "#ef47b6" }} />
      ) : (
        <FaRegHeart />
      ),
      label: "Favorite",
    },
    {
      id: "watch",
      icon: status.watch ? (
        <FaBookmark style={{ color: "#cf3131" }} />
      ) : (
        <FaRegBookmark />
      ),
      label: "Watchlist",
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {actions.map((a) => (
        <Tooltip key={a.id} title={a.label} arrow>
          <IconButton
            onClick={() => handleToggle(a.id)}
            sx={{
              backgroundColor: "#032541",
              color: "white",
              width: 30,
              height: 30,
              "&:hover": {
                backgroundColor: "white",
                color: "#032541",
              },
            }}
          >
            {a.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}

export default ActionButtons;
