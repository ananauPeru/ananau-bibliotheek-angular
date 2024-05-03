export class ExerciseDto {
    constructor(
        public author?: string,
        public title?: string,
        public description?: string,
        public fileUrls?: string[],
        public maxGrade?: number
    ) {
        this.author = author || '';
        this.title = title || '';
        this.description = description || '';
        this.fileUrls = fileUrls || [];
        this.maxGrade = maxGrade || 0;
    }
}