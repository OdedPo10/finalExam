const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 1,
  },
  body: {
    type: String,
    required: true,
    maxlength: 1024,
    minlength: 1,
  },
  id: {
    type: Number,
    required: true,
  },
});

function validatePost(post) {
  const schema = {
    id: Joi.number().required(),
    body: Joi.string().min(1).max(255).required(),
    title: Joi.string().min(1).max(255).required(),
    userId: Joi.number().required(),
  };
  return Joi.validate(post, schema);
}
const Posts = new mongoose.model("posts", schema);

module.exports.Posts = Posts;
module.exports.validatePost = validatePost;
