import { Box, Typography } from "@mui/material";
import useApiStore from "../oth/js_files/store";
import img from "/casts.png";
import Socials from "./Socials";

function LeftPer({ info }) {
 const imgUrl = `https://image.tmdb.org/t/p/original`;
 const globalData = useApiStore((s) => s.globalData);

 const gender = globalData?.gender == 1 ? "female" : "male";

 return (
  <>
   <Box>
    <Box
     sx={{
      width: "100%",
      bgcolor: "white",
      p: { xs: 0, sm: 0 },
      mb: { xs: 10, sm: 2 },
      top: 0,
     }}
    >
     <Box
      component="img"
      src={
       globalData?.profile_path ? `${imgUrl}${globalData?.profile_path}` : img
      }
      sx={{ width: { xs: "45%", sm: "100%" }, mx: "auto", borderRadius: 3 }}
     />
     <Box sx={{ display: { xs: "grid", sm: "none" }, placeItems: "center" }}>
      <Typography
       fontWeight={600}
       fontSize="1.5rem"
       sx={{ display: { xs: "block" }, textAlign: "center" }}
      >
       {globalData?.name}
      </Typography>
      <Socials id={globalData.id} />
     </Box>
    </Box>
    <Box
     sx={{ fontSize: "1rem", display: "grid", gap: 2, px: 2, overflow: "auto" }}
    >
     <Typography fontWeight={600} fontSize="1.5rem">
      Personal Info
     </Typography>
      <Box sx={{display:{xs:"none", sm:"block"}}}>
     <Socials id={globalData.id} />
      </Box>
     <Typography>
      <strong>Known For</strong>
      <br />
      {globalData?.known_for_department || "N/A"}
     </Typography>
     <Typography>
      <strong>Known Credits</strong>
      <br />
      {info.combined_credits?.cast?.length || "N/A"}
     </Typography>
     <Typography>
      <strong>Gender</strong>
      <br />
      {gender || "N/A"}
     </Typography>
     <Typography>
      <strong>Birthdate</strong>
      <br />
      {globalData?.birthday || "N/A"}
     </Typography>
     {globalData?.deathday && (
      <Typography>
       <strong>Day of Death</strong>
       <br />
       {globalData?.deathday || "N/A"}
      </Typography>
     )}
     <Typography>
      <strong>Place of Birth</strong>
      <br />
      {globalData?.place_of_birth || "N/A"}
     </Typography>
     <Typography>
      {globalData?.also_known_as && (
       <>
        <strong>Also known As</strong>
        <br />
        {globalData?.also_known_as?.map((name,i) => (
         <span key={i}>
          {name}, <br />
         </span>
        ))}
       </>
      )}
     </Typography>
    </Box>
   </Box>
  </>
 );
}

export default LeftPer;
