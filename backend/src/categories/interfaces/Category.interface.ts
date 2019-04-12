import { Document } from 'mongoose';

export interface Category extends Document {
	readonly name: String;
	readonly icon: String;
}