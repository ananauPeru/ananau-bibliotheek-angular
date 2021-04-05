// USA
export const locale = {
  lang: "en",
  data: {
    // TRANSLATOR
    TRANSLATOR: {
      SELECT: "Select your language",
    },

    // ERRORS
    ERRORS: {
      TRY_AGAIN: "Something went wrong. Please try again later.",
    },

    // BUTTONS
    BUTTONS: {
      SAVE_CHANGES: "Save Changes",
      CANCEL: "Cancel",
    },

    // MENU
    MENU: {
      NEW: "new",
      ACTIONS: "Actions",
      CREATE_POST: "Create New Post",
      PAGES: "Pages",
      FEATURES: "Features",
      APPS: "Apps",
      DASHBOARD: "Dashboard",
      LIBRARY: {
        TITLE: "Library",
        OVERVIEW: "Overview",
      },
      MANAGEMENT: {
        TITLE: "User management",
        REGISTRATION: "Registration form",
      },
    },

    // AUTH PAGES
    AUTH: {
      GENERAL: {
        NEW: "New here?",
        TITLE: "Welcome to Añañau",
        WELCOMETITLE1: "Welcome to Asociación ONG Añañau!",
        WELCOMETITLE2:
          "A nonprofit and non-governmental organization for children and youngsters living in extreme poverty and unstable family",
        OR: "Or",
        SUBMIT_BUTTON: "Submit",
        CANCEL_BUTTON: "Cancel",
        NO_ACCOUNT: "Don't have an account?",
        SIGNUP_BUTTON: "Sign Up",
        FORGOT_BUTTON: "Forgot Password",
        BACK_BUTTON: "Back",
        PRIVACY: "Privacy",
        LEGAL: "Legal",
        CONTACT: "Contact",
      },
      LOGIN: {
        TITLE: "Login Account",
        BUTTON: "Sign In",
        ERROR: "The login details are incorrect",
      },
      FORGOT: {
        TITLE: "Forgotten Password?",
        DESC: "Enter your email to reset your password.",
        SUCCESS: "Your account has been successfully reset.",
      },
      REGISTER: {
        TITLE: "Sign Up",
        DESC: "Enter your details to create your account",
        SUCCESS: "Your account has been successfuly registered.",
        INCORRECT: "The registration details are incorrect",
      },
      INPUT: {
        EMAIL: "Email",
        FIRSTNAME: "Firstname",
        LASTNAME: "Lastname",
        PHONE: "Phone",
        DATEOFBIRTH: "Date of Birth",
        PASSWORD: "Password",
        CONFIRM_PASSWORD: "Confirm Password",
        USERNAME: "Username",
      },
      VALIDATION: {
        INVALID: "{{name}} is not valid",
        REQUIRED: "{{name}} is required",
        MIN_LENGTH: "{{name}} minimum length is {{min}}",
        AGREEMENT_REQUIRED: "Accepting terms & conditions are required",
        NOT_FOUND: "The requested {{name}} is not found",
        INVALID_LOGIN: "The login detail is incorrect",
        REQUIRED_FIELD: "Required field",
        MIN_LENGTH_FIELD: "Minimum field length:",
        MAX_LENGTH_FIELD: "Maximum field length:",
        INVALID_FIELD: "Field is not valid",
        INVALID_EMAIL: "The email is incorrect",
        FIRSTNAME_REQUIRED: "Firstname is required.",
        FIRSTNAME_MINLENGTH: "Firstname should have at least 3 symbols.",
        FIRSTNAME_MAXLENGTH: "Firstname should have maximum 100 symbols.",
        LASTNAME_REQUIRED: "Lastname is required.",
        LASTNAME_MINLENGTH: "Lastname should have at least 3 symbols.",
        LASTNAME_MAXLENGTH: "Lastname should have maximum 100 symbols.",
        EMAIL_REQUIRED: "Email is required.",
        EMAIL_INVALID: "Email is not valid.",
        EMAIL_MINLENGTH: "Email should have at least 3 symbols.",
        EMAIL_MAXLENGTH: "Email should have maximum 360 symbols.",
        PASSWORD_REQUIRED: "Password is required.",
        PASSWORD_MINLENGTH: "Password should have at least 3 symbols.",
        PASSWORD_MAXLENGTH: "Password should have maximum 360 symbols.",
        CONFIRMPASSWORD_REQUIRED: "Password confirmation is required.",
        CONFIRMPASSWORD_MINLENGTH:
          "Password confirmation should have at least 3 symbols.",
        CONFIRMPASSWORD_MAXLENGTH:
          "Password confirmation should have maximum 360 symbols.",
        PASSWORD_NO_MATCH: "'Password' and 'Confirm Password' didn't match.",
        PHONE_REQUIRED: "Phone is required.",
        PHONE_PATTERN:
          "Phone can only contain numbers, must begin with the symbol '+' and your country code.",
        PHONE_MINLENGTH: "Phone should have at least 3 symbols.",
        PHONE_MAXLENGTH: "Phone should have maximum 100 symbols.",
        DATEOFBIRTH_REQUIRED: "Date of birth is required.",
        DATEOFBIRTH_MINLENGTH: "Date of birth should have at least 3 symbols.",
        DATEOFBIRTH_MAXLENGTH: "Date of birth should have maximum 100 symbols.",
      },
    },

    // PROFILE
    PROFILE: {
      PERSONAL_INFORMATION: {
        TITLE: "Personal Information",
        SUBTITLE: "Update your personal information",
      },
      INPUT: {
        AVATAR: "Avatar",
        FIRSTNAME: "First Name",
        LASTNAME: "Last Name",
        PHONE: "Telephone",
        EMAIL: "Email Address",
        EMAIL_ALT: "Changing email address is not possible.",
        DATEOFBIRTH: "Geboortedatum",
      },
    },

    // REGISTRATION FORM
    REGISTRATION: {
      GENERAL: {
        STUDENT: "student",
        VOLUNTEER: "volunteer",
        PERSONAL: "Personal",
        ORGANIZATIONAL: "Organizational",
        SCANS: "Scans",
        QUESTIONS: "Questions",
        SAVE: "Save",
        SEND: "Send",
        ERRORS: {
          REQUIRED: "This field is required.",
          EMAIL: "This field expects an email address.",
          CHARACTERS: "This field expects at least {{value}} characters.",
          INCORRECT: "This field is not filled in correctly.",
        },
      },
      PERSONAL: {
        TITLE: "Personal information",
        GENERAL: {
          TITLE: "General",
          FIRST_NAME: "First name",
          MIDDLE_NAME: "Middle name",
          LAST_NAME: "Last name",
          EMAIL: "Email",
          SCHOOL_EMAIL: "School email",
          PHONE: "Phone number",
          BIRTH_DATE: "Date of birth",
          BIRTHPLACE: "Birthplace",
          NATIONALITY: "Nationality",
          PASSPORT: "Passport number",
        },
        ADDRESS: {
          TITLE: "Address",
          STREET: "Street",
          NUMBER: "House number",
          MAILBOX: "Mailbox",
          POSTAL_CODE: "Postal code",
          TOWNSHIP: "Township",
          COUNTRY: "Country",
        },
        CONTACT_PERSON: {
          TITLE: "Contact person",
          INFO:
            "Your contact person is the person we should be able to contact in case of an emergency.",
          FIRST_NAME: "First name",
          MIDDLE_NAME: "Middle name",
          LAST_NAME: "Last name",
          RELATION: "Relation",
          EMAIL: "Email",
          PHONE: "Phone number",
        },
        MEDICAL: {
          TITLE: "Medical details",
          ALLERGIES: "Allergies",
          CONDITIONS: "Medical conditions",
        },
      },
      ORGANIZATIONAL: {
        TITLE: "Organizational information",
        DATES: {
          TITLE: "Dates",
          START_VOLUNTEER: "Proposed start date volunteering",
          END_VOLUNTEER: "Proposed end date volunteering",
          START_STUDENT: "Proposed start date internship",
          END_STUDENT: "Proposed end date internship",
          LEAVE_START: "Proposed start date period of leave",
          LEAVE_END: "Proposed end date period of leave",
          LEAVE_INFO:
            "You have the option to schedule a period of leave during your internship. This is determined in consultation with your school and the organization. It is strongly recommended and requested to plan this period of leave at the end of the internship. If you choose not to schedule a period of leave, please leave this field empty.",
        },
        SPANISH: {
          TITLE: "Spanish",
          LEVEL: "Describe your level of Spanish",
          WEEKS: "Number of weeks Spanish lessons",
          WEEKS_INFO:
            "If you do not yet speak a basic level of Spanish, it is mandatory to take a minimum of 4 weeks of Spanish lessons. If you already have a basis, the lessons are without obligation, but always recommended to improve your level.",
        },
        INFO: {
          TITLE: "Info",
          OCCUPATION_VOLUNTEER: "Describe your profession",
          OCCUPATION_STUDENT: "Describe your field of study",
          DEGREE: "Describe your current degree",
          INTERNSHIP_CONTEXT: {
            TITLE: "Internship context",
            PROJECT: "Internship project",
            THESIS: "(Bachelor's) thesis",
            OTHER: "Other",
          },
          TASKS: "What tasks would you like to work on?",
          TASKS_INFO_VOLUNTEER:
            "Describe the tasks you would you like to work on within the organization.",
          TASKS_INFO_STUDENT:
            "Describe the tasks your school expects you to accomplish and/or tell us yourself what tasks you would like to work on within the organization.",
          EXPECTATIONS: "What are your expectations?",
          EXPECTATIONS_INFO_VOLUNTEER:
            "Describe your expectations of your possible volunteering work at Añañau.",
          EXPECTATIONS_INFO_STUDENT:
            "Describe your expectations of your possible internship at Añañau.",
          PROPOSALS: "Do you have any proposals?",
          PROPOSALS_INFO:
            "If you have any proposals concerning your work within the organization, please provide them here.",
        },
      },
      SCANS: {
        TITLE: "Scans & passport photo",
        DROP_SELECT: "Drop your file(s) here or click to select your file(s).",
        PASSPORT: "Scan international passport",
        GOOD_CONDUCT: "Scan certificate of good conduct type II",
        GOOD_CONDUCT_INFO:
          "You can request this from your city or municipal service.",
        DIPLOMA: "Scan diploma or certificate education",
        PHOTO: "Passport photo",
      },
      QUESTIONS: {
        TITLE: "Questions",
        EXTRA: {
          TITLE: "Some extra questions from us",
          EXPERIENCE: "Do you have any experience with volunteering?",
          EXPERIENCE_INFO:
            "In case you already have some sort of experience with volunteering, please describe it here.",
          WHY_ANANAU_VOLUNTEER:
            "Why did you choose Añañau to apply for volunteering?",
          WHY_ANANAU_STUDENT:
            "Why did you choose Añañau to apply your internship?",
          FIRST_HEARD: {
            TITLE: "Where did you first hear of Añañau?",
            WEBSITE: "Website",
            FACEBOOK: "Facebook",
            INSTAGRAM: "Instagram",
            OTHER_PERSON: "Other person",
            NEWSLETTER: "Newsletter",
            SCHOOL: "Through school",
            OTHER: "Other",
          },
        },
        CONTACT: {
          TITLE: "Do you have any questions for us?",
          INFO:
            "After you have submitted your registration, we will try to contact you as soon as possible. Usually, we will even set up a video call to discuss some things and answer each other's questions. Still, if you already have questions about the registration process or the internship in general, you can always contact us via email or WhatsApp.",
        },
      },
    },
  },
};
