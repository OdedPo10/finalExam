const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Posts, validatePost } = require('../moduls/posts');

router.get('/', async (req, res) => {
  try {
    let data = [];
    let result = await axios.get('https://jsonplaceholder.typicode.com/posts');
    data = result.data;

    if (data.length > 0) {
      for (i = 0; i < data.length; i++) {
        const { error } = validatePost(data[i]);
        if (error) return res.status(400).send(error.details[0].message);

        let post = new Posts({
          userId: data[i].userId,
          title: data[i].title,
          body: data[i].body,
          id: data[i].id,
        });
        let result = await post.save();
      }
      res.send(true);
    } else {
      res.status(500).send('error');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    if (req.params.userId) {
      const posts = await Posts.find({ userId: req.params.userId });

      if (posts.length > 0) res.send(posts);
      else res.status(404).send('user not exist');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
