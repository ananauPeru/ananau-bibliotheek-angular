export class GradeSubmissionDto {
  constructor(public grade?: number, public feedback?: string) {
    this.grade = grade || 0;
    this.feedback = feedback || "";
  }
}
