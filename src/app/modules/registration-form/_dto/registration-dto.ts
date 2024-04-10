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
  }

  address: {
    street: string;
    houseNumber: string;
    mailbox: string;
    postalCode: string;
    city: string;
    country: string;
  }

  emergencyPerson: {
    firstName: string;
    middleName: string;
    lastName: string;
    relation: string;
    email: string;
    phone: string;
  }

  medicalDetails: {
    allergies: string;
    medicalConditions: string;
  }

  internDetails: {
    startOfInternship: Date;
    endOfInternship: Date;
    spanishLessons: {
      spanishLevel: string;
      spanishLessonWeeksOnline: number;
      spanishLessonOnlineStart: Date;
      spanishLessonOnlineEnd: Date;
      datesOfSpanishOnlineIsConfirmed: boolean,
      spanishLessonWeeks: number;
      spanishLessonStart: Date;
      spanishLessonEnd: Date;
      datesOfSpanishIsConfirmed: boolean;
    },
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
  }
}
