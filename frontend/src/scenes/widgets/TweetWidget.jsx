import {
  ChatBubbleOutlineOutlined,
  Autorenew,
	Send,
  ThumbUp,
  ThumbDown
} from "@mui/icons-material";
import { Box, Divider, Stack, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const TweetWidget = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  userPicturePath,
  likes,
  dislikes,
  comments,
  retweeted,
  creatorId,
  creatorName,
  creatorPicturePath
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const isDisliked = Boolean(dislikes[loggedInUserId]);
  const likeCount = Object.keys(likes).length - Object.keys(dislikes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const mediumMain = palette.neutral.mediumMain;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: loggedInUserId })
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchDislike= async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/dislike`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: loggedInUserId })
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const retweet = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/retweet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: loggedInUserId })
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleNewComment = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: loggedInUserId, comment: comment })
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
  };

  return (
    <WidgetWrapper m="2rem 0">

      {/* User info for normal tweet */}
      { !retweeted && (< Friend
        friendId={postUserId}
        name={name}
        picturePath={userPicturePath}
      />
      )}

      {/* Creator info for retweet */}
      { retweeted && (
        <Box>
          <Stack direction="row" alignItems="center" gap={1}>
            <Autorenew sx = {{color:mediumMain}} />
            <Typography color={mediumMain}>
              {name} Retweeted 
            </Typography>
          </Stack>
          <Divider sx={{my: '0.5rem'}} />
          <Friend
            friendId={creatorId}
            name={creatorName}
            picturePath={creatorPicturePath}
          />
        </Box>
      )}

      {/* text of tweet */}
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      {/* picture of tweet */}
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.8rem", marginTop: "0.8rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          {/* Like button */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <ThumbUp sx={{ color: primary }} />
              ) : (
                <ThumbUp/>
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
            {/* dislike button */}
            <IconButton onClick={patchDislike}>
              {isDisliked ? (
                <ThumbDown sx={{ color: primary }} />
              ) : (
                <ThumbDown/>
              )}
            </IconButton>
          </FlexBetween>

          {/* show comment button*/}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {/* retweet button*/}
        <IconButton>
          <Autorenew onClick={retweet}/>
        </IconButton>
    
      
      {/* comment box */}
      </FlexBetween>
      {isComments && (
        <Box mt="0.6rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
            <Box mt="0.5rem">
                <InputBase
                    placeholder="Write some comment..."
                    onChange={(c) => setComment(c.target.value)}
                    value={comment}
                    sx={{
                        width: "92%",
                        height: "2rem",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 0.6rem",
                    }}
                />
                <IconButton>
                    <Send onClick={handleNewComment}/>
                </IconButton>
            </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default TweetWidget;
