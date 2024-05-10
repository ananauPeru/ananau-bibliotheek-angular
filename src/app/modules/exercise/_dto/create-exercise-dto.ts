export class CreateExerciseDto {
    constructor(
        public title?: string,
        public description?: string,
        public fileUrls?: string[],
        public maxGrade?: number,
        public typeId?: number,
        public deadline?: Date,
        public timeLimitMinutes?: number,
    ) {
        this.title = title || '';
        this.description = description || '';
        this.fileUrls = fileUrls || [];
        this.maxGrade = maxGrade || 0;
        this.typeId = typeId || 1; //This is the id of homework. Change this in the future to be set by a dropdown.
        this.deadline = deadline || new Date();
    }
}
