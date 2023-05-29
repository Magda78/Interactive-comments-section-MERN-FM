const express = require('express');
const { check } = require('express-validator');


const getCommentsByIdController = require('../controllers/comments-controller');
const createCommentController = require('../controllers/comments-controller');
const getCommentsController = require('../controllers/comments-controller');
const editComment = require('../controllers/comments-controller');
const editCommentScore = require('../controllers/comments-controller');
const deleteComment = require('../controllers/comments-controller');
const createResponseToTheCommentController = require('../controllers/comments-controller');
const getReplies = require('../controllers/comments-controller');
const getReply = require('../controllers/comments-controller');
const editReply = require('../controllers/comments-controller');
const deleteReply = require('../controllers/comments-controller');
const editScore = require('../controllers/comments-controller');

const router = express.Router();




router.get('/', getCommentsController.getComments);
router.post('/',check('content').not().isEmpty(), createCommentController.createComment);
router.get('/:id', getCommentsByIdController.getCommentsById);
router.patch('/:id', check('content').not().isEmpty(), editComment.editComment);
router.patch('/:id/score', editCommentScore.editCommentScore);
router.delete('/:id', deleteComment.deleteComment);
router.post(
	'/:id/replies',
	check('content').not().isEmpty(),
	createResponseToTheCommentController.createResponseToTheComment
);
router.get('/:id/replies', getReplies.getReplies);
router.get('/:id/replies/:replyId', getReply.getReply);
router.patch('/:id/replies/:replyId', check('content').not().isEmpty(), editReply.editReply);
router.delete('/:id/replies/:replyId', deleteReply.deleteReply);
router.patch('/:id/replies/:replieId/score', editScore.editScore);

module.exports = router;
