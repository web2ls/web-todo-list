import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	icon: {
		type: String,
		trim: true
	}
})