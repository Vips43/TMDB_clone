import React, { useEffect } from "react";
import Vote from "../oth/Vote";
import { Container } from "@mui/material";
import useUserStore from "./userStore";
import { useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addListItems } from "../oth/js_files/api";

function ShowList() {
 const { list_id } = useParams();
 const lists = useUserStore((state) => state.lists);
 const listsIds = lists.map((list) => list.id);
 console.log(lists);
 const S_ID = localStorage.getItem("session_id");
 useEffect(() => {
  const add = async () => {
   const added = await addListItems(Number(list_id), type, m_id, S_ID);
  };
 }, []);

 return (
  <>
   <main>
    <Container>
     {lists.map((l) => (
      <>
       <div className="my-1 py-2">
        <h3 className="font-bold capitalize ">{l.name}</h3>
       </div>
       <div>
        <h4>heading</h4>
        <Vote />
       </div>
       <div>
        <AddCircleOutlineIcon />
        Add items
       </div>
      </>
     ))}
    </Container>
   </main>
  </>
 );
}

export default ShowList;
