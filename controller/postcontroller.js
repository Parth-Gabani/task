const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOne({ _id: postId, createdBy: req.user._id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const createPost = async (req, res) => {
  const { title, body, latitude, longitude } = req.body;
  const createdBy = req.user._id;
  try {
    const post = await Post.create({ title, body, createdBy, latitude, longitude });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, body, latitude, longitude } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: postId, createdBy: req.user._id },
      { title, body, latitude, longitude },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findOneAndDelete({ _id: postId, createdBy: req.user._id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }

}

const getPostByLocation = async (req, res) => {
  const { latitude, longitude } = req.params;

  Post.find({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) })
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });

}

const dashboard = async (req, res) => {
  try {
    const activeCount = await Post.countDocuments({ active: true });
    const inactiveCount = await Post.countDocuments({ active: false });
    res.json({ activeCount, inactiveCount });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }

}

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost, getPostByLocation, dashboard }