export class ShortTestModel {
  id: number;
  accessCode: {
    code: string;
  };

  versions: [
    {
      title: string;
      versionNumber: number;
      totalAmountOfSections: number;
      totalAmountOfQuestions: number;
      timeLimitMinutes: number;
      createdAt: Date;
    }
  ];
  latestVersion: {
    title: string;
    versionNumber: number;
    totalAmountOfSections: number;
    totalAmountOfQuestions: number;
    timeLimitMinutes: number;
    createdAt: Date;
  };
}
