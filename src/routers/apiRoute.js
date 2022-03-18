'use strict'

const { createPost, deletePost, getPosts, updatePost } = require('../controllers/post');
const { createComment, getComments, deleteComment, updateComment } = require('../controllers/comment');

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('Successfully set up');
})

//add more routes here
router.post('/create-post', async (req, res) => {
  createPost(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.post('/create-comment', async (req, res) => {
  createComment(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.post('/delete-comment', async (req, res) => {
  deleteComment(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.post('/delete-post', async (req, res) => {
  deletePost(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.get('/get-post', async (req, res) => {
  getPosts()
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.post('/get-comment', async (req, res) => {
  getComments(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.post('/update-post', async (req, res) => {
  updatePost(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

router.post('/update-comment', async (req, res) => {
  updateComment(req)
  .then((result) => {
    res.json({
      status: 'success',
      message: result
    })
  })
  .catch((err) => {
    res.status(400).json({
      status: 'failed',
      message: err
    })
  });
})

module.exports = { router };