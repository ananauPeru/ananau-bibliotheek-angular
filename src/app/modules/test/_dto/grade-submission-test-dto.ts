/**
 * PUT test/test_attempts/{id}/evaluate
 */
export class GradeSubmissionTestDto {
  constructor(public score?: number) {
    this.score = score || null;
  }
}
