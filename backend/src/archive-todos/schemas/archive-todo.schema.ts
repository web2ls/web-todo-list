import * as mongoose from 'mongoose';

export const ArchiveTodoSchema = new mongoose.Schema({
	content: String,
	isComplete: Boolean,
	category: {
		type: String,
		required: true,
		trim: true
	}
})