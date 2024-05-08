import { SectionDTO } from "./section-dto";

export class TestDTO {
  constructor(
    public title?: string,
    public description?: string,
    public timeLimitMinutes?: number,
    public sections?: SectionDTO[]
  ) {
    this.title = title || '';
    this.description = description || '';
    this.timeLimitMinutes = timeLimitMinutes || 0;
    this.sections = sections || [];
  }
}