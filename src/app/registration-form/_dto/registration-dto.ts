export class RegistrationDTO {
  // PERSONAL INFORMATION
  // General
  firstName: string;
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

  // Contact person
  firstNameContact: string;
  lastNameContact: string;
  relation: string;
  emailContact: string;
  phoneContact: string;

  // Medical
  allergies: string;
  medicalConditions: string;

  // ORGANIZATIONAL INFORMATION
  // Dates
  startDate: Date;
  endDate: Date;

  // Spanish
  level: string;
  weeks: number;

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
