export class SubmissionModel {
    id: number;
    userId: number;
    userName: string;
    exerciseId: number;
    exerciseName: string;
    fileUrls: string[];
    comment: string;
    submissionDate: Date;
    gradeDate?: Date;
    grade?: number;
    totalGrade?: number;
}