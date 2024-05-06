export class CreateExerciseDto {
    constructor(
        public title?: string,
        public description?: string,
        public fileUrls?: string[],
        public maxGrade?: number
    ) {
        this.title = title || '';
        this.description = description || '';
        this.fileUrls = fileUrls || [];
        this.maxGrade = maxGrade || 0;
    }
}