import { SectionEvaluatedModel, SectionModel } from "./section.model";

export class TestModel {

  id: number;
  title: string;
  description: string;
  versionNumber: number;
  totalAmountOfQuestions: number;
  totalAmountOfSections: number;
  timeLimitMinutes: number;
  createdAt: Date;
  accessCode: {
    code: string;
  };
  sections: SectionModel[];

}

export class TestEvaluatedModel {
  id: number;
  testId: number;
  versionNumber: number;
  title: string;
  description: string;
  totalAmountOfSections: number;
  totalAmountOfQuestions: number;
  possibleScores: {
    max: number;
    maxAuto: number;
    maxNotAuto: number;
  };
  realScores: {
    total: number;
    totalAuto: number;
    totalNotAuto: number;
  };
  sections: SectionEvaluatedModel[];
}

export class TestSubmitDTO {
  learnerAnswers: {
    questionId: number;
    answer: {
      answerId: number;
      answerText: string;
    }
  }[];
}