import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from "../_services/test/test.service";
import { TestModel } from "../_models/test/test.model";
import { ShareModalComponent } from "../components/share-modal/share-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { FileUtil } from "src/app/_utils/file_util";
import { QuestionType } from "../_types/QuestionType";
import { QuestionUtil } from "../_types/QuestionUtil";

@Component({
  selector: "app-overview-test",
  templateUrl: "./overview-test.component.html",
  styleUrls: ["./overview-test.component.scss"],
})
export class OverviewTestComponent implements OnInit {
  public test$: Observable<TestModel>;

  constructor(
    private route: ActivatedRoute,
    private testService: TestService,
    private modalService: NgbModal,
    public fileUtil: FileUtil,
    public QuestionUtil: QuestionUtil
  ) {}

  ngOnInit() {
    this.getTestDetails();
  }

  getTestDetails() {
    const testId = this.route.snapshot.params["id"];
    this.test$ = this.testService.getLatestTestVersionById$(testId);
  }

  getTotalQuestions(test: TestModel): number {
    let totalQuestions = 0;
    test.sections.forEach((section) => {
      totalQuestions += section.questions.length;
    });
    return totalQuestions;
  }

  openShareModal(testModel: TestModel) {
    const shareUrl = `${window.location.origin}/test/examination/${testModel.id}?AccessCode=${testModel.accessCode.code}`;
    const modalRef = this.modalService.open(ShareModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.shareUrl = shareUrl;
  }

  getSortedFiles(fileUrls: string[]): string[] {
    return fileUrls.sort((a, b) => {
      if(this.fileUtil.isAudioFile(a) && this.fileUtil.isImageFile(b)) {
        return -1;
      } else if(this.fileUtil.isImageFile(a) && this.fileUtil.isAudioFile(b)) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
}
