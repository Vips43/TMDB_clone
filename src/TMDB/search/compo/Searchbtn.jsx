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
 maxWidth: 420,
 borderRadius: 999,
 backgroundColor: alpha("#ffffff", 0.15),
 border: "1px solid rgba(255,255,255,0.3)",
 transition: "all 0.25s ease",

 "&:focus-within": {
  backgroundColor: alpha("#ffffff", 0.25),
  borderColor: "#01b4e4",
 },

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
 color: "#fff",
 width: "100%",
 "& .MuiInputBase-input": {
  padding: theme.spacing(1, 2),
  fontSize: "0.9rem",
  transition: "all 0.2s ease",

  "&::placeholder": {
   color: "rgba(255,255,255,0.6)",
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
