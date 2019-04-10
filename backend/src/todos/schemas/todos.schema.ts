import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
	content: String,
	isComplete: Boolean,
	category: {
		type: String,
		required: true,
		trim: true
	}
})