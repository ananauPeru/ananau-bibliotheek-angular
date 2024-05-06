export class CreateSubmissionDto {
    constructor(
        public fileUrls?: string[],
        public comment?: string,
    ) {
        this.fileUrls = fileUrls || [];
        this.comment = comment || '';
    }
}