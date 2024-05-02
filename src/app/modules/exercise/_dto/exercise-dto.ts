export class ExerciseDto {
    constructor(
        public author?: string,
        public title?: string,
        public description?: string,
        public fileUrls?: string[],
    ) {
        this.author = author || '';
        this.title = title || '';
        this.description = description || '';
        this.fileUrls = fileUrls || [];
    }
}