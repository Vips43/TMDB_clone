import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Section = ({ title, items }) => (
  <Box
    sx={{
      color: "white",
      fontSize: "0.9rem",
      minWidth: 130,
      textAlign: "center",
    }}
  >
    <Typography
      sx={{
        fontWeight: 800,
        mb: 1.5,
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
        sx={{
          opacity: 0.85,
          cursor: "pointer",
          mb: 0.5,
          "&:hover": { opacity: 1 },
        }}
      >
        {item}
      </Typography>
    ))}
  </Box>
);

function Footer({ user }) {
  const navigate = useNavigate();

  const displayName = user?.name || user?.username || "User";

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#031f36",
        p: { xs: 1, md: 3 },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          gap: { xs: 4, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row", md: "column" },
            gap: { xs: 5, md: 2 },
          }}
        >
          <Box
            component="img"
            src="/TMDB_logo2.svg"
            alt="TMDB Logo"
            sx={{ width: "100px", alignSelf: { xs: "center", md: "flex-end" } }}
          />
          <Typography
            sx={{
              color: "#008B8B",
              bgcolor: "white",
              p: 1,
              textAlign: "center",
              fontWeight: "800",
              textTransform: "capitalize",
              borderRadius: "7px",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
            onClick={() => {
              user
                ? navigate(`/user`)
                : alert("It seems you are not logged in. Please log in.");
            }}
          >
            Hi <br /> {user ? `${displayName}!` : "User"}
          </Typography>
        </Box>

        <Box
          sx={{
            gap: 2,
            flex: 1,
            display: "grid",
            width: "100%",
            gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
            ml: { md: "auto" },
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
            items={[
              "Guidelines",
              "Discussions",
              "Leaderboard",
              "Support Forums",
            ]}
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
  );
}

export default Footer;
