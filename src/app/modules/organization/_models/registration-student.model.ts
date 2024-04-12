import { RegistrationModel } from "./registration.model";

export class RegistrationStudentModel extends RegistrationModel {
 
  userDetails: {
    schoolEmail: string;
  } & RegistrationModel['userDetails'];

  internDetails: {
    startOfPeriodOfAccomodation: Date;
    endOfPeriodOfAccomodation: Date;
    educationDegree: string;
    internshipContext: string;
  } & RegistrationModel['internDetails'];

}
