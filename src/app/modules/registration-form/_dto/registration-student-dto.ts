import { RegistrationDTO } from "./registration-dto";

export class RegistrationStudentDTO extends RegistrationDTO {
  userDetails: {
    schoolEmail: string;
  } & RegistrationDTO['userDetails'] = Object.assign({}, this.userDetails, {
    schoolEmail: ''
  });

  internDetails: {
    startOfPeriodOfAccommodation: Date;
    endOfPeriodOfAccommodation: Date;
    educationDegree: string;
    internshipContext: string;
  } & RegistrationDTO['internDetails'] = Object.assign({}, this.internDetails, {
    startOfPeriodOfAccommodation: null,
    endOfPeriodOfAccommodation: null,
    educationDegree: '',
    internshipContext: ''
  });
}