export class QuestionDTO {
    constructor(
      public index?: number,
      public questionText?: string,
      public fileUrls?: string[] | File[],
      public type?: { id: number; name: string },
      public answers?: { answerText: string; isCorrect: boolean }[]
    ) {
      this.index = index || 0;
      this.questionText = questionText || '';
      this.fileUrls = fileUrls || [];
      this.type = type || { id: 0, name: '' };
      this.answers = answers || [];
    }
  }