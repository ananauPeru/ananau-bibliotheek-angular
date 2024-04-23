export class QuestionDTO {
    questionText: string;
    type: {
        id: number;
    };
    answers: {
        answerText: string;
        isCorrect: boolean;
    }[];
}