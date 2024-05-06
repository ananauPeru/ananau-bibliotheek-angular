export class ExerciseModel {
    id: number;
    title: string;
    description?: string;
    maxGrade: number;
    author: {
        id: number;
        firstName: string;
        lastName: string;
    };
    fileUrls: string[];
}