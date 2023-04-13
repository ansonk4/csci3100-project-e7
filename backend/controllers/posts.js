import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createTweet = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      dislikes: {},
      comments: [],
      retweeted: false,
      creatorId: "",
      creatorFirstName: "",
      creatorLastName: "",
      creatorPicturePath: "" 
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const retweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const tweet = await Post.findById(id);
    const creator = await User.findById(tweet.userId) 
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description: tweet.description,
      userPicturePath: user.picturePath,
      picturePath: tweet.picturePath,
      likes: {},
      dislikes: {},
      comments: [],
      retweeted: true,
      creatorId: (tweet.retweeted) ? tweet.creatorId: creator._id,
      creatorFirstName: (tweet.retweeted) ? tweet.creatorFirstName: creator.firstName,
      creatorLastName: (tweet.retweeted) ? tweet.creatorLastName: creator.lastName,
      creatorPicturePath: (tweet.retweeted) ? tweet.creatorPicturePath: creator.picturePath 
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// get feed of all friends
export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).lean();
    const post = await Post.find( { "userId": { "$in": user.friends } } );
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// get tweet of single for profile page
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// like or dislike a post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    const isDisliked = post.dislikes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      if (isDisliked) {
        post.dislikes.delete(userId);
      }
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes, dislikes:post.dislikes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isDisliked = post.dislikes.get(userId);
    const isLiked = post.likes.get(userId);

    if (isDisliked) {
      post.dislikes.delete(userId);
    } else {
      if (isLiked){
        post.likes.delete(userId);
      }
      post.dislikes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes, dislikes:post.dislikes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

// add new comment to a post
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const user = await User.findById(userId);
    const fullName = `${user.firstName} ${user.lastName}`;
    const post = await Post.findById(id);
    post.comments.push(`${fullName}: ${comment}`);

    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { comments: post.comments },
        { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

}