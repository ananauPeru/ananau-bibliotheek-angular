import { RegistrationModel } from "./registration.model";

export class RegistrationStudentModel extends RegistrationModel {
  userDetails: {
    schoolEmail: string;
  } & RegistrationModel['userDetails'];

  internDetails: {
    startOfPeriodOfAccommodation: Date;
    endOfPeriodOfAccommodation: Date;
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
      startOfPeriodOfAccommodation: data?.internDetails?.startOfPeriodOfAccommodation || null,
      endOfPeriodOfAccommodation: data?.internDetails?.endOfPeriodOfAccommodation || null,
      educationDegree: data?.internDetails?.educationDegree || '',
      internshipContext: data?.internDetails?.internshipContext || '',
    };
  }
}