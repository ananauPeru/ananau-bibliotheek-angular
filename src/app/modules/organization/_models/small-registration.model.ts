export class SmallRegistrationModel {
  firstName: string;
  lastName: string;
  email: string;
  startDate: Date;
  endDate: Date;
  role: SmallRegistrationModelRole;
  confirmed: boolean;
}

export enum SmallRegistrationModelRole {
  VOLUNTEER,
  STUDENT,
}
