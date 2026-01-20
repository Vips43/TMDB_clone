import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Pagination, Stack } from "@mui/material";
import img from "/casts.png";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "./oth/js_files/Auth";

function PersonCard(props) {
 const { person, children, totalPages, page, setPage } = props;

 const imgUrl = "https://image.tmdb.org/t/p/w342";
 const navigate = useNavigate();

 const {type, keyVal} = useParams();
 console.log(type)
 useEffect(() => {
    let types = capitalizeFirstLetter(type);
    let key = capitalizeFirstLetter(keyVal);
  document.title = `${key} ${types}`;
 }, []);
 console.log(person);
 if (!person) return <p>no data</p>;

 return (
  <Box
   sx={{
    m: 4,
   }}
  >
   {children}

   <Box
    sx={{
     display: "flex",
     justifyContent:"center",
     flexWrap: "wrap",
     p: 1,
     gap: 2,
    }}
    className="no-scrollbar"
   >
    {person?.map((per,i) => (
     <Box
     key={i}
      sx={{
       flexShrink: 0,
       flexBasis: "140px",
       boxShadow: "2px 2px 5px grey",
       cursor: "pointer",
       borderRadius: 3,
       transition: "transform 0.2s",
       "&:hover": {
        opacity: 0.75,
       },
      }}
      onClick={() => {
       console.log("hello from persons", per.name);
       navigate(`/tmdbapp/person/${per.id}/${per.name}`)
      }}
     >
      {/* IMAGE */}
      <Box sx={{ position: "relative" }}>
       <Box
        component="img"
        src={`${imgUrl}${per?.profile_path}` || `${img}`}
        alt={per.name}
        sx={{
         width: "100%",
         aspectRatio: "2 / 3",
         borderRadius: 1,
         borderBottomRightRadius: 1,
         borderBottomLeftRadius: 1,
        }}
       />

       <Box sx={{ position: "absolute", bottom: -16, left: 8 }}>
        {/* <Vote vote={Math.floor(d.vote_average * 10)} /> */}
       </Box>
      </Box>

      {/* TEXT */}
      <Box sx={{ mt: 3, width: 130, px: 1 }}>
       <Typography fontSize="0.9rem" fontWeight={600}>
        {per.name}
       </Typography>
       <Typography fontSize="0.75rem" color="text.secondary">
        {per.known_for?.map((kno) => kno.name||"").join(" ")}
        {per.known_for?.map((kno) => kno.title||"").join(", ")}
       </Typography>
      </Box>
     </Box>
    ))}
   </Box>

   <Box sx={{ width: "100%", display: "flex", mt: 2, mb: 5 }}>
    <Stack spacing={2} sx={{ mx: "auto" }}>
     <Pagination
      count={totalPages}
      page={page}
      onChange={(e, val) => {
       setPage(val);
      }}
      shape="rounded"
     />
    </Stack>
   </Box>
  </Box>
 );
}

export default PersonCard;
