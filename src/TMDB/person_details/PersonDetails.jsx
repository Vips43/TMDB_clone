import React, { lazy, Suspense, useEffect, useState } from "react";
import useApiStore from "../oth/js_files/store";
import { useParams } from "react-router";
import { Box, Container } from "@mui/material";
import { getPersonFull } from "../oth/js_files/api";

const LeftPer = lazy(() => import("./LeftPer"));
const RightPer = lazy(() => import("./RightPer"));

function PersonDetails() {
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const { type, id } = useParams();

 const [info, setInfo] = useState([]);

 useEffect(() => {
  fetchGlobalAPI(type, id);
 }, [id]);

 useEffect(() => {
  if (!id) return;
  const controller = new AbortController();
  const signal = controller;

  const getData = async () => {
   const fullData = await getPersonFull(id, { signal });
   setInfo(fullData);
  };
  getData();
  return () => controller.abort();
 }, [id]);

 return (
  <>
  
    <Container
     maxWidth="xl"
     sx={{
      py: 2,
      minHeight: "100vh",
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
      <Box
       sx={{
        // 1. Sticky Logic
        position: { xs: "static", sm: "sticky" },
        top: 10,
        alignSelf: "start",
       }}
      >
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
  </>
 );
}

export default PersonDetails;
