export class UpdateTodoDto {
	readonly _id: string;
	readonly content: string;
	readonly category: string;
	readonly isComplete: boolean;
}