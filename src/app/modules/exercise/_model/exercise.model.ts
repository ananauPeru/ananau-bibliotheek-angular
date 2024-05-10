import { ExerciseSubmissionModel } from "./submission.model";

class BaseExerciseModel {
  id: number;
  title: string;
  description?: string;
  type: TypeModel;
}

class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  author: UserModel;
}

export class TypeModel {
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
  author: UserModel;
}

export class StudentExerciseModel extends ExerciseModel {
  deadline: Date;
}

/**
 * GET exercise/teacher
 */
export class TeacherShortExerciseModel extends BaseExerciseModel {
  author: UserModel;
}

/**
 * GET exercise/student
 */
export class StudentShortExerciseModel extends BaseExerciseModel {
  deadline?: Date;
  grade?: number;
  maxGrade?: number;
  gradedBy?: UserModel;
  author: UserModel;
  status: string;
}

/**
 * GET exercise/assigns
 */
export class AssignedExerciseModel extends BaseExerciseModel {
  exerciseId?: number;
  deadline?: Date;
  grade?: number;
  maxGrade: number;
  gradedBy?: UserModel;
  assignedTo: UserModel;
}
