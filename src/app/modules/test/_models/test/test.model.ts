import { SectionModel } from "./section.model";

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