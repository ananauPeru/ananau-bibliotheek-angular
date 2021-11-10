import { EducationalCourses } from "../../library/_models/educational-courses.enum";

// USA
export const locale = {
  lang: 'en',
  data: {
    // TRANSLATOR
    TRANSLATOR: {
      SELECT: 'Select your language',
    },
    EDIT: "Edit    ",
    DOWNLOAD: "Download",
    DOWNTAN: "Download translation",
    // ERRORS
    ERRORS: {
      TRY_AGAIN: 'Something went wrong. Please try again later.',
    },

    // BUTTONS
    BUTTONS: {
      SAVE: 'Save',
      SAVE_CHANGES: 'Save changes',
      SUBMIT: 'Submit',
      CANCEL: 'Cancel',
      DOWNLOAD: 'Download',
      CONFIRM: 'Confirm',
      DISCONFIRM: 'Disconfirm',
    },

    // MENU
    MENU: {
      NEW: 'new',
      ACTIONS: 'Actions',
      CREATE_POST: 'Create New Post',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard',
      ZOEK: 'Search',
      NO_ROLES:
        "You don't have access to any modules yet. Please contact us to ask for access.",
      HI: 'Hi',
      TODAY: 'Today',
      LIBRARY: {
        TITLE: 'Library',
        OVERVIEW: 'Overview',
        BOOKS: 'Books',
        ADD_BOOK: 'Add book',
        ITEMS: 'Items',
        ADD_ITEM: 'Add item',
        LOANING: 'Loaning',
        NEW_LOAN: 'New loan',
        LES: 'Classes',
        ADD_LES: 'Add lesson',
      },
      MANAGEMENT: {
        TITLE: 'User management',
        REGISTRATION: 'Registration form',
      },
      ORGANIZATION: {
        TITLE: 'Organization',
        ROLES: 'Role Management',
        REGISTRATIONS: 'Registrations',
      },
      // We dont translate documentation (IT) to different languages
      DOCUMENTATION: {
        TITLE: 'IT - Documentation',
        GETTING_STARTED: 'Getting started',
        S0_PREPARATIONS: '0 - Before starting',
        S1_SETTING_UP: '1 - Setting up',
        S2_BEST_PRACTICES: {
          TITLE: '2 - Best practices',
          MODELS_AND_TABLES: 'Models and Tables',
          GITHUB: 'Working with GitHub',
        },
        S3_DEPLOYMENT_AND_AZURE: '3 - Deployment - Azure',
        TODOS: "ToDo's",
      },
    },

    // AUTH PAGES
    AUTH: {
      GENERAL: {
        NEW:
          'Are you looking to volunteer, are you looking for an internship or are you a new employee at Añañau?',
        TITLE: 'Welcome to Añañau',
        WELCOMETITLE1: 'Welcome to Asociación ONG Añañau!',
        WELCOMETITLE2:
          'A nonprofit and non-governmental organization for children and youngsters living in extreme poverty and unstable family',
        OR: 'Or',
        SUBMIT_BUTTON: 'Submit',
        CANCEL_BUTTON: 'Cancel',
        NO_ACCOUNT: "Don't have an account?",
        SIGNUP_BUTTON: 'Then sign up here',
        FORGOT_BUTTON: 'Forgot Password',
        BACK_BUTTON: 'Back',
        PRIVACY: 'Privacy',
        LEGAL: 'Legal',
        CONTACT: 'Contact us',
        WEBSITE: 'Website',
        SUBSCRIBE: 'Subscribe to our newsletter here',
        SITE: 'https://mailchi.mp/ed0773cba4b8/ananaunewlettersignup',
      },
      LOGIN: {
        TITLE: 'Login Account',
        BUTTON: 'Sign In',
        ERROR: 'The login details are incorrect',
        ALREADY_ACCOUNT: 'Already have an account?',
      },
      FORGOT: {
        TITLE: 'Forgotten Password?',
        DESC: 'Enter your email to reset your password.',
        SUCCESS: 'Your account has been successfully reset.',
      },
      REGISTER: {
        TITLE: 'Sign up',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfully registered.',
        INCORRECT: 'The registration details are incorrect',
        VOLUNTEER: 'Volunteer',
        STUDENT: 'Student',
        EMPLOYEE: 'Employee',
        VOLUNTEER_INFO:
          'I want to volunteer online or on site for Añañau and therefore want access to the volunteer registration form.',
        STUDENT_INFO:
          'I am a student who wants to do an internship at Añañau and therefore want access to the student registration form.',
        EMPLOYEE_INFO:
          'I am a new employee at Añañau and have been instructed to create a personal account on this platform.',
      },
      INPUT: {
        EMAIL: 'Email',
        FIRSTNAME: 'First name',
        LASTNAME: 'Last name',
        PHONE: 'Phone',
        DATEOFBIRTH: 'Date of Birth',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Username',
        TERMS: 'I agree that Añañau can keep my data indefinitely.',
      },

      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} is required',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
        INVALID_EMAIL: 'The email is incorrect',
        FIRSTNAME_REQUIRED: 'First name is required.',
        FIRSTNAME_MINLENGTH: 'First name should have at least 3 symbols.',
        FIRSTNAME_MAXLENGTH: 'First name should have maximum 100 symbols.',
        LASTNAME_REQUIRED: 'Last name is required.',
        LASTNAME_MINLENGTH: 'Last name should have at least 3 symbols.',
        LASTNAME_MAXLENGTH: 'Last name should have maximum 100 symbols.',
        EMAIL_REQUIRED: 'Email is required.',
        EMAIL_INVALID: 'Email is not valid.',
        EMAIL_MINLENGTH: 'Email should have at least 3 symbols.',
        EMAIL_MAXLENGTH: 'Email should have maximum 360 symbols.',
        PASSWORD_REQUIRED: 'Password is required.',
        PASSWORD_MINLENGTH: 'Password should have at least 3 symbols.',
        PASSWORD_MAXLENGTH: 'Password should have maximum 360 symbols.',
        CONFIRMPASSWORD_REQUIRED: 'Password confirmation is required.',
        CONFIRMPASSWORD_MINLENGTH:
          'Password confirmation should have at least 3 symbols.',
        CONFIRMPASSWORD_MAXLENGTH:
          'Password confirmation should have maximum 360 symbols.',
        PASSWORD_NO_MATCH: "'Password' and 'Confirm Password' didn't match.",
        PHONE_REQUIRED: 'Phone is required.',
        PHONE_PATTERN:
          "Phone can only contain numbers, must begin with the symbol '+' and your country code.",
        PHONE_MINLENGTH: 'Phone should have at least 3 symbols.',
        PHONE_MAXLENGTH: 'Phone should have maximum 100 symbols.',
        DATEOFBIRTH_REQUIRED: 'Date of birth is required.',
        DATEOFBIRTH_MINLENGTH: 'Date of birth should have at least 3 symbols.',
        DATEOFBIRTH_MAXLENGTH: 'Date of birth should have maximum 100 symbols.',
      },
    },

    // PROFILE
    PROFILE: {
      PERSONAL_INFORMATION: {
        TITLE: 'Personal Information',
        SUBTITLE: 'Update your personal information',
      },
      INPUT: {
        AVATAR: 'Avatar',
        FIRSTNAME: 'First Name',
        LASTNAME: 'Last Name',
        PHONE: 'Telephone',
        EMAIL: 'Email Address',
        EMAIL_ALT: 'Changing email address is not possible.',
        DATEOFBIRTH: 'Date of Birth',
      },
    },

    // REGISTRATION FORM
    REGISTRATION: {
      GENERAL: {
        STUDENT: 'Student',
        VOLUNTEER: 'Volunteer',
        PERSONAL: 'Personal',
        ORGANIZATIONAL: 'Organizational',
        SCANS: 'Scans',
        QUESTIONS: 'Questions',
        ERRORS: {
          REQUIRED: 'This field is required.',
          EMAIL: 'This field expects an email address.',
          CHARACTERS: 'This field expects at least {{value}} characters.',
          INCORRECT: 'This field is not filled in correctly.',
        },
        TOASTS: {
          SUCCESS: 'Success',
          ERROR: 'Error',
          TEXT_SUBMIT_SUCCESS:
            'Your textual data has been successfully submitted.',
          TEXT_SAVE_SUCCESS: 'Your textual data has been successfully saved.',
          IMAGE_SUBMIT_SUCCESS:
            'Your image files have been successfully submitted.',
          IMAGE_SAVE_SUCCESS: 'Your image files have been successfully saved.',
          TEXT_SUBMIT_ERROR:
            'Something went wrong while submitting your textual data. Please try again later.',
          TEXT_SAVE_ERROR:
            'Something went wrong while saving your textual data. Please try again later.',
          IMAGE_SUBMIT_ERROR:
            'Something went wrong while submitting your image files. Please try again later.',
          IMAGE_SAVE_ERROR:
            'Something went wrong while saving your image files. Please try again later.',
        },
      },
      PERSONAL: {
        TITLE: 'Personal information',
        GENERAL: {
          TITLE: 'General',
          FIRST_NAME: 'First name',
          MIDDLE_NAME: 'Middle name',
          LAST_NAME: 'Last name',
          EMAIL: 'Email',
          SCHOOL_EMAIL: 'School email',
          PHONE: 'Phone number',
          BIRTH_DATE: 'Date of birth',
          BIRTHPLACE: 'Birthplace',
          NATIONALITY: 'Nationality',
          PASSPORT: 'Passport number',
        },
        ADDRESS: {
          TITLE: 'Address',
          STREET: 'Street',
          NUMBER: 'House number',
          MAILBOX: 'Mailbox',
          POSTAL_CODE: 'Postal code',
          TOWNSHIP: 'Township',
          COUNTRY: 'Country',
        },
        CONTACT_PERSON: {
          TITLE: 'Contact person',
          INFO:
            'Your contact person is the person we should be able to contact in case of an emergency.',
          FIRST_NAME: 'First name',
          MIDDLE_NAME: 'Middle name',
          LAST_NAME: 'Last name',
          RELATION: 'Relation',
          EMAIL: 'Email',
          PHONE: 'Phone number',
        },
        MEDICAL: {
          TITLE: 'Medical details',
          ALLERGIES: 'Allergies',
          CONDITIONS: 'Medical conditions',
        },
      },
      ORGANIZATIONAL: {
        TITLE: 'Organizational information',
        DATES: {
          TITLE: 'Dates',
          ONLINE: 'Online volunteering',
          ONLINE_INFO:
            'In addition to doing voluntary work at the organization in Peru itself, it is also possible to do work remotely.',
          START_VOLUNTEER: 'Proposed start date volunteering',
          END_VOLUNTEER: 'Proposed end date volunteering',
          START_STUDENT: 'Proposed start date internship',
          END_STUDENT: 'Proposed end date internship',
          LEAVE_START: 'Proposed start date period of leave',
          LEAVE_END: 'Proposed end date period of leave',
          LEAVE_INFO:
            'You have the option to schedule a period of leave during your internship. This is determined in consultation with your school and the organization. It is strongly recommended and requested to plan this period of leave at the end of the internship. If you choose not to schedule a period of leave, please leave this field empty.',
        },
        SPANISH: {
          TITLE: 'Spanish',
          INFO_VOLUNTEER:
            'If you do not yet speak a basic level of Spanish, it is mandatory to take a minimum of 2 months of Spanish lessons. If you already have a basis, the lessons are without obligation, but always recommended to improve your level.',
          INFO_STUDENT:
            'If you do not yet speak a basic level of Spanish, it is mandatory to take a minimum of 3 months of Spanish lessons. If you already have a basis, the lessons are without obligation, but always recommended to improve your level.',
          LEVEL: 'Describe your level of Spanish',
          WEEKS_ONLINE: 'Number of weeks online Spanish lessons',
          WEEKS_ONLINE_INFO_VOLUNTEER:
            'If you do not yet speak a basic level of Spanish, we recommend you apply for 4 weeks of online Spanish lessons. These lessons will be provided through video call, prior to your arrival at Añañau.',
          WEEKS_ONLINE_INFO_STUDENT:
            'If you do not yet speak a basic level of Spanish, we recommend you apply for 8 weeks of online Spanish lessons. These lessons will be provided through video call, prior to your arrival at Añañau.',
          WEEKS: 'Number of weeks Spanish lessons on-site',
          WEEKS_INFO:
            'If you do not yet speak a basic level of Spanish, we recommend you apply for 4 weeks of Spanish lessons on-site.',
        },
        INFO: {
          TITLE: 'Info',
          OCCUPATION_VOLUNTEER: 'Describe your profession',
          OCCUPATION_STUDENT: 'Describe your field of study',
          DEGREE: 'Describe your current degree',
          INTERNSHIP_CONTEXT: {
            TITLE: 'Internship context',
            PROJECT: 'Internship project',
            THESIS: "(Bachelor's) thesis",
            OTHER: 'Other',
          },
          TASKS: 'What tasks would you like to work on?',
          TASKS_INFO_VOLUNTEER:
            'Describe the tasks you would you like to work on within the organization.',
          TASKS_INFO_STUDENT:
            'Describe the tasks your school expects you to accomplish and/or tell us yourself what tasks you would like to work on within the organization.',
          EXPECTATIONS: 'What are your expectations?',
          EXPECTATIONS_INFO_VOLUNTEER:
            'Describe your expectations of your possible volunteering work at Añañau.',
          EXPECTATIONS_INFO_STUDENT:
            'Describe your expectations of your possible internship at Añañau.',
          PROPOSALS: 'Do you have any proposals?',
          PROPOSALS_INFO:
            'If you have any proposals concerning your work within the organization, please provide them here.',
        },
      },
      SCANS: {
        TITLE: 'Scans & passport photo',
        DROP_SELECT: 'Drop your file(s) here or click to select your file(s).',
        PASSPORT: 'Scan international passport',
        GOOD_CONDUCT: 'Scan certificate of good conduct type II',
        GOOD_CONDUCT_INFO:
          'You can request this from your city or municipal service.',
        DIPLOMA: 'Scan diploma or certificate education',
        PHOTO: 'Passport photo',
        WARNING:
          "Some images may keep loading continuously. If you still want to see them, click one. You can simply close the screen that opens afterwards in case you don't want to select new images.",
      },
      QUESTIONS: {
        TITLE: 'Questions',
        EXTRA: {
          TITLE: 'Some extra questions from us',
          EXPERIENCE: 'Do you have any experience with volunteering?',
          EXPERIENCE_INFO:
            'In case you already have some sort of experience with volunteering, please describe it here.',
          WHY_ANANAU_VOLUNTEER:
            'Why did you choose Añañau to apply for volunteering?',
          WHY_ANANAU_STUDENT:
            'Why did you choose Añañau to apply your internship?',
          FIRST_HEARD: {
            TITLE: 'Where did you first hear of Añañau?',
            WEBSITE: 'Website',
            FACEBOOK: 'Facebook',
            INSTAGRAM: 'Instagram',
            OTHER_PERSON: 'Other person',
            NEWSLETTER: 'Newsletter',
            SCHOOL: 'Through school',
            OTHER: 'Other',
          },
        },
        CONTACT: {
          TITLE: 'Do you have any questions for us?',
          INFO:
            "After you have submitted your registration, we will try to contact you as soon as possible. Usually, we will even set up a video call to discuss some things and answer each other's questions. Still, if you already have questions about the registration process or the internship in general, you can always contact us via email or WhatsApp.",
        },
      },
      TERMS: {
        TITLE: 'Terms of agreement',
        PART_1:
          'As part of the online volunteer/internship/face-to-face volunteering program in NGO Añañau, you will have tasks in which you will have access to sensitive and private information, for that reason the association is forced to safeguard their interests and so you are strictly prohibited from using any type of information (intellectual, oral, visual, writing, scientific, technological and others), obtained in the association, that belongs to Añañau; in the same way, it is forbidden to transmit any type of information that was mentioned above in this paragraph to third parties or institutions of any kind, directly or indirectly.',
        PART_2:
          'Through this letter, you will not be able to make any type of comment, written or through verbal publication, to third parties or entities of any kind, or in a virtual way (e.g. through social networks such as Facebook, Instagram, WhatsApp, Twitter, etc.) that can damage the image and reputation of Añañau.',
        PART_3:
          'In the case of non-respect to all of the above, you will be subject to civil and criminal liability, for possible damages caused to the association, according to Peruvian law. This confidentiality agreement will be maintained indefinitely, now and in the future, until the association considers it finished, or by dissolution of the same.',
        AGREE: 'I agree with the terms mentioned above.',
      },
    },

    LIBRARY: {
      TRAN: "Translation",
      DOWN: 'The document is still uploading',
      DON:'The document has been uploaded',
      GENERAL: {},
      CLASS : {
        VRAAG: "Do you want to upload a translation of the document?",
        YES: "Yes",
        NO:"No",
        SUBJECT :{
          TITLE: "Subject",
          ER: 'Subject is required',
          WISKUNDE: "Mathematics",
          ICT: "Informatics",
          ENGELS: "English",
          FRANS: "French",
          GESCHIEDENIS: "History",
          AARDERIJKSKUNDE: "Geography",
          SOCIALCARE: "Social Care",
          PSYCHOLOGY: "Psychology",
          ARTS: "Arts and Crafts",
          NUTRITION: "Nutrition",
          COMMUNICATION: "Communication for Development",
          OTHER: "Other",
        },
        CREATE : {
          NAAM: 'Create a new lesson',
          TERUG : 'Back',
          CANCEL: 'Cancel',
          MAAK: 'Make a new lesson',
          BEWERK: 'Save adjustments',
          FILTER:'Filter by title, author or description',
          WAAR:'The document cannot be displayed below. It is present. If you want to upload another document, simply upload a new document below.',
          TITEL: {
            NAAM : 'Title',
            BES : ' Enter the title of the lesson',
            ER: 'Title is required',
            MIN : 'Title must at least have 3 letters ',
            MAX : 'The tittle is too long, make it shorter.'
          },
          AUTEUR: {
            NAAM : 'Author',
            BES : 'Enter the author of the lesson.',
            ER: 'Author is required',
            MIN : 'Author must have at least 3 letters',
            MAX : 'The author is too long, make is shorter.'
          }, 
          DATUM: {
            NAAM : 'When created',
            BES : 'Enter the date from when this lesson was created',
            ER: 'Date is required'
          },
          PUBLIEK: {
            NAAM : 'Target audience',
            BES : 'What age group is this class for?',
            ER: 'Target audience is required',
            KLEUTER : 'Kindergarden',
            LAGERESCHOOL : 'Primary school',
            MIDDELBAAR : 'Secondary school',
          }, 
          LANGUAGE: {
            NAAM : 'Language',
            BES : 'In what language is the document written?',
            ER: 'Language is required',
            NEDERLANDS : 'Dutch',
            ENGELS : 'English',
            SPAANS : 'Spanish',
          },
          BESCHRIJVING: {
            NAAM : 'Description',
            BES : 'Provide additional information about het lesson here.',
            ER: 'The description is required',
            MIN : 'Description must contain at least 3 letters',
            MAX : 'The description is too long, make it shorter.'
          }, 
          UP : {
            NAAM : "Upload zone",
            HIER : "Click here to slect a document",
            BES : "Upload maximum 1 document. ",
            BEST: "If the document continues to load after selecting, click on the document again. "
          }
        }
      },
      CREATE: {
        BOOK: {
          EDIT_BOOK: 'Edit Book',
          CREATE_NEW_BOOK: 'Create New Book',
          BACK: 'Back',
          TITLE: {
            TITLE: 'Title',
            F1: 'Please enter the Title of the book.',
            F2: 'Title is required',
            F3: 'Title should have at least 3 symbols',
            F4: 'Title should have maximum 100 symbols',
          },
          AUTHOR: {
            TITLE: 'Author',
            F1: 'Please enter the Author of the book.',
            F2: 'Author is required',
            F3: 'Author should have at least 3 symbols',
            F4: 'Author should have maximum 100 symbols',
          },
          PURCHASED_AT: {
            TITLE: 'Purchased At',
            F1: 'Please enter the Purchase Date of the book.',
            F2: 'Purchase date is required',
          },
          GENRE: {
            TITLE: 'Genre',
            D_DEFAULT: 'Choose Genre',
            F1: 'Please select a Genre.',
            F2: 'Genre is required.',
          },
          STATE: {
            TITLE: 'State',
            D_DEFAULT: 'Select State',
            F1: 'Please select the State of the book.',
            F2: 'State is required.',
          },
          PHOTO: {
            TITLE: 'Upload a photo for this Book',
            MESSAGE: 'Drop your image here or click to select your image.',
          },
          QUANTITY: {
            TITLE: 'Quantity',
            F1: 'Please insert a Quantity for the Book.',
            F2: 'Quantity is required.',
          },
          DESCRIPTION: {
            TITLE: 'Description',
            PH: 'Describe the item...',
          },
          SAVE: 'Save Changes',
          CREATE: 'Create',
          SAVE_CHANGES: 'Save Changes',
          CREATE_ITEM: 'Create',
          CANCEL: 'Cancel',
          DELETE: 'Delete',
        },
        ITEM: {
          EDIT_ITEM: 'Edit Item',
          CREATE_NEW_ITEM: 'Create New Item',
          BACK: 'Back',
          TITLE: {
            TITLE: 'Title',
            F1: 'Please enter the Title of the Item.',
            F2: 'Title is required',
            F3: 'Title should have at least 3 symbols',
            F4: 'Title should have maximum 100 symbols',
          },
          BRAND: {
            TITLE: 'Brand',
            F1: 'Please enter the Brand of the Item.',
            F2: 'Brand is required',
            F3: 'Brand should have at least 3 symbols',
            F4: 'Brand should have maximum 100 symbols',
          },
          PURCHASED_AT: {
            TITLE: 'Purchased At',
            F1: 'Please enter the Purchase Date of the Item.',
            F2: 'Purchase Date is required',
          },
          PURPOSE: {
            TITLE: 'Purpose',
            D_DEFAULT: 'Select Purpose',
            F1: 'Please select a Purpose.',
            F2: 'Purpose is required.',
          },
          COURSE: {
            TITLE: 'Course',
            D_DEFAULT: 'Select Course',
            F1: 'Please select the Course of the Item.',
            F2: 'Course is required.',
          },
          QUANTITY: {
            TITLE: 'Quantity',
            F1: 'Please enter the Quantity of the item.',
            F2: 'Quantity is required.',
            F3: 'The minimum Quantity should be 1.',
            F4: 'The maximum Quantity should be 1000.',
          },
          CODE: {
            TITLE: 'CODE',
            F1: 'Please insert a Code for the Item.',
            F2: 'Code is required.',
          },
          PIECES: {
            TITLE: 'Pieces',
            F1: 'Please explain the Pieces of a Quantity for an item.',
            F2: 'Pieces is required',
            F3: 'Pieces should have at least 3 symbols',
            F4: 'Pieces should have maximum 100 symbols',
          },
          PHOTO: {
            TITLE: 'Upload a photo for this Item',
            MESSAGE: 'Drop your image here or click to select your image.',
          },
          DESCRIPTION: {
            TITLE: 'Description',
            PH: 'Describe the item...',
          },
          SAVE_CHANGES: 'Save Changes',
          CREATE_ITEM: 'Create',
          CANCEL: 'Cancel',
          DELETE: 'Delete',
        },
      },
      OVERVIEW: {
        BOOK: {
          TITLE: 'All Books in Library',
          ADD: 'Add New Book',
          GENRE: 'Genre',
          FILTER_PH: 'Filter...',
          DESCRIPTION: 'Description',
          AUTHOR: 'Author',
          STATE: 'State',
          CREATED_AT: 'Created at',
          LAST_UPDATE: 'Last update',
          IN_STOCK: 'in stock',
        },
        ITEM: {
          TITLE: 'All Items in Library',
          ADD: 'Add New Item',
          COURSE: 'Course',
          FILTER_PH: 'Filter...',
          DESCRIPTION: 'Description',
          BRAND: 'Brand',
          PURPOSE: 'Purpose',
          CREATED_AT: 'Created at',
          LAST_UPDATE: 'Last update',
          IN_STOCK: 'in stock',
        },
        LOAN: {
          TITLE: 'All Loaned Out Items and Books',
          FILTER_PH: 'Filter...',
          FILTER_SUB:
            'Try searching and filtering on Title of the Item/Book, Name of User or Email of User.',
          NAME: 'Name',
          LOANED_BY: 'Loaned By',
          LOANED_AT: 'Loaned At',
          RETURN_DATE: 'Return Date',
          DAYS_REMAINING: 'Days Remaining',
          DAYS_LATE: 'Days Late',
          NO_RESULTS: 'No Results...',

          ADD_LOAN: {
            LOAN_DETAILS: 'Loan Details',
            RETURN_MANAGEMENT: 'Return Management',
            SIGN_OFF: 'Sign Off',
            CREATE_LOAN: 'Create Loan',
            CLOSE_LOAN: 'Close Loan',
            EDIT_LOAN: 'Edit Loan',
          },
          LOAN_DETAILS: {
            ITEM_INPUT:
              'Choose a Book or an Educational Item to be loaned out.',
            BOOKS: 'Books',
            ITEMS: 'Educational Items',
            ITEM_INPUT_PH: 'Type in the title of the Item/Book',
            ITEM_INPUT_SUB:
              'Type in the name of the desired item, you can choose from the filtered results...',
            USER_INPUT: 'Choose the User who is loaning out the Book/Item.',
            USER: 'User',
            USER_INPUT_PH: 'Type in a name or email',
            USER_INPUT_SUB:
              ' Type in the name or email of the user, you can choose from the filtered results...',
            LOANED_AT: 'Loaned At',
            LOANED_AT_F1: 'Please enter the Loaned Date of the item.',
            LOANED_AT_F2: 'Loaned date is required',
            EXPECTED_RETURN_DATE: 'Expected Return Date',
            EXPECTED_RETURN_DATE_F1:
              'Please enter the expected Return Date of the item.',
            EXPECTED_RETURN_DATE_F2: 'Expected Return date is required',
            STATE: 'State when Loaning',
            STATE_GOOD: 'Good',
            STATE_NORMAL: 'Normal usage signs',
            STATE_BAD: 'Bad',
            STATE_F1: 'Please select a State for the item.',
            STATE_F2: 'State is required',
            QUANTITY: 'Quantity',
            QUANTITY_F1: 'Please enter the Quantity of the loaned items.',
            QUANTITY_F2: 'Quantity is required.',
            QUANTITY_F3: 'The minimum Quantity should be 1.',
            QUANTITY_F4: 'Quantity in stock: ',
            STATE_DESC: 'State Description',
            STATE_DESC_PH:
              'Please describe the state in more detail if necessary.',
          },
          RETURN_DETAILS: {
            RETURNED_AT: 'Returned At',
            RETURNED_AT_F1: ' Please enter the Return Date of the item.',
            RETURNED_AT_F2: 'Return Date is required',
            STATE: 'State when Returned',
            STATE_GOOD: 'Good',
            STATE_NORMAL: 'Normal usage signs',
            STATE_BAD: 'Bad',
            STATE_F1: 'Please select a Return State for the item.',
            STATE_F2: 'Return State is required',
            STATE_DESC: 'Return State Description',
            STATE_DESC_PH:
              'Please describe the state in more detail if necessary.',
          },
          SIGN_OFF: {
            MAIN_TITLE: 'Signing Off (Closing) Loan',
            MAIN_TITLE_SUB:
              'You are about to sign off and close this loan. Please check all of the details below and make changes if necessary... If there is a remark you would like to add, you can write it down in the text box below before closing.',
            TYPE: 'Type',
            TITLE: 'Title',
            QUANTITY: 'Quantity',
            USER: 'User',
            LOAN_DATE: 'Loan Date',
            LOAN_STATE: 'Loan State',
            LOAN_STATE_DESC: 'Loan State Description',
            EXPECTED_RETURN_DATE: 'Expected Return Date',
            RETURNED_AT: 'Returned At',
            RETURN_STATE: 'Return State',
            RETURN_STATE_DESC: 'Return State Description',
            REMARKS: 'Remarks',
            REMARKS_PH: 'Remarks before closing the loan.',
            NO_DESC: 'No description provided.',
          },
        },
      },
      BOOK_OVERVIEW: {
        ANCIENT_EPIC: 'Ancient Epic',
        CHILDREN_GAMES: 'Children Games',
        DRAMATIC: 'Dramatic',
        DRAMATIC_THRILLER: 'Dramatic - Thriller',
        EPIC: 'Epic',
        ESSAY: 'Essay',
        FABLE: 'Fable',
        FABLES_COLLECTION: 'Fables - Collection',
        MULTIPLICATIONS: 'Multiplications',
        NARRATIVE: 'Narrative',
        NOVEL: 'Novel',
        NOVEL_CHILDREN: 'Novel - Children',
        NOVEL_FICTION: 'Novel - Fiction',
        NOVEL_NARRATIVE: 'Novel - Narrative',
        NOVEL_NON_FICTION: 'Novel - Non-Fiction',
        NOVEL_PHILOSOPHICAL: 'Novel - Philosophical',
        NOVEL_ROMANTIC: 'Novel - Romantic',
        NOVEL_THRILLER: 'Novel - Thriller',
        SHORT_STORIES: 'Short Stories',
        SUSPENSE: 'Suspense',
        TALE: 'Tale',
        TALES_COLLECTION: 'Tales - Collection',
        TRAGEDY: 'Tragedy',
      },
      ITEM_OVERVIEW: {
        COMMUNICATION: 'Communication',
        EDUCATIONAL: 'Educational',
        ENGLISH: 'English',
        GAMES: 'Games',
        GEOGRAPHY: 'Geography',
        MATHEMATICS: 'Mathematics',
        MUSIC: 'Music',
        ROBOTICS: 'Robotics',
        SOCIO_EDUCATIONAL_ACTIVITIES: 'Socio Educational Activities',
        STIMULATION: 'Stimulation',
      },
      CLASS_OVERVIEW:{
        ALL: 'All lessons',
        ADD: 'Add New Class',
      },
      STATE: {
        BAD: 'Bad',
        REGULAR: 'Regular',
        GOOD: 'Good',
      },
    },

    // REGISTRATIONS OVERVIEW & DETAILS
    REGISTRATIONS: {
      STUDENT: 'Student',
      VOLUNTEER: 'Volunteer',
      OVERVIEW: {
        TITLE: 'Registrations of volunteers and students',
        FILTER: 'Filter...',
        FILTER_INFO:
          'Try searching and filtering on first name, last name, email, start date, end date or role.',
        FIRST_NAME: 'First name',
        LAST_NAME: 'Last name',
        EMAIL: 'Email',
        START_DATE: 'Start date',
        END_DATE: 'End date',
        ROLE: 'Role',
        CONFIRMED: 'Confirmed',
        DETAILS: 'Details',
      },
      DETAILS: {
        STANDARD_TITLE: 'Registration',
        TITLE: 'Registration of {{name}}',
        DELETE: 'Remove from list',
        FILE_NAMES: {
          INTERNATIONAL_PASSPORT: 'International passport',
          GOOD_CONDUCT_CERTIFICATE: 'Certificate of good conduct',
          DIPLOMA: 'Certificate of education',
          PASSPORT_PHOTO: 'Passport photo',
        },
      },
      TOASTS: {
        SUCCESS: 'Success',
        ERROR: 'Error',
        CONFIRM_SUCCESS: 'Registration has been successfully confirmed.',
        DISCONFIRM_SUCCESS: 'Registration has been successfully disconfirmed.',
        CONFIRM_ERROR:
          'Something went wrong while confirming the registration. Please try again later.',
        DISCONFIRM_ERROR:
          'Something went wrong while disconfirming the registration. Please try again later.',
        DELETE_SUCCESS: 'Registration has been successfully removed from list.',
        DELETE_ERROR:
          'Something went wrong while removing the registration. Please try again later.',
        DOWNLOAD_ERROR:
          'Something went wrong while downloading the file. Please try again later.',
      },
    },

    ORGANIZATION: {
      ROLES: {
        OVERVIEW: {
          TITLE: 'Change and Assign Roles',
          PLEASE_WAIT: 'Please wait...',
          FILTER: 'Filter...',
          FILTER_SUB:
            'Try searching and filtering on First name, Last name, Email or Role.',
          FIRST_NAME: 'First name',
          LAST_NAME: 'Last name',
        },
      },
    },
  },
}
