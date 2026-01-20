import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import img from "/No-image.png";
import useApiStore from "./store";

function CastStrips({ data = [], title }) {
 const imgUrl = "https://image.tmdb.org/t/p/w500";
 const isLoading = useApiStore((state) => state.isLoading);
 
 if(isLoading) return <div className="text-2xl font-bold grid place-items-center animate-bounce">Loading...</div>

 return (
  <Box className="space-y-2">
   {title && (
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
     {title} <span className="opacity-35">{data.length}</span>
    </Typography>
   )}

   {data?.map((f, i) => {
    const isCast = Array.isArray(f.roles);

    return (
     <Card key={i} sx={{ display: "flex", gap: 3, boxShadow: "none" }}>
      <CardMedia
       component="img"
       image={f.profile_path ? `${imgUrl}${f.profile_path}` : img}
       alt={f.name}
       sx={{ width: 64, height: 64, borderRadius: 2 }}
      />

      <CardContent sx={{ pt: 1 }}>
       <Typography fontWeight={600}>{f.name}</Typography>
       <Typography sx={{opacity:0.7, fontSize:".9rem"}}>{f.character || f.job || ''}</Typography>

       {isCast ? (
        <Typography fontSize="0.8rem">
         {f?.roles?.map((r, i) => (
          <span key={i}>
           <strong>{r.character}</strong>{" "}
           <span style={{ opacity: 0.6 }}>({r.episode_count} Ep)</span>
           {i < f.roles.length - 1 && ", "}
          </span>
         ))}
        </Typography>
       ) : (
        <Typography fontSize="0.8rem">
         {f?.jobs?.map((r, i) => (
          <span key={i}>
           <strong>{r.job}</strong>{" "}
           <span style={{ opacity: 0.6 }}>({r.episode_count} Ep)</span>
           {i < f.jobs.length - 1 && ", "}
          </span>
         ))}
        </Typography>
       )}
      </CardContent>
     </Card>
    );
   })}
  </Box>
 );
}

export default CastStrips;
