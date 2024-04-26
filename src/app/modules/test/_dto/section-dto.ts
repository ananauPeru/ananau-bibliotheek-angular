import { QuestionDTO } from "./question-dto";

export class SectionDTO {
  constructor(
    public index?: number,
    public title?: string,
    public description?: string,
    public questions?: QuestionDTO[]
  ) {
    this.index = index || 0;
    this.title = title || '';
    this.description = description || '';
    this.questions = questions || [];
  }
}