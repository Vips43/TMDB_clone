import React, { lazy, Suspense, useEffect, useState } from "react";
import useApiStore from "../oth/js_files/store";
import { useParams } from "react-router";
import { Box, Container } from "@mui/material";
import { getPersonFull } from "../oth/js_files/api";
import Loader from "../../../Loader";

const LeftPer = lazy(() => import("./LeftPer"));
const RightPer = lazy(() => import("./RightPer"));

function PersonDetails() {
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const { type, id } = useParams();

 const [info, setInfo] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!id) return;

  const controller = new AbortController();
  const { signal } = controller;

  const loadAll = async () => {
   try {
    setLoading(true);

    // 1. Fetch global person details
    await fetchGlobalAPI(type, id);

    // 2. Fetch full combined credits
    const fullData = await getPersonFull(id, { signal });
    setInfo(fullData);
   } catch (err) {
    if (err.name !== "AbortError") {
     console.error(err);
    }
   } finally {
    setLoading(false);
   }
  };

  loadAll();

  return () => controller.abort();
 }, [id, type]);

 // 🔥 BLOCK UI UNTIL DATA READY
 if (loading) return <Loader />;

 return (
  <Container
   maxWidth="xl"
   sx={{
    py: 2,
    bgcolor: "white",
   }}
  >
   <Box
    sx={{
     display: "grid",
     gridTemplateColumns: {
      xs: "1fr",
      sm: "300px 1fr",
      md: "320px 1fr",
     },
     overflow: "visible",
     gap: 4,
    }}
   >
    <Box>
     <Suspense>
      <LeftPer info={info} />
     </Suspense>
    </Box>
    <Box>
     <Suspense>
      <RightPer infos={info} />
     </Suspense>
    </Box>
   </Box>
  </Container>
 );
}

export default PersonDetails;
