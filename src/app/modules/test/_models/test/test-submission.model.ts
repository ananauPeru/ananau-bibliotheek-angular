import { QuestionEvaluatedModel } from "./question.model";

// Base class for common properties
class BaseTestSubmissionModel {
  id: number;
  submittedAt: Date;
  realScores: {
    total: number,
    totalAuto: number,
    totalNotAuto?: number
  };

}

// Base class for user-related properties
class UserModel {
  id: number;
  firstName: string;
  lastName: string;
}

// Base class for test-related properties
class TestAttemptModel {
  id: number;
  title: string;
  possibleScores: {
    max: number,
    maxAuto: number,
    maxNotAuto: number
  };
}

export class SectionModel {
  id: number;
  title: string;
  description: string;
  questions: QuestionEvaluatedModel[];
}

/**
 * GET test/my_test_attempts
 */
export class StudentTestSubmissionModel extends BaseTestSubmissionModel {
  title: string;
  possibleScores: {
    max: number,
    maxAuto: number,
    maxNotAuto: number,
  };
  gradedBy?: UserModel;
}

/**
 * GET test/test_attempts
 */
export class TeacherTestSubmissionModel extends BaseTestSubmissionModel {
  title: string;
  possibleScores: {
    max: number,
    maxAuto: number,
    maxNotAuto: number,
  };
  submittedBy: UserModel;
}

/**
 * GET test/my_test_attemts/{id}
 */

/**
 * GET test/test_attemts/{id}
 */

export class TestSubmissionModel {
  id: number;
  testId: number;
  title: string;
  description: string;
  possibleScores: {
    max: number,
    maxAuto: number,
    maxNotAuto: number,
  };
  realScores: {
    total: number,
    totalAuto: number,
    totalNotAuto?: number
  };
  sections: SectionModel[];
  submittedBy: UserModel;
  submittedAt: Date;
  gradedBy?: UserModel;
  gradedAt?: Date;
}
