export class ShortExerciseModel {
    id: number;
    title: string;
    description?: string;
    deadline: Date;
    author: {
        id: number;
        firstName: string;
        lastName: string;
    }
}