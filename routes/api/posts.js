const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/posts
// @desc    create a post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);
// @route   Get api/posts
// @desc    Get all posts
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
// @route   Get api/posts/:id
// @desc    Get a post by ID
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.name == "CastError") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).send("server error");
  }
});

// @route   DELETE api/posts/:id
// @desc    delete a post by ID
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.name == "CastError") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});


// @route   PUT api/posts/like/:id
// @desc    like a post
// @access  Private

router.put('/like/:id', auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id)
  
    //check if the post has already been liked
    if(post.likes.filter(like => like.user.toString() ===req.user.id).length>0){
      return res.status(400).json({msg: 'Post already liked'})
    }

    post.likes.unshift({user: req.user.id});

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    unlike a post
// @access  Private

router.put('/unlike/:id', auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id)
  
    //check if the post has already been liked
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(400).json({msg: 'Post has not been liked yet'})
    }

   //get remove index
   const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

   post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

module.exports = router;
