import { ExerciseSubmissionModel } from "./submission.model";

class BaseExerciseModel {
  id: number;
  title: string;
  description?: string;
  type: TypeModel;
  author: UserModel;
}

class UserModel {
  id: number;
  firstName: string;
  lastName: string;
}

class TypeModel {
  id: number;
  name: string;
}

/**
 * GET exercise/{id}/teacher
 * GET exercise/{id}/student
 */
export class ExerciseModel extends BaseExerciseModel {
  maxGrade?: number; //this is optional for the practice. it should be required for the homework
  fileUrls: string[];
  submissions?: ExerciseSubmissionModel[];
}

/**
 * GET exercise/teacher
 */
export class ShortExerciseModel extends BaseExerciseModel {}

/**
 * GET exercise/student
 */
export class ShortSharedExerciseModel extends BaseExerciseModel {
  deadline?: Date;
  grade?: number;
  maxGrade?: number;
  gradedBy?: UserModel;
}
