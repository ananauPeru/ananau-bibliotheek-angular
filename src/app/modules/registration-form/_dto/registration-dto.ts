export class RegistrationDTO {
  userDetails: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    birthplace: string;
    nationality: string;
    passportNumber: string;
  } = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    birthplace: '',
    nationality: '',
    passportNumber: ''
  };

  address: {
    street: string;
    houseNumber: string;
    mailbox: string;
    postalCode: string;
    city: string;
    country: string;
  } = {
    street: '',
    houseNumber: '',
    mailbox: '',
    postalCode: '',
    city: '',
    country: ''
  };

  emergencyPerson: {
    firstName: string;
    middleName: string;
    lastName: string;
    relation: string;
    email: string;
    phone: string;
  } = {
    firstName: '',
    middleName: '',
    lastName: '',
    relation: '',
    email: '',
    phone: ''
  };

  medicalDetails: {
    allergies: string;
    medicalConditions: string;
  } = {
    allergies: '',
    medicalConditions: ''
  };

  internDetails: {
    startOfInternship: Date;
    endOfInternship: Date;
    spanishLessons: {
      spanishLevel: string;
      spanishLessonWeeksOnline: number;
      spanishLessonOnlineStart: Date;
      spanishLessonOnlineEnd: Date;
      datesOfSpanishOnlineIsConfirmed: boolean;
      spanishLessonWeeks: number;
      spanishLessonStart: Date;
      spanishLessonEnd: Date;
      datesOfSpanishIsConfirmed: boolean;
    };
    professionOrEducation: string;
    internshipTasks: string;
    internshipExpectations: string;
    internshipProposals: string;
    otherQuestions: string;
    experience: string;
    whyAnanau: string;
    whereFirstHeard: string;
    motivationLetter: string;
    paymentDescription: string;
    flightNumber: string;
    flightDateArrival: Date;
    registrationSubmitted: boolean;
    internshipConfirmed: boolean;
    internshipOnline: boolean;
  } = {
    startOfInternship: null,
    endOfInternship: null,
    spanishLessons: {
      spanishLevel: '',
      spanishLessonWeeksOnline: 0,
      spanishLessonOnlineStart: null,
      spanishLessonOnlineEnd: null,
      datesOfSpanishOnlineIsConfirmed: false,
      spanishLessonWeeks: 0,
      spanishLessonStart: null,
      spanishLessonEnd: null,
      datesOfSpanishIsConfirmed: false
    },
    professionOrEducation: '',
    internshipTasks: '',
    internshipExpectations: '',
    internshipProposals: '',
    otherQuestions: '',
    experience: '',
    whyAnanau: '',
    whereFirstHeard: '',
    motivationLetter: '',
    paymentDescription: '',
    flightNumber: '',
    flightDateArrival: null,
    registrationSubmitted: false,
    internshipConfirmed: false,
    internshipOnline: false
  };
}