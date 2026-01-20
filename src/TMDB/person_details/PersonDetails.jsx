import React, { useEffect, useState } from "react";
import useApiStore from "../oth/js_files/store";
import { useParams } from "react-router";
import { Box, Container, Grid, Stack } from "@mui/material";
import LeftPer from "./LeftPer";
import RightPer from "./RightPer";
import { getPersonFull } from "../oth/js_files/api";

function PersonDetails() {
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const isLoading = useApiStore((s) => s.isLoading);
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
   {isLoading ? (
    <div className="text-center text-2xl font-bold mt-20 animate-pulse">
     Loading...
    </div>
   ) : (
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
       <LeftPer info={info} />
      </Box>
      <Box>
       <RightPer infos={info} />
      </Box>
     </Box>
    </Container>
   )}
  </>
 );
}

export default PersonDetails;
