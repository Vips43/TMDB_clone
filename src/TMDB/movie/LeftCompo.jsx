import { Box, Button, Typography } from "@mui/material";
import Cast from "../show/Cast";
import { Link, useParams } from "react-router";
import Reviews from "../show/Reviews";
import Images from "../oth/Images";
import Videos from "../show/Videos";
import Similar from "../oth/Similar";

function LeftCompo({ cast, type, imgUrl }) {
 const { id } = useParams();

 return (
  <>
   
   <Box sx={{ flex: 1, minWidth: 0 }}>
    <Typography variant="h5" fontWeight={600} mb={1}>
     Series Cast
    </Typography>

    <Cast cast={cast} url={imgUrl} />
    <Button
     component={Link}
     to={`/tmdbapp/${type}/${id}/cast`}
     variant="text"
     disableRipple
     sx={{
      textTransform: "none",
      width: "fit-content",
      color: "text.primary",
      transition: "all .3s ease-in-out",
      fontWeight: "600",
      fontSize: "1rem",

      "&:hover": {
       backgroundColor: "lightgrey",
       textDecoration: "underline",
       opacity: 0.7,
      },

      "&:active": {
       backgroundColor: "transparent",
      },
     }}
    >
     Full Cast&Crew →
    </Button>
    <Box sx={{ pt: 3, px: 2 }}>
     <Typography fontWeight={600} fontSize={"1.25rem"}>
      {" "}
      Reviews
     </Typography>
     <Reviews type={type} />
     <Images type={type} imgUrl={imgUrl} />
     <Videos type={type} />
     <Similar type={type} />
    </Box>
    
   </Box>
  </>
 );
}

export default LeftCompo;
