import { RegistrationDTO } from "./registration-dto";

export class RegistrationStudentDTO extends RegistrationDTO {
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
