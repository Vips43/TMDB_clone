import { Box, Typography } from "@mui/material";
import useApiStore from "../oth/js_files/store";
import img from "/casts.png";
import Socials from "./Socials";

function LeftPer({ info }) {
 const imgUrl = `https://image.tmdb.org/t/p/w342`;
 const globalData = useApiStore((s) => s.globalData);

 console.log(globalData);
 const gender = globalData?.gender == 1 ? "female" : "male";

 const alsoKnownAs = globalData?.also_known_as?.map((name) => name).join(", ");

 const infoArray = [
  { label: "Known For", value: globalData?.known_for_department || "N/A" },
  {
   label: "Known Credits",
   value: info.combined_credits?.cast?.length || "N/A",
  },
  { label: "Gender", value: gender || "N/A" },
  { label: "Birthdate", value: globalData?.birthday || "N/A" },
  { label: "Place of Birth", value: globalData?.place_of_birth || "N/A" },
  { label: "Day of Death", value: globalData?.deathday || "N/A" },
  { label: "Also known As", value: alsoKnownAs || "N/A" },
 ];

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

     {infoArray.map((infos) => (
      <Typography>
       <strong>{infos.label}</strong>
       <br />
       <span className="text-sm ">{infos.value}</span>
      </Typography>
     ))}
    </Box>
   </Box>
  </>
 );
}

export default LeftPer;
