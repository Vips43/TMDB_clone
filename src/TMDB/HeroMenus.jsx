import { Box, Container, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "./Card";
import useApiStore from "./oth/js_files/store";
import PersonCard from "./PersonCard";
import MenuIcon from "@mui/icons-material/Menu";
import LeftNav from "./navbar_component/LeftNav";
import useNavStore from "./navbar_component/compo/NavStore";
import Loader from "./oth/Loader";

function HeroMenus() {
  const { type, keyVal } = useParams();
  const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
  const globalData = useApiStore((s) => s.globalData);
  const searches = useNavStore((s) => s.searches);
  const setSearchData = useNavStore((s) => s.setSearchData);
  const clearSearches = useNavStore((s) => s.clearSearches);
  const isLoading = useApiStore((s) => s.isLoading);
  const searchTotalPages = useNavStore((s) => s.searchTotalPages);

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (searches.length === 0) {
      setPage(1);
    }
  }, [searches.length]);

  useEffect(() => {
    clearSearches();
    setSearchData({});
  }, [type, keyVal, clearSearches, setSearchData]);

  useEffect(() => {
    if (searches.length === 0) {
      fetchGlobalAPI(type, keyVal, page, searches.length);
    }
  }, [page, type, keyVal, searches.length, fetchGlobalAPI]);

  if (!type) return null;
  if (isLoading) return <Loader />;

  const isSearchMode = searches.length > 0;
  const dataToShow = isSearchMode ? searches : globalData?.results || [];
  const totalPagesToShow = isSearchMode
    ? searchTotalPages
    : globalData?.total_pages || 1;

  return (
    <Container maxWidth="xl" disableGutters>
      {type !== "person" ? (
        <>
          <Box
            onClick={toggleDrawer(true)}
            sx={{
              display: { sm: "none" },
              mt: 1,
              px: 3,
              cursor: "pointer",
            }}
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
          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            <Box
              sx={{
                mr: "auto",
                display: { xs: "none", sm: "block" },
                position: "sticky",
                top: 0,
                height: "fit-content",
                mt: 3,
              }}
            >
              <LeftNav />
            </Box>
            <Box sx={{ flex: 1, maxWidth: "100%" }}>
              <Card
                movie={dataToShow}
                page={page}
                setPage={setPage}
                totalPages={totalPagesToShow}
                active={true}
                card={true}
              />
            </Box>
          </Box>
        </>
      ) : (
        <PersonCard
          page={page}
          person={dataToShow}
          setPage={setPage}
          totalPages={totalPagesToShow}
          active={true}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "1.5rem", m: 2 }}>
            Popular People
          </Typography>
        </PersonCard>
      )}
    </Container>
  );
}

export default HeroMenus;
