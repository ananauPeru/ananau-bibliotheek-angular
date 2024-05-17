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

export class TestSubmissionModel extends BaseTestSubmissionModel {
  testAttempt: TestAttemptModel;
  submittedBy: UserModel;
  gradedBy?: UserModel;
  gradedAt?: Date;
}
