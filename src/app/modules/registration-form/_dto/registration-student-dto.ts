import { RegistrationDTO } from "./registration-dto";

export class RegistrationStudentDTO extends RegistrationDTO {
  
  userDetails: {
    schoolEmail: string;
  } & RegistrationDTO['userDetails'];

  internDetails: {
    startOfPeriodOfAccomodation: Date;
    endOfPeriodOfAccomodation: Date;
    educationDegree: string;
    internshipContext: string;
  } & RegistrationDTO['internDetails'];

}
