const { validationResult } = require('express-validator');
const Comment = require('../models/comment');
//const mongoose = require('mongoose');
//const fs = require('fs');

const getComments = async (req, res, next) => {
	let comments;
	try {
		comments = await Comment.find();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}
	res.status(200).json(comments.map((comment) => comment.toObject({ getters: true })));
};

const createComment = async (req, res, next) => {
	const { ids, content, createdAt, score, username, replies, png, webp } = req.body;

	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ errors: err.array() });
	}

	const createComment = new Comment({
		content,
		score: 0,
		user: {
			image: {
				png: png,
				webp: webp
			},
			username
		},
		replies: []
	});

	try {
		await createComment.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(201).json({ comments: createComment.toObject({ getters: true }) });
};

const getCommentsById = async (req, res, next) => {
	const commentId = req.params.id;
	let comment;
	try {
		comment = await Comment.findById(commentId);
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.json({ comment: comment.toObject({ getters: true }) });
};

const editComment = async (req, res, next) => {
	const { content } = req.body;
	const commentId = req.params.id;
	let commentToEdit;
	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ errors: err.array() });
	}
	try {
		commentToEdit = await Comment.findById(commentId);
		if (!commentToEdit) {
			return res.status(404).send({ message: 'Comment not found' });
		}
		commentToEdit.content = content;
		await commentToEdit.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(200).json({ commentToEdit: commentToEdit.toObject({ getters: true }) });
};

const editCommentScore = async (req, res, next) => {
	const { score } = req.body;
	const commentId = req.params.id;
	let commentToEdit;
	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ errors: err.array() });
	}
	try {
		commentToEdit = await Comment.findById(commentId);
		if (!commentToEdit) {
			return res.status(404).send({ message: 'Comment not found' });
		}
		commentToEdit.score = score;
		await commentToEdit.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(200).json({ commentToEdit: commentToEdit.toObject({ getters: true }) });
};

const deleteComment = async (req, res, next) => {
	const commentId = req.params.id;
	console.log('id', commentId);
	let commentToDelete;
	//if( !mongoose.Types.ObjectId.isValid(commentId ) ) return Error({status: 422});
	try {
		commentToDelete = await Comment.findById(commentId);
		if (!commentToDelete) {
			return res.status(404).send({ message: 'Comment not found' });
		}

		await commentToDelete.remove();
		//await commentToDelete.save();

		res.status(200).json({ message: 'comment deleted', commentToDelete });
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}
};

const createResponseToTheComment = async (req, res, next) => {
	const { id, content, createdAt, score, replyingTo, username, png, webp } = req.body;
	const commentId = req.params.id;
	let repliesTo;
	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ errors: err.array() });
	}

	try {
		repliesTo = await Comment.findById(commentId);
	} catch (err) {
		res.status(500).json({ message: err });
		return next(err);
	}
	const replie = {
		content,
		score: 0,
		replyingTo,
		user: {
			image: {
				png,
				webp
			},
			username
		}
	};

	try {
		repliesTo.replies.push(replie);
		await repliesTo.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}
	res.json(repliesTo.replies.map((r) => r.toObject({ getters: true })));
};

const getReplies = async (req, res, next) => {
	const commentId = req.params.id;
	let repliesResult;

	try {
		repliesResult = await Comment.findById(commentId);
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.json(repliesResult.replies.map((r) => r.toObject({ getters: true })));
};

const getReply = async (req, res, next) => {
	const commentId = req.params.id;
	const replyId = req.params.replieId;
	let nestedReplyById;
	try {
		nestedReplyById = await Comment.findOne({ _id: commentId, 'replies._id': replyId }, { 'replies.$': 1 }).exec();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.json({ reply: nestedReplyById.replies });
};

const editReply = async (req, res, next) => {
	console.log('req.body', req.body);
	const { content } = req.body;
	console.log('req.body', req.body);
	const commentId = req.params.id;
	const replyId = req.params.replyId;
	//const score = req.param.scoreReplie;
	let nestedReplyById;
	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ errors: err.array() });
	}
	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).send({ message: 'Comment not found' });
		}
		const replyToEdit = comment.replies.id(replyId);
		if (!replyToEdit) {
			return res.status(404).send({ message: 'Reply not found' });
		}

		replyToEdit.content = content;
		await comment.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(200).json({ nestedReplyById });
};

const deleteReply = async (req, res, next) => {
	const commentId = req.params.id;
	const replyId = req.params.replyId;
	let nestedReplyById;
	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).send({ message: 'Comment not found' });
		}
		const replyToDelete = comment.replies.id(replyId);
		if (!replyToDelete) {
			return res.status(404).send({ message: 'Reply not found' });
		}

		replyToDelete.remove();
		await comment.save();

		res.status(200).json({ message: 'reply delete', nestedReplyById });
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}
};
const editScore = async (req, res, next) => {
	const { score } = req.body;
	const commentId = req.params.id;
	const replieId = req.params.replieId;
	let nestedReplieById;
	const err = validationResult(req);
	if (!err.isEmpty()) {
		console.log(err);
		return res.status(400).json({ err: err });
	}
	try {
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).send({ message: 'Comment not found' });
		}
		const replyToEdit = comment.replies.id(replieId);
		if (!replyToEdit) {
			return res.status(404).send({ message: 'Reply not found' });
		}

		replyToEdit.score = score;
		await comment.save();
	} catch (error) {
		res.status(500).json({ message: error });
		return next(error);
	}

	res.status(200).json({ message: 'score edited', nestedReplieById });
};

exports.getCommentsById = getCommentsById;
exports.createComment = createComment;
exports.getComments = getComments;
exports.editComment = editComment;
exports.editCommentScore = editCommentScore;
exports.deleteComment = deleteComment;
exports.createResponseToTheComment = createResponseToTheComment;
exports.getReplies = getReplies;
exports.getReply = getReply;
exports.editReply = editReply;
exports.deleteReply = deleteReply;
exports.editScore = editScore;
