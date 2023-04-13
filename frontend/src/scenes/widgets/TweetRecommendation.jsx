import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TweetWidget from "./TweetWidget";

const TweetRecommendation = () => {
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const [recommendation, SetRecommendation] = useState([]);

  const getPosts = async () => {
    const response = await fetch( `http://localhost:3001/posts/${_id}/recommendation`, { method: "GET" } );
    const data = await response.json();
    SetRecommendation(data);
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
        <Typography color={dark} variant="h5" fontWeight="500">
          Hottest Tweet 
        </Typography>
        {recommendation.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            picturePath,
            isVideo,
            userPicturePath,
            likes,
            dislikes,
            comments,
            retweeted,
            creatorId,
            creatorFirstName,
            creatorLastName,
            creatorPicturePath
          }) => (
            <TweetWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              picturePath={picturePath}
              isVideo={isVideo}
              userPicturePath={userPicturePath}
              likes={likes}
              dislikes={dislikes}
              comments={comments}
              retweeted={retweeted}
              creatorId={creatorId}
              creatorName={`${creatorFirstName} ${creatorLastName}`}
              creatorPicturePath={creatorPicturePath}
            />
          )
        )}
    </WidgetWrapper>
  );
};

export default TweetRecommendation;
