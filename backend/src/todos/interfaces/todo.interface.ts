import { Document } from 'mongoose';

export interface Todo extends Document {
	readonly content: string;
	readonly category: string;
	readonly isComplete: boolean;
}