// Spain
export const locale = {
  lang: "es",
  data: {
    // TRANSLATOR
    TRANSLATOR: {
      SELECT: "Elige tu idioma",
    },

    // ERRORS
    ERRORS: {
      TRY_AGAIN: "Algo salió mal. Por favor, inténtelo de nuevo más tarde.",
    },

    // BUTTONS
    BUTTONS: {
      SAVE: "Guardar",
      SAVE_CHANGES: "Guardar cambios",
      SUBMIT: "Enviar",
      CANCEL: "Cancelar",
    },

    // MENU
    MENU: {
      NEW: "nuevo",
      ACTIONS: "Comportamiento",
      CREATE_POST: "Crear nueva publicación",
      PAGES: "Pages",
      FEATURES: "Caracteristicas",
      APPS: "Aplicaciones",
      DASHBOARD: "Tablero",
      MANAGEMENT: {
        TITLE: "Gestión de usuarios",
        REGISTRATION: "Formulario de inscripción",
      },
    },

    // AUTH PAGES
    AUTH: {
      GENERAL: {
        NEW: "Nuevo aquí?",
        TITLE: "Bienvenido a Añañau",
        OR: "O",
        SUBMIT_BUTTON: "Enviar",
        CANCEL_BUTTON: "Cancelar",
        NO_ACCOUNT: "No tienes una cuenta?",
        SIGNUP_BUTTON: "Regístrate",
        FORGOT_BUTTON: "Se te olvidó tu contraseña",
        BACK_BUTTON: "Espalda",
        PRIVACY: "Intimidad",
        LEGAL: "Legal",
        CONTACT: "Contacto",
      },
      LOGIN: {
        TITLE: "Crear una cuenta",
        BUTTON: "Registrarse",
      },
      FORGOT: {
        TITLE: "Contraseña olvidada?",
        DESC: "Ingrese su correo electrónico para restablecer su contraseña",
        SUCCESS: "Your account has been successfully reset.",
      },
      REGISTER: {
        TITLE: "Sign Up",
        DESC: "Enter your details to create your account",
        SUCCESS: "Your account has been successfuly registered.",
      },
      INPUT: {
        EMAIL: "Email",
        FIRSTNAME: "Fullname",
        PASSWORD: "Password",
        CONFIRM_PASSWORD: "Confirm Password",
        USERNAME: "Usuario",
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
      },
    },

    // REGISTRATION FORM
    REGISTRATION: {
      GENERAL: {
        STUDENT: "estudiante",
        VOLUNTEER: "voluntario",
        PERSONAL: "Personal",
        ORGANIZATIONAL: "Organizativo",
        SCANS: "Escaneos",
        QUESTIONS: "Preguntas",
        ERRORS: {
          REQUIRED: "Este campo es obligatorio.",
          EMAIL: "Este campo espera una dirección de correo electrónico.",
          CHARACTERS: "Este campo espera al menos {{value}} caracteres.",
          INCORRECT: "Este campo no está completado correctamente.",
        },
      },
      PERSONAL: {
        TITLE: "Informacion personal",
        GENERAL: {
          TITLE: "General",
          FIRST_NAME: "Primer nombre",
          MIDDLE_NAME: "Segundo nombre",
          LAST_NAME: "Apellido",
          EMAIL: "Correo electrónico",
          SCHOOL_EMAIL: "Correo electrónico de la escuela",
          PHONE: "Número de teléfono",
          BIRTH_DATE: "Fecha de cumpleaños",
          BIRTHPLACE: "Lugar de nacimiento",
          NATIONALITY: "Nacionalidad",
          PASSPORT: "Número de pasaporte",
        },
        ADDRESS: {
          TITLE: "Dirección",
          STREET: "Calle",
          NUMBER: "Número de casa",
          MAILBOX: "Buzón",
          POSTAL_CODE: "Código postal",
          TOWNSHIP: "Municipio",
          COUNTRY: "País",
        },
        CONTACT_PERSON: {
          TITLE: "Persona de contacto",
          INFO:
            "Su persona de contacto es la persona con la que deberíamos poder comunicarnos en caso de una emergencia.",
          FIRST_NAME: "Primer nombre",
          MIDDLE_NAME: "Segundo nombre",
          LAST_NAME: "Apellido",
          RELATION: "Relación",
          EMAIL: "Correo electrónico",
          PHONE: "Número de teléfono",
        },
        MEDICAL: {
          TITLE: "Datos médicos",
          ALLERGIES: "Alergias",
          CONDITIONS: "Condiciones médicas",
        },
      },
      ORGANIZATIONAL: {
        TITLE: "Información organizacional",
        DATES: {
          TITLE: "Fechas",
          START_VOLUNTEER: "Fecha de inicio propuesta para voluntariado",
          END_VOLUNTEER: "Fecha final propuesta para voluntariado",
          START_STUDENT: "Fecha de inicio propuesta para pasantía",
          END_STUDENT: "Fecha final propuesta para pasantía",
          LEAVE_START: "Fecha de inicio propuesta para período de licencia",
          LEAVE_END: "Fecha final propuesta para período de licencia",
          LEAVE_INFO:
            "Tiene la opción de programar un período de licencia durante su pasantía. Esto se determina en consulta con su escuela y la organización. Se recomienda y se solicita encarecidamente planificar este período de licencia al final de la pasantía. Si elige no programar un período de licencia, deje este campo vacío.",
        },
        SPANISH: {
          TITLE: "Español",
          LEVEL: "Describe tu nivel de español",
          WEEKS: "Número de semanas para lecciones de español",
          WEEKS_INFO:
            "Si aún no hablas un nivel básico de español, es obligatorio tomar un mínimo de 4 semanas de lecciones de español. Si ya tienes una base, las lecciones son sin compromiso, pero siempre recomendadas para mejorar tu nivel.",
        },
        INFO: {
          TITLE: "Info",
          OCCUPATION_VOLUNTEER: "Describe tu profesión",
          OCCUPATION_STUDENT: "Describe tu campo de estudio",
          DEGREE: "Describe tu título actual",
          INTERNSHIP_CONTEXT: {
            TITLE: "Contexto de la pasantía",
            PROJECT: "Proyecto de prácticas",
            THESIS: "Tesis (de licenciatura)",
            OTHER: "Otro",
          },
          TASKS: "¿En qué tareas te gustaría trabajar?",
          TASKS_INFO_VOLUNTEER:
            "Describe las tareas en las que te gustaría trabajar dentro de la organización.",
          TASKS_INFO_STUDENT:
            "Describa las tareas que su escuela espera que realice y/o díganos usted mismo en qué tareas le gustaría trabajar dentro de la organización.",
          EXPECTATIONS: "¿Cuales son tus expectativas?",
          EXPECTATIONS_INFO_VOLUNTEER:
            "Describe tus expectativas sobre tu posible trabajo de voluntariado en Añañau.",
          EXPECTATIONS_INFO_STUDENT:
            "Describe tus expectativas de tu posible pasantía en Añañau.",
          PROPOSALS: "¿Tiene alguna propuesta?",
          PROPOSALS_INFO:
            "Si tiene alguna propuesta relacionada con su trabajo dentro de la organización, proporcione aquí.",
        },
      },
      SCANS: {
        TITLE: "Escaneos & foto de pasaporte",
        DROP_SELECT:
          "Suelta tu(s) archivo(s) aquí o haz clic para seleccionar tu(s) archivo(s).",
        PASSPORT: "Escaneo de pasaporte internacional",
        GOOD_CONDUCT: "Escaneo de certificado de buena conducta tipo II",
        GOOD_CONDUCT_INFO:
          "Puede solicitarlo en su ciudad o servicio municipal.",
        DIPLOMA: "Escaneo de diploma o certificado educativo",
        PHOTO: "Foto del pasaporte",
      },
      QUESTIONS: {
        TITLE: "Preguntas",
        EXTRA: {
          TITLE: "Algunas preguntas adicionales de nosotros",
          EXPERIENCE: "¿Tienes alguna experiencia con el voluntariado?",
          EXPERIENCE_INFO:
            "En caso de que ya tenga algún tipo de experiencia con el voluntariado, descríbalo aquí.",
          WHY_ANANAU_VOLUNTEER:
            "¿Por qué elegiste Añañau para postularte como voluntario?",
          WHY_ANANAU_STUDENT:
            "¿Por qué elegiste Añañau para postularte a tus prácticas?",
          FIRST_HEARD: {
            TITLE: "¿Dónde escuchaste por primera vez de Añañau?",
            WEBSITE: "Sitio web",
            FACEBOOK: "Facebook",
            INSTAGRAM: "Instagram",
            OTHER_PERSON: "Otro persona",
            NEWSLETTER: "Boletin informativo",
            SCHOOL: "A través de la escuela",
            OTHER: "Otro",
          },
        },
        CONTACT: {
          TITLE: "¿Tienes alguna pregunta para nosotros?",
          INFO:
            "Una vez que haya enviado su registro, intentaremos comunicarnos con usted lo antes posible. Por lo general, incluso configuraremos una videollamada para discutir algunas cosas y responder las preguntas de los demás. Aún así, si ya tiene preguntas sobre el proceso de registro o la pasantía en general, siempre puede contactarnos por correo electrónico o WhatsApp.",
        },
      },
      TERMS: {
        TITLE: "Términos del acuerdo",
        PART_1:
          "Como parte del programa de voluntariado online / prácticas / voluntariado presencial en ONG Añañau, tendrás tareas en las que tendrás acceso a información sensible y privada, por ello la asociación se ve obligada a salvaguardar sus intereses y así tú queda estrictamente prohibido el uso de cualquier tipo de información (intelectual, oral, visual, escrita, científica, tecnológica y otros), obtenida en la asociación, que pertenece a Añañau; de igual forma, se prohíbe transmitir cualquier tipo de información que fue mencionada anteriormente en este párrafo a terceros o instituciones de cualquier tipo, directa o indirectamente.",
        PART_2:
          "A través de esta carta, no podrá realizar ningún tipo de comentario, escrito o mediante publicación verbal, a terceros o entidades de ningún tipo, ni de forma virtual (ej. a través de redes sociales como Facebook, Instagram, WhatsApp, Twitter , etc.) que puedan dañar la imagen y reputación de Añañau.",
        PART_3:
          "En el caso de incumplimiento de todo lo anterior, usted estará sujeto a responsabilidad civil y penal, por los posibles daños ocasionados a la asociación, de acuerdo con la ley peruana. Este acuerdo de confidencialidad se mantendrá indefinidamente, ahora y en el futuro, hasta que la asociación lo considere terminado, o por disolución del mismo.",
        AGREE: "Estoy de acuerdo con los términos mencionados anteriormente.",
      },
    },
  },
};
