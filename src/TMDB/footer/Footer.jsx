import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ title, items }) => (
 <Box sx={{ color: "white", fontSize: "0.9rem", minWidth: 160 }}>
  <Typography
   sx={{
    fontWeight: 800,
    mb: 1,
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: 0.5,
   }}
  >
   {title}
  </Typography>

  {items.map((item) => (
   <Typography
    key={item}
    variant="subtitle2"
    sx={{ opacity: 0.85, cursor: "pointer", "&:hover": { opacity: 1 } }}
   >
    {item}
   </Typography>
  ))}
 </Box>
);

function Footer() {
 const navigate = useNavigate();
 const [user, setUser] = useState([]);
 useEffect(() => {
  const u = JSON.parse(localStorage.getItem("TMDB_user"));

  if (!u) return;

  setUser(u);
 }, []);

 return (
  <>
   <Box
    sx={{
     bgcolor: "#031f36",
     p: 2,
    }}
   >
    <Container
     sx={{
      display: "flex",
      justifyContent: "center",
      gap: 3,
     }}
    >
     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box component="img" src="/TMDB_logo2.svg" sx={{ width: "100px" }} />
      <Typography
       sx={{
        color: "#008B8B",
        bgcolor: "white",
        p: 1,
        textAlign: "right",
        fontWeight: "800",
        textTransform: "capitalize",
        borderRadius: "7px",
        whiteSpace:"nowrap",
       }}
       onClick={()=> navigate(`/user`)}
      >
       Hi <br /> {user.name + " !" || user.username + "!" || ""}
      </Typography>
     </Box>
     <Box
      sx={{
       display: "flex",
       flexWrap: "wrap",
       justifyContent: "space-between",
       gap: 2,
      }}
     >
      <Section
       title="The Basics"
       items={[
        "About TMDB",
        "Contact Us",
        "API Documentation",
        "API for Business",
        "System Status",
       ]}
      />

      <Section
       title="Get Involved"
       items={["Contribution Bible", "Add New Movie", "Add New TV Show"]}
      />

      <Section
       title="Community"
       items={["Guidelines", "Discussions", "Leaderboard", "Support Forums"]}
      />

      <Section
       title="Legal"
       items={[
        "Terms of Use",
        "API Terms of Use",
        "Privacy Policy",
        "DMCA Policy",
       ]}
      />
     </Box>
    </Container>
   </Box>
  </>
 );
}

export default Footer;
