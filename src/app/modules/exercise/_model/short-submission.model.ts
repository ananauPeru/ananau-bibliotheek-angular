export class ShortSubmissionModel {
    id: number;
    exercise: {
        id: number;
        title: string;
        maxGrade: number;
    }
    grade?: number;
    gradedAt?: Date;
    submittedAt: Date;
    submittedBy: {
        id: number;
        firstName: string;
        lastName: string;
    }
    gradedBy?: {
        id: number;
        firstName: string;
        lastName: string;
    }
}