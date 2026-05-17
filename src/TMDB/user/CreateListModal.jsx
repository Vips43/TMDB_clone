import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Modal, Typography } from "@mui/material";
import { createLists, getList } from "../oth/js_files/api";
import { useNavigate } from "react-router-dom";
import useUserStore from "./userStore";

const style = {
 position: "absolute",
 top: "50%",
 left: "50%",
 transform: "translate(-50%, -50%)",
 width: 300,
 bgcolor: "background.paper",
 boxShadow: 24,
 p: 2,
 borderRadius: 2,
};

function CreateListModal({ open, onClose }) {
 const navigate = useNavigate();
 const [name, setName] = useState("");
 const [desc, setDesc] = useState("");

 const lists = useUserStore((state) => state.lists);
 const setLists = useUserStore((state) => state.setLists);

 const S_ID = localStorage.getItem("session_id");
 const U_ID = JSON.parse(localStorage.getItem("TMDB_user"));

 const create = async () => {
  if (!name.trim()) return;

  try {
   await createLists(name, desc, S_ID);
   setName("");
   setDesc("");
   onClose();
  } catch (err) {
   console.log(err);
  }
 };

 useEffect(() => {
  const getlist = async () => {
   const allLists = await getList(U_ID.id, S_ID);
   setLists(allLists?.results);
  };
  getlist();
 }, []);

 return (
  <Modal open={open} onClose={onClose}>
   <Box sx={style}>
    <Typography fontWeight="600" sx={{ mb: 1 }}>
     Create List
    </Typography>

    <form
     className="space-y-2"
     onSubmit={(e) => {
      e.preventDefault();
      create();
     }}
    >
     <label className="block text-sm">
      List name
      <input
       value={name}
       onChange={(e) => setName(e.target.value)}
       type="text"
       placeholder="List name"
       className="border border-gray-300 w-full text-sm px-1 py-0.5 mt-1"
      />
     </label>

     <label className="block text-sm">
      Description
      <input
       value={desc}
       onChange={(e) => setDesc(e.target.value)}
       type="text"
       placeholder="Description"
       className="border border-gray-300 w-full text-sm px-1 py-0.5 mt-1"
      />
     </label>

     <button
      type="submit"
      className="flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 text-balance"
     >
      <AddCircleOutlineIcon fontSize="small" />
      Create
     </button>
    </form>
    <h3 className="border-y border-gray-300 my-2 font-semibold">
     Existing Lists{" "}
    </h3>
    <div className="flex flex-wrap gap-2">
     {lists?.map((list) => (
      <Button
       key={list.id}
       variant="contained"
       sx={{ fontSize: "0.75rem", px: 1 }}
       onClick={() => navigate(`/list/${list.id}/${list.name}`)}
      >
       {list.name}
      </Button>
     ))}
    </div>
   </Box>
  </Modal>
 );
}

export default CreateListModal;
