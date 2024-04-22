export class SmallRegistrationModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  startDate: Date;
  endDate: Date;
  role: string;
  confirmed: boolean;
}

export enum SmallRegistrationModelRole {
  VOLUNTEER="Volunteer",
  STUDENT="Student",
}
