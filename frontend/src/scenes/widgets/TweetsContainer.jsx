import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import TweetWidget from "./TweetWidget";

const TweetsContainer = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // get tweets of all friends for home page 
  const getPosts = async () => {
    const response = await fetch( `http://localhost:3001/posts/${userId}`, { method: "GET" } );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // get tweets of a single user for profile page
  const getUserPosts = async () => {
    const response = await fetch( `http://localhost:3001/posts/${userId}/posts`, { method: "GET" } );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
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
    </>
  );
};

export default TweetsContainer;
