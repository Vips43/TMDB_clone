import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import useApiStore from "../../oth/js_files/store";
import { useState } from "react";
import { useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
 position: "relative",
 display: "flex",
 alignItems: "center",
 width: "100%",
 textAlign: "center",
 maxWidth: "100%",
 borderRadius: 5,
 backgroundColor: "white",
 transition: "all 0.25s ease",

 "&:focus-within": {
  backgroundColor: alpha("#ffffff", 0.25),
  borderColor: "#01b4e4",
 },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
 border: "1px solid grey",
 color: "#000",
 width: "95%",
 borderRadius:5,
 margin:"0 auto",
 "& .MuiInputBase-input": {
  padding: theme.spacing(1, 2),
  fontSize: "0.9rem",
  transition: "all 0.2s ease",

  "&::placeholder": {
   color: "#000",
   opacity: 1,
  },
 },
}));

function Searchbtn() {
 const navigate = useNavigate();
 const setQuery = useApiStore((state) => state.setQuery);
 const [val, setVal] = useState("");

 const handleSubmit = () => {
  if (!val.trim()) return;
  setQuery(val.trim());
  navigate(`/search/${val.trim()}`);
 };

 return (
  <Search>
   <StyledInputBase
    placeholder="Search movies, TV shows…"
    inputProps={{ "aria-label": "search" }}
    value={val}
    onChange={(e) => setVal(e.target.value)}
    onKeyDown={(e) => {
     if (e.key === "Enter") handleSubmit();
    }}
   />
  </Search>
 );
}

export default Searchbtn;
