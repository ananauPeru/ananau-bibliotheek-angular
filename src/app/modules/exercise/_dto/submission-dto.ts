export class SubmissionDto {
    constructor(
        public userId?: number,
        public exerciseId?: number,
        public exerciseName?: string,
        public fileUrls?: string[],
        public comment?: string,
        public submissionDate?: Date,
        public gradeDate?: Date,
        public grade?: number,
        public totalGrade?: number,
    ) {
        this.userId = userId || 0;
        this.exerciseId = exerciseId || 0;
        this.exerciseName = exerciseName || '';
        this.fileUrls = fileUrls || [];
        this.comment = comment || '';
        this.submissionDate = submissionDate || new Date();
        this.gradeDate = gradeDate || new Date();
        this.grade = grade || 0;
        this.totalGrade = totalGrade || 0;
    }
    
}