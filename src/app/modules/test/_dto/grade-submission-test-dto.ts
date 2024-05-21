/**
 * PUT test/test_attempts/{id}/evaluate
 */
export class GradeSubmissionTestDto {
  evaluations: { questionId: number; score: number }[];

  constructor(evaluations: { questionId: number; score: number }[] = []) {
    this.evaluations = evaluations.map(evaluation => ({
      questionId: evaluation.questionId || null,
      score: evaluation.score || null
    }));
  }
}

