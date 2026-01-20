import { Box, Typography } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import useApiStore from "../oth/js_files/store";

function LeftPer({ info }) {
 const imgUrl = `https://image.tmdb.org/t/p/original`;
 const globalData = useApiStore((s) => s.globalData);

 const gender = globalData?.gender == 1 ? "female" : "male";

 return (
  <>
   <Box sx={{}}>
    <Box
     sx={{
      width: "100%",
      bgcolor: "white",
      p: { xs: 0, sm: 0 },
      mb: 10,
      position: { xs: "sticky", xm: "static" },
      top: 0,
     }}
    >
     <Box
      component="img"
      src={`${imgUrl}${globalData?.profile_path}`}
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
      <Box sx={{ display: "flex", gap: 2 }}>
       <TwitterIcon />
       <InstagramIcon />
       <FacebookIcon />
      </Box>
     </Box>
    </Box>
    <Box sx={{ fontSize: "1rem", display: "grid", gap: 2, overflow: "auto" }}>
     <Typography fontWeight={600} fontSize="1.5rem">
      Personal Info
     </Typography>
     <Typography>
      <strong>Known For</strong>
      <br />
      {globalData?.known_for_department}
     </Typography>
     <Typography>
      <strong>Known Credits</strong>
      <br />
      {info.combined_credits?.cast?.length}
     </Typography>
     <Typography>
      <strong>Gender</strong>
      <br />
      {gender}
     </Typography>
     <Typography>
      <strong>Birthdate</strong>
      <br />
      {globalData?.birthday}
     </Typography>
     {globalData?.deathday && (
      <Typography>
       <strong>Day of Death</strong>
       <br />
       {globalData?.deathday}
      </Typography>
     )}
     <Typography>
      <strong>Place of Birth</strong>
      <br />
      {globalData?.place_of_birth}
     </Typography>
     <Typography>
      <strong>Also known As</strong>
      <br />
      {globalData?.also_known_as?.map((name) => (
       <span>
        {name}, <br />
       </span>
      ))}
     </Typography>
    </Box>
   </Box>
  </>
 );
}

export default LeftPer;
