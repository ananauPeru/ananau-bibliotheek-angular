export class RegistrationModel {
  firstName: string;
  lastName: string;
  email: string;
  startDate: Date;
  endDate: Date;
  role: RegistrationModelRole;
  confirmed: boolean;
}

export enum RegistrationModelRole {
  VOLUNTEER,
  STUDENT,
}
