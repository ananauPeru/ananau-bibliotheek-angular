import { QuestionModel } from "./question.model";

export class SectionModel {
    id: number;
    title: string;
    description: string;
    amountOfQuestions: number;
    questions: QuestionModel[];
}
