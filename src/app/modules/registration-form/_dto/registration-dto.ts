export class RegistrationDTO {
  // PERSONAL INFORMATION
  // General
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  birthplace: string;
  nationality: string;
  passportNumber: string;

  // Address
  street: string;
  houseNumber: string;
  mailbox: string;
  postalCode: string;
  township: string;
  country: string;

  // Contact person
  firstNameContact: string;
  middleNameContact: string;
  lastNameContact: string;
  relation: string;
  emailContact: string;
  phoneContact: string;

  // Medical
  allergies: string;
  medicalConditions: string;

  // ORGANIZATIONAL INFORMATION
  // Dates
  internshipOnline: boolean;
  startDate: Date;
  endDate: Date;

  // Spanish
  level: string;
  weeksOnline: number;
  onlineStartDate: Date;
  onlineEndDate: Date;
  weeks: number;
  offlineStartDate: Date;
  offlineEndDate: Date;

  // Motivation letter
  motivationLetter: string;

  // Info
  occupation: string;
  tasks: string;
  expectations: string;
  proposals: string;

  // QUESTIONS
  otherQuestions: string;
  experience: string;
  whyAnanau: string;
  firstHeard: string;
}
