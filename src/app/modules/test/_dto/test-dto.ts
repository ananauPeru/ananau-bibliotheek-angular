import { SectionDTO } from "./section-dto";

export class TestDTO {
  constructor(
    public title?: string,
    public timeLimitMinutes?: number,
    public sections?: SectionDTO[]
  ) {
    this.title = title || '';
    this.timeLimitMinutes = timeLimitMinutes || 0;
    this.sections = sections || [];
  }
}