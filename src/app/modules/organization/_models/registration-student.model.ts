import { RegistrationModel } from "./registration.model";

export class RegistrationStudentModel extends RegistrationModel {
  // PERSONAL INFORMATION
  // General
  schoolEmail: string;

  // ORGANIZATIONAL INFORMATION
  // Dates
  leaveStartDate: Date;
  leaveEndDate: Date;

  // Info
  degree: string;
  internshipContext: string;
}
