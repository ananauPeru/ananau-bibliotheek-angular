import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TestModel } from "../../_models/test/test.model";
import { TestHttpService } from "./test-http/test-http.service";
import { TestDTO } from "../../_dto/test-dto";
import { ShortTestModel } from "../../_models/test/short-test.model";

@Injectable({
  providedIn: "root",
})
export class TestService {
  constructor(private testHttpService: TestHttpService) {}

  getTests$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<ShortTestModel[]> {
    return this.testHttpService.getTests$(searchTerm, page, pageSize);
  }

  getTestById$(id: number, versionNumber: number): Observable<TestModel> {
    return this.testHttpService.getTestById$(id, versionNumber);
  }

  getTestExaminationById$(
    id: number,
    accessCode: string
  ): Observable<TestModel> {
    return this.testHttpService.getTestExaminationById$(id, accessCode);
  }

  createTest$(testDto: TestDTO): Observable<TestModel> {
    return this.testHttpService.postTest$(testDto);
  }

  deleteTest$(id: number): Observable<any> {
    return this.testHttpService.deleteTest$(id);
  }

  updateTest$(id: number, testDto: TestDTO): Observable<TestModel> {
    return this.testHttpService.putTest$(id, testDto);
  }
}
