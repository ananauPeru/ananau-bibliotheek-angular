export class SubmissionModel {
    id: number;
    exercise: {
        id: number;
        title: string;
        maxGrade: number;
    }
    submittedAt: Date;
    submittedBy: {
        id: number;
        firstName: string;
        lastName: string;
    }
    fileUrls: string[];
    comment?: string;

    gradedBy?: {
        id: number;
        firstName: string;
        lastName: string;
    }
    grade?: number;
    gradedAt?: Date;
    feedback?: string;
}