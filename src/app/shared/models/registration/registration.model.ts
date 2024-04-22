export abstract class RegistrationModel {
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
  };

  address: {
    street: string;
    houseNumber: string;
    mailbox: string;
    postalCode: string;
    city: string;
    country: string;
  };

  emergencyPerson: {
    firstName: string;
    middleName: string;
    lastName: string;
    relation: string;
    email: string;
    phone: string;
  };

  medicalDetails: {
    allergies: string;
    medicalConditions: string;
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
  };

  constructor(data?: Partial<RegistrationModel>) {
    this.userDetails = {
      firstName: data?.userDetails?.firstName || '',
      middleName: data?.userDetails?.middleName || '',
      lastName: data?.userDetails?.lastName || '',
      email: data?.userDetails?.email || '',
      phone: data?.userDetails?.phone || '',
      dateOfBirth: data?.userDetails?.dateOfBirth || null,
      birthplace: data?.userDetails?.birthplace || '',
      nationality: data?.userDetails?.nationality || '',
      passportNumber: data?.userDetails?.passportNumber || '',
    };

    this.address = {
      street: data?.address?.street || '',
      houseNumber: data?.address?.houseNumber || '',
      mailbox: data?.address?.mailbox || '',
      postalCode: data?.address?.postalCode || '',
      city: data?.address?.city || '',
      country: data?.address?.country || '',
    };

    this.emergencyPerson = {
      firstName: data?.emergencyPerson?.firstName || '',
      middleName: data?.emergencyPerson?.middleName || '',
      lastName: data?.emergencyPerson?.lastName || '',
      relation: data?.emergencyPerson?.relation || '',
      email: data?.emergencyPerson?.email || '',
      phone: data?.emergencyPerson?.phone || '',
    };

    this.medicalDetails = {
      allergies: data?.medicalDetails?.allergies || '',
      medicalConditions: data?.medicalDetails?.medicalConditions || '',
    };

    this.internDetails = {
      startOfInternship: data?.internDetails?.startOfInternship || null,
      endOfInternship: data?.internDetails?.endOfInternship || null,
      spanishLessons: {
        spanishLevel: data?.internDetails?.spanishLessons?.spanishLevel || '',
        spanishLessonWeeksOnline: data?.internDetails?.spanishLessons?.spanishLessonWeeksOnline || 0,
        spanishLessonOnlineStart: data?.internDetails?.spanishLessons?.spanishLessonOnlineStart || null,
        spanishLessonOnlineEnd: data?.internDetails?.spanishLessons?.spanishLessonOnlineEnd || null,
        datesOfSpanishOnlineIsConfirmed: data?.internDetails?.spanishLessons?.datesOfSpanishOnlineIsConfirmed || false,
        spanishLessonWeeks: data?.internDetails?.spanishLessons?.spanishLessonWeeks || 0,
        spanishLessonStart: data?.internDetails?.spanishLessons?.spanishLessonStart || null,
        spanishLessonEnd: data?.internDetails?.spanishLessons?.spanishLessonEnd || null,
        datesOfSpanishIsConfirmed: data?.internDetails?.spanishLessons?.datesOfSpanishIsConfirmed || false,
      },
      professionOrEducation: data?.internDetails?.professionOrEducation || '',
      internshipTasks: data?.internDetails?.internshipTasks || '',
      internshipExpectations: data?.internDetails?.internshipExpectations || '',
      internshipProposals: data?.internDetails?.internshipProposals || '',
      otherQuestions: data?.internDetails?.otherQuestions || '',
      experience: data?.internDetails?.experience || '',
      whyAnanau: data?.internDetails?.whyAnanau || '',
      whereFirstHeard: data?.internDetails?.whereFirstHeard || '',
      motivationLetter: data?.internDetails?.motivationLetter || '',
      paymentDescription: data?.internDetails?.paymentDescription || '',
      flightNumber: data?.internDetails?.flightNumber || '',
      flightDateArrival: data?.internDetails?.flightDateArrival || null,
      registrationSubmitted: data?.internDetails?.registrationSubmitted || false,
      internshipConfirmed: data?.internDetails?.internshipConfirmed || false,
      internshipOnline: data?.internDetails?.internshipOnline || false,
    };
  }
}