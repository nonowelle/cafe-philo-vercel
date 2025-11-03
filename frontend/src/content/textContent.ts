export const textContent = {
  en: {
    sections: [
      {
        sectionId: "1",
        title: "what?",
        subtitle: "philosophy but the fun one",
        description: "caféphilo is a meeting space to converse, reflect and share, where philosophy connects with culture and everyday life.\n\n",
        descriptionDeux: "the concept is inspired by French café philo, created in the 90s, which turned cafés into scenarios of open and accessible debate.\n\nWe bring this tradition to Madrid, in collaboration with the <a href=\"https://www.laacademiaarteyciencia.com/\">academy of art and science</a>.\n"
      },
      {
        sectionId: "2",
        title: "how?",
        subtitle: "",
        description: "during 90 minutes, a philosopher-mediator takes you through the meanders of thought, based on a film, literature, or any existential or philosophical current topic.",
        descriptionDeux: ""
      },
      {
        sectionId: "3",
        title: "i'm in",
        subtitle: "",
        description: "",
        descriptionDeux: "",
        hasForm: true
      }
      
    ],
    navigation: {
      what: "what?",
      how: "how?",
      imIn: "i'm in",
      contact: "contact"
    },
   
    contact: {
      sectionId:"4"
    },
    form : {
      
        name : 'name',
        lastName: 'last name',
        email: "email",
        info: 'i want info',
        estar: 'i want to participate',
        algo : 'tell us something',
        errors: {
          firstName: ['please enter a valid first name', 'first name is required'],
          lastName: ['please enter a valid last name', 'last name is required'],
          email: ['please enter a valid email', 'email is required'],
          razon: 'please select a reason',
          text: 'HTML or script content is not allowed',
          form: 'something went wrong. please try again.',
          success: 'thank you! we will get back to you quickly. '
        }
    },
    attendees: {
      title: "attendees' list"
    }
  },
  es: {
    sections: [
      {
        sectionId: "1",
        title: "¿qué?",
        subtitle: "filosofía pero la divertida",
        description: "caféphilo es un espacio de encuentro para conversar, reflexionar y compartir, donde la filosofía se conecta con la cultura y la vida cotidiana.\n\n",
        descriptionDeux: "el concepto se inspira en los café philo franceses, creados en los años 90, que convirtieron a los cafés en escenarios de debate abierto y accesible.\n\nTraemos esa tradición a Madrid, en colaboración con la <a href=\"https://www.laacademiaarteyciencia.com/\">academia de arte y ciencia</a>.\n"
      },
      {
        sectionId: "2",
        title: "¿cómo?",
        subtitle: "",
        description: "durante 90 minutos, un filósofo-mediador os lleva consigo en los meandros del pensamiento, basándose en una obra de cine, de literatura, o en cualquier tema existencial o corriente filosófica.",
        descriptionDeux: ""
      },
      {
        sectionId: "3",
        title: "me apunto",
        subtitle:'',
        description: "",
        descriptionDeux: "",
        hasForm: true
      }
    ],
    navigation: {
      what: "¿qué?",
      how: "¿cómo?",
      imIn: "me apunto",
      contact: "contacto"
    },
   
    contact: {
      sectionId: "4",
    },
    form : {
      
      name : 'nombre',
      lastName: 'apellido',
      email: "email",
      info: 'quiero info',
      estar: 'quiero estar',
      algo : 'cuentanos algo',
      errors: {
        firstName: ['por favor, ingrese un nombre válido', 'el nombre es obligatorio'],
        lastName: ['por favor, ingrese un apellido válido', 'el apellido es obligatorio'],
        email: ['por favor, ingrese un correo electrónico válido', 'el correo electrónico es obligatorio'],
        razon: 'por favor, seleccione un motivo',
        text: 'no se permite contenido HTML o scripts',
        form: 'algo salió mal. por favor, inténtelo de nuevo.',
        success: '¡gracias! nos pondremos en contacto contigo rápidamente.'

      }
      
  },
  attendees: {
    title: "lista de participantes"
  }
  }
};

export default textContent;
