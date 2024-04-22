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

  constructor(data?: Partial<RegistrationStudentModel>) {
    super(data);

    this.userDetails = {
      ...this.userDetails,
      schoolEmail: data?.userDetails?.schoolEmail || '',
    };

    this.internDetails = {
      ...this.internDetails,
      startOfPeriodOfAccomodation: data?.internDetails?.startOfPeriodOfAccomodation || null,
      endOfPeriodOfAccomodation: data?.internDetails?.endOfPeriodOfAccomodation || null,
      educationDegree: data?.internDetails?.educationDegree || '',
      internshipContext: data?.internDetails?.internshipContext || '',
    };
  }
}