const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
	{
		content: { type: String, required: true },
		score: { type: Number, required: true },
		user: {
			image: {
				png: { type: String, require: true },
				webp: { type: String, require: true }
			},
			username: { type: String, required: true }
		},
		replies: [
			{
				type: new Schema(
					{
						//allow to add another timestamp
						content: { type: String, required: true },
						score: { type: Number, required: true },
						replyingTo: { type: String, required: true },
						user: {
							image: {
								png: { type: String, require: true },
								webp: { type: String, require: true }
							},
							username: { type: String, required: true }
						}
					},
					{
						timestamps: true
					}
				)
			}
		]
	},
	{
		timestamps: true
	},
	{
		writeConcern: {
			w: 'majority',
			j: true,
			wtimeout: 1000
		}
	}
);

module.exports = mongoose.model('Comment', commentSchema);
