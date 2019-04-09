import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
	content: String,
	category: {
		type: String,
		required: true,
		trim: true
	}
})