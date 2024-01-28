// Create web server
// Create route for comments
// Create route for adding comments
// Create route for deleting comments
// Create route for editing comments
// Create route for getting comments

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');
const { ensureAuthenticated } = require('../config/auth');

// @route   GET /comments
// @desc    Get all comments
// @access  Public
router.get('/', (req, res) => {
    Comment.find()
        .sort({ date: -1 })
        .then(comments => res.json(comments))
        .catch(err => res.status(404).json({ nocommentsfound: 'No comments found' }));
});

// @route   GET /comments/:id
// @desc    Get a comment by id
// @access  Public
router.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nocommentfound: 'No comment found with that id' }));
});

// @route   POST /comments
// @desc    Add a comment
// @access  Private
router.post('/', ensureAuthenticated, (req, res) => {
    const { text, postId } = req.body;
    const newComment = new Comment({
        text,