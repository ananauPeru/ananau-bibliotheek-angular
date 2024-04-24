export class ShortTestModel {
  id: string;
  totalAmountOfSections: number;
  totalAmountOfQuestions: number;
  timeLimitMinutes: number;
  accessCode: {
    code: string;
  };

  createdAt: Date;
}