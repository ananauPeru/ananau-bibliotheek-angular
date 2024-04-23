import { SectionModel } from "./section.model";
import { ShortTestModel } from "./short-test.model";

export class TestModel extends ShortTestModel {

  title: string;
  sections: SectionModel[];

}