/**
 * PUT submission/{id}/grade
 */
export class GradeSubmissionDto {
  constructor(public grade?: number, public feedback?: string) {
    this.grade = grade || null;
    this.feedback = feedback || null;
  }
}
