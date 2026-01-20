import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import { fetchReviews } from "../oth/js_files/api";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

function RatingBadge({ rate }) {
 return (
  <Box
   sx={{
    px: 1,
    py: 0.5,
    borderRadius: 1,
    background: "#4c1d95",
    color: "#fff",
    fontSize: "0.75rem",
    fontWeight: 600,
   }}
  >
   ★ {Math.round(rate * 10)}%
  </Box>
 );
}

export default function Reviews({ type }) {
 const [reviews, setReviews] = React.useState([]);
 const { id } = useParams();
 const theme = useTheme();

 React.useEffect(() => {
  const getData = async () => {
   if (!id) return;
   const data = await fetchReviews(id, type);
   setReviews(data || []);
  };
  getData();
 }, [id]);

 if (!reviews.length) {
  return (
   <Typography sx={{ opacity: 0.6, p: 2 }}>No reviews available</Typography>
  );
 }

 return (
  <Box
   sx={{
    display: "flex",
    gap: 2,
    overflowX: "auto",
    p: 0,
   }}
   className="no-scrollbar"
  >
   {reviews.map((review) => {
    const avatar = review.author_details.avatar_path?.startsWith("/http")
     ? review.author_details.avatar_path.slice(1)
     : `${IMG_URL}${review.author_details.avatar_path}`;

    return (
     <Card
      key={review.id}
      sx={{
       minWidth: 320,
       maxWidth: 380,
       flexShrink: 0,
       background: theme.palette.mode === "dark" ? "#1f1f1f" : "#fff",
       borderRadius: 2,
      }}
     >
      <CardHeader
       avatar={
        <Avatar src={review.author_details.avatar_path ? avatar : undefined}>
         {review.author[0]}
        </Avatar>
       }
       title={
        <Typography fontWeight={600}>A review by {review.author}</Typography>
       }
       subheader={new Date(review.created_at).toDateString()}
       action={
        review.author_details.rating && (
         <RatingBadge rate={review.author_details.rating} />
        )
       }
      />

      <CardContent sx={{ pt: 0 }}>
       <Typography
        variant="body2"
        sx={{
         color: "text.secondary",
         lineHeight: 1.6,
         maxHeight: 160,
         overflow: "hidden",
         textOverflow: "ellipsis",
        }}
        dangerouslySetInnerHTML={{
         __html: review.content,
        }}
       />
      </CardContent>
     </Card>
    );
   })}
  </Box>
 );
}
