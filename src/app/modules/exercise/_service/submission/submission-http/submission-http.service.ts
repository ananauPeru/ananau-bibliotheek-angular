import { Injectable, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { SubmissionModel } from "../../../_model/submission.model";
import { CreateSubmissionDto } from "../../../_dto/create-submission-dto";
import { GradeSubmissionDto } from "../../../_dto/grade-submission-dto";
import { Roles } from "src/app/_utils/auth_util";

@Injectable({
  providedIn: "root",
})
export class SubmissionHttpService {
  constructor() {
    
  }

  MOCK_DATA: SubmissionModel[] = [
    {
      id: 1,
      exercise: {
        id: 1,
        title: "Mock Exercise 1",
        maxGrade: 10,
      },
      submittedAt: new Date(),
      submittedBy: {
        id: 1,
        firstName: "Mock",
        lastName: "User",
      },
      fileUrls: ["https://www.mock.com/file1", "https://www.mock.com/file2"],
      comment: "Mock Comment",
      gradedBy: {
        id: 1,
        firstName: "Mock",
        lastName: "Teacher",
      },
      grade: 7,
      gradedAt: new Date(),
      feedback: "Mock Feedback",
    },
    {
      id: 2,
      exercise: {
        id: 2,
        title: "Mock Exercise 2",
        maxGrade: 10,
      },
      submittedAt: new Date(),
      submittedBy: {
        id: 2,
        firstName: "Mock",
        lastName: "User",
      },
      fileUrls: ["https://www.mock.com/file1", "https://www.mock.com/file2"],
      comment: "Mock Comment",
      gradedBy: {
        id: 1,
        firstName: "Mock",
        lastName: "Teacher",
      },
      grade: 8,
      gradedAt: new Date(),
      feedback: "Mock Feedback",
    },
    {
      id: 3,
      exercise: {
        id: 3,
        title: "Mock Exercise 3",
        maxGrade: 10,
      },
      submittedAt: new Date(),
      submittedBy: {
        id: 3,
        firstName: "Mock",
        lastName: "User",
      },
      fileUrls: ["https://www.mock.com/file1", "https://www.mock.com/file2"],
      comment: "Mock Comment",
      gradedBy: {
        id: 1,
        firstName: "Mock",
        lastName: "Teacher",
      },
      grade: 9,
      gradedAt: new Date(),
      feedback: "Mock Feedback",
    }
  ];

  getSubmissions$(searchTerm: string, role: Roles): Observable<SubmissionModel[]> {
    if(role === Roles.SpanishTeacher) {
      return of(this.MOCK_DATA);
    } else {
      return of(this.MOCK_DATA.filter((submission: SubmissionModel) => submission.submittedBy.id === 1));
    }
  }

  getSubmissionsByExerciseId$(exerciseId: number, role: Roles): Observable<SubmissionModel[]> {
    if(role === Roles.SpanishTeacher) {
      return of(this.MOCK_DATA.filter((submission) => submission.exercise.id === exerciseId));
    } else {
      return of(this.MOCK_DATA.filter((submission) => submission.exercise.id === exerciseId && submission.submittedBy.id === 1));
    }
  }

  getSubmissionById$(submissionId: number): Observable<SubmissionModel> {
    return of(this.MOCK_DATA[submissionId - 1]);
  }

  gradeSubmission$(submissionId: number, gradeSubmissionDto: GradeSubmissionDto): Observable<SubmissionModel> {
    const submission: SubmissionModel = this.MOCK_DATA[submissionId - 1];
    submission.grade = gradeSubmissionDto.grade;
    submission.feedback = gradeSubmissionDto.feedback;
    return of(submission);
  }

  getSubmissionsByUserIdAndExerciseId$(userId: number, exerciseId: number): Observable<SubmissionModel[]> {
    // return of(this.MOCK_DATA.filter((submission) => submission.userId === userId && submission.exerciseId === exerciseId));
    return of(null);
  }

  createSubmission$(submissionDto: CreateSubmissionDto): Observable<SubmissionModel> {
    // const submission: SubmissionModel = {
    //   id: this.MOCK_DATA.length + 1,
    //   userId: submissionDto.userId,
    //   userName: "Mock User",
    //   exerciseId: submissionDto.exerciseId,
    //   exerciseName: submissionDto.exerciseName,
    //   fileUrls: submissionDto.fileUrls,
    //   comment: submissionDto.comment,
    //   submissionDate: submissionDto.submissionDate,
    //   gradeDate: submissionDto.gradeDate,
    //   grade: submissionDto.grade,
    //   maxGrade: submissionDto.maxGrade,
    //   feedback: submissionDto.feedback,
    // };
    // this.MOCK_DATA.push(submission);
    // return of(submission);
    return of(null);
  }
}
