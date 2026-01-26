import { Box, Container, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "./Card";
import useApiStore from "./oth/js_files/store";
import PersonCard from "./PersonCard";
import MenuIcon from "@mui/icons-material/Menu";
import LeftNav from "./navbar_component/LeftNav";
import Loader from "../../Loader";
import useNavStore from "./navbar_component/compo/NavStore";

function HeroMenus() {
 const { type, keyVal } = useParams();
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const globalData = useApiStore((s) => s.globalData);
 const searches = useNavStore((s) => s.searches);
 const searchData = useNavStore((s) => s.searchData);
 const isLoading = useApiStore((s) => s.isLoading);

 const [page, setPage] = useState(1);
 const [open, setOpen] = useState(false);

 const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
 };
 if (!type) return;

 useEffect(() => {
  setPage(1);
 }, [type, keyVal]);

 useEffect(() => {
  fetchGlobalAPI(type, keyVal, page);
 }, [page, type, keyVal]);

 
 const dataToShow = searches.length > 0 ? searches : globalData.results;

 if (isLoading) return <Loader />;

 return (
  <>
   <Container maxWidth="xl" disableGutters>
    {type && type != "person" ? (
     <>
      <Box
       onClick={toggleDrawer(true)}
       sx={{ display: { sm: "none" }, mt: 1, px: 5 }}
      >
       <MenuIcon />
      </Box>
      <Drawer
       sx={{ display: { sm: "none" } }}
       open={open}
       onClose={toggleDrawer(false)}
      >
       <LeftNav />
      </Drawer>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
       <Box
        sx={{
         mr: "auto",
         display: { xs: "none", sm: "block" },
         position: "sticky",
         top: 0,
        }}
        className="sticky! top-0"
       >
        <LeftNav />
       </Box>
       <Card
        movie={dataToShow}
        page={page}
        setPage={setPage}
        totalPages={globalData.total_pages}
        active={true}
       >
        <Typography></Typography>
       </Card>
      </Box>
     </>
    ) : (
     <PersonCard
      page={page}
      person={dataToShow}
      setPage={setPage}
      totalPages={globalData.total_pages}
      active={true}
     >
      <Typography sx={{ fontWeight: "600", fontSize: "1.5rem", m: 2 }}>
       Popular Peoples
      </Typography>
     </PersonCard>
    )}
   </Container>
  </>
 );
}

export default HeroMenus;
