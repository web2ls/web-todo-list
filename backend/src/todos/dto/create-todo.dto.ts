export class CreateTodoDto {
	readonly content: string;
	readonly category: string;
	readonly isComplete: boolean;
}