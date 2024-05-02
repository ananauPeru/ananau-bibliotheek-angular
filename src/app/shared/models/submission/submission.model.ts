export class SubmissionModel {
    id: number;
    userId: number;
    exerciseId: number;
    fileUrls: string[];
    comment: string;
    submissionDate: Date;
    gradeDate?: Date;
    grade?: number;
    totalGrade?: number;
}