import { Box, IconButton, Tooltip } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FaWikipediaW } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { getIds } from "../oth/js_files/api";

function Socials({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      const result = await getIds(id);
      setData(result);
    };

    getData();
  }, [id]);

  if (!data) return null;

  const FB_URL = data.facebook_id
    ? `https://www.facebook.com/${data.facebook_id}`
    : null;

  const INSTA_URL = data.instagram_id
    ? `https://www.instagram.com/${data.instagram_id}`
    : null;

  const TW_URL = data.twitter_id
    ? `https://www.twitter.com/${data.twitter_id}`
    : null;

  const WIKI_URL = data.wikidata_id
    ? `https://www.wikidata.org/wiki/${data.wikidata_id}`
    : null;

  const open = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {TW_URL && (
        <Tooltip title="Twitter">
          <IconButton onClick={() => open(TW_URL)}>
            <TwitterIcon sx={{ color: "#1DA1F2" }} />
          </IconButton>
        </Tooltip>
      )}

      {INSTA_URL && (
        <Tooltip title="Instagram">
          <IconButton onClick={() => open(INSTA_URL)}>
            <InstagramIcon sx={{ color: "#E1306C" }} />
          </IconButton>
        </Tooltip>
      )}

      {FB_URL && (
        <Tooltip title="Facebook">
          <IconButton onClick={() => open(FB_URL)}>
            <FacebookIcon sx={{ color: "#1877F2" }} />
          </IconButton>
        </Tooltip>
      )}

      {WIKI_URL && (
        <Tooltip title="Wikidata">
          <IconButton onClick={() => open(WIKI_URL)}>
            <FaWikipediaW />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default Socials;
