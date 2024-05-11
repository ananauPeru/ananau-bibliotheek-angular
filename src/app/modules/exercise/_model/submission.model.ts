// Base class for common properties
class BaseSubmissionModel {
  id: number;
  submittedAt: Date;
  grade?: number;
  gradedAt?: Date;
}

// Base class for user-related properties
class UserModel {
  id: number;
  firstName: string;
  lastName: string;
}

// Base class for exercise-related properties
class ExerciseModel {
  id: number;
  title: string;
  maxGrade: number;
}

/**
 * This model is used to represent the exercise submission in a short form. It is useed in the exercise details.
 */
export class ExerciseSubmissionModel extends BaseSubmissionModel {
  submittedBy: UserModel;
  gradedBy?: UserModel;
}

/**
 * GET submission/{id}/student
 */
export class StudentSubmissionModel extends BaseSubmissionModel {
  exercise: ExerciseModel;

  fileUrls: string[];
  comment?: string;

  gradedBy?: UserModel;
  feedback?: string;
}

/**
 * GET submission/{id}/teacher
 */
export class TeacherSubmissionModel extends BaseSubmissionModel {
  exercise: ExerciseModel;
  submittedBy: UserModel;
  fileUrls: string[];
  comment?: string;

  gradedBy?: UserModel;
  feedback?: string;
}

/**
 * POST submission/{id}/submit
 */
export class SubmissionResultModel {
  id: number;
}

/**
 * GET submission/student
 */
export class StudentShortSubmissionModel extends BaseSubmissionModel {
  exercise: ExerciseModel;
  gradedBy?: UserModel;
}

/**
 * GET submission/teacher
 */
export class TeacherShortSubmissionModel extends BaseSubmissionModel {
  exercise: ExerciseModel;
  submittedBy: UserModel;
  gradedBy?: UserModel;
}


/* export class AssignedExerciseModel {
  learnerId: number;
  exerciseId: number;
  deadline: Date;
} */
