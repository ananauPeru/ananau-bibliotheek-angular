export class QuestionModel {
    id: number;
    questionText: string;
    type: {
        id: number;
        name: string;
    };
    amountOfAnswers: number;
    answers: {
        id: number;
        answerText?: string;
        isCorrect: boolean;
    }[];
}
