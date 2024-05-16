import { QuestionEvaluatedModel, QuestionModel } from "./question.model";

export class SectionModel {
    id: number;
    title: string;
    description: string;
    amountOfQuestions: number;
    questions: QuestionModel[];
}

export class SectionEvaluatedModel {
    id: number;
    title: string;
    description: string;
    amountOfQuestions: number;
    amountOfAutoQuestions: number;
    amountOfNotAutoQuestions: number;
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
    questions: QuestionEvaluatedModel[];
}