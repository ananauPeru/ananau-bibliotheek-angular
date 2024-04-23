import { QuestionModel } from "./question.model";

export class SectionModel {
    id: number;
    title: string;
    amountOfQuestions: number;
    questions: QuestionModel[];
}
