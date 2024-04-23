export class ShortTestModel {
  id: string;
  amountOfSections: number;
  amountOfQuestions: number;
  timeLimitMinutes: number;
  accessCode: {
    code: string;
  };

  createdAt: Date;
}