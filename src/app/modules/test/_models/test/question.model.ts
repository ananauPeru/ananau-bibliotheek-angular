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
        answerText: string;
        isCorrect: boolean;
    }[];
    fileUrls: string[];
}

export class QuestionEvaluatedModel {
    id: number;
    questionText: string;
    isAutoEvaluated: boolean;
    type: {
        id: number;
        name: string;
    };
    fileUrls: string[];
    amountOfAnswers: number;
    answers: {
        id: number;
        answerText: string;
        isCorrect: boolean;
    }[];
    learnerAnswer: {
        answerId: number;
        answerText: string;
        isCorrect: boolean;
    };

}