import React, { useState, FormEvent } from 'react';
import './Contact.css';
import { imageLinks } from '../../assets/imageLinks';

interface ContactProps {
  language: 'en' | 'es';
}

interface ContentType {
  contactTitle: string;
  contactSubtitle: string;
  contactDescription: string;
  adventureTitle: string;
  adventureDescription: string;
  contactFormTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendButton: string;
}

interface FormData {
  success: boolean;
  message: string;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const content: Record<'en' | 'es', ContentType> = {
    en: {
      contactTitle: 'Keep in touch!',
      contactSubtitle: 'Send me a message',
      contactDescription: 'Or contact me in these places! 😎',
      adventureTitle: 'In mood for adventure? 🧐',
      adventureDescription: 'Try to find me in here!',
      contactFormTitle: 'Contact form:',
      nameLabel: "What's your name?:",
      namePlaceholder: 'John Doe',
      phoneLabel: 'Phone number',
      emailPlaceholder: 'hello@mail.com',
      messageLabel: 'Send me something nice!',
      messagePlaceholder: 'Your incredible message here!',
      sendButton: 'Send!',
    },
    es: {
      contactTitle: '¡Mantente en contacto!',
      contactSubtitle: 'Envíame un mensaje',
      contactDescription: '¡O contáctame en estos lugares! 😎',
      adventureTitle: '¿List@ para la aventura? 🧐',
      adventureDescription: '¡Intenta encontrarme aquí!',
      contactFormTitle: 'Formulario de contacto:',
      nameLabel: '¿Cuál es tu nombre?:',
      namePlaceholder: 'Juan Pérez',
      phoneLabel: 'Número de teléfono',
      emailPlaceholder: 'hola@correo.com',
      messageLabel: '¡Envíame algo agradable!',
      messagePlaceholder: '¡Tu increíble mensaje aquí!',
      sendButton: '¡Enviar!',
    },
  };

  const [result, setResult] = useState<string>('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setResult('Sending...');
    const formData = new FormData(event.currentTarget);

    formData.append('access_key', '153e59a3-6cfb-4990-80bd-77e232103f20');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data: FormData = await response.json();

    if (data.success) {
      setResult('Successfully delivered!');
      event.currentTarget.reset();
    } else {
      console.log('Error', data);
      setResult(data.message);
    }
  };

  return (
    <div className="container contact" id="contact">
      <div className="form-text">
        <div className="contact-title">
          <h2>{content[language].contactTitle}</h2>
          <h1>{content[language].contactSubtitle}</h1>
          <p>{content[language].contactDescription}</p>
        </div>
        <div className="contact-container">
          <a href="mailto:sergiomcurbelo5@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={imageLinks.mail_icon} alt="EMail" />
          </a>
          <a href="tel:+59897266076" target="_blank" rel="noopener noreferrer">
            <img src={imageLinks.whatsapp_icon} alt="Whatsapp" />
          </a>
          <a href="https://linkedin.com/in/smcurbelo/" target="_blank" rel="noopener noreferrer">
            <img src={imageLinks.linkedin_icon} alt="LinkedIn" />
          </a>
          <a href="https://github.com/na7hk3r/" target="_blank" rel="noopener noreferrer">
            <img src={imageLinks.github_icon} alt="Github" />
          </a>
        </div>
        <div className="map-container">
          <h2>{content[language].adventureTitle}</h2>
          <p>{content[language].adventureDescription}</p>
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26233.240921267778!2d-56.236921022960885!3d-34.726484287387656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a1cd4c5158acf3%3A0xe0a43fef314c51a4!2s15900%20Las%20Piedras%2C%20Departamento%20de%20Canelones!5e0!3m2!1ses-419!2suy!4v1713811307929!5m2!1ses-419!2suy"
            width={400}
            height={300}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </div>
      </div>
      <div className="contact-col">
        <h1>{content[language].contactFormTitle}</h1>
        <form onSubmit={onSubmit}>
          <label>{content[language].nameLabel}</label>
          <input
            type="text"
            name="name"
            placeholder={content[language].namePlaceholder}
            required
          />
          <label>{content[language].phoneLabel}</label>
          <input
            type="tel"
            name="phone"
            placeholder="+598 1234 5678"
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="mail"
            placeholder={content[language].emailPlaceholder}
            required
          />
          <label>{content[language].messageLabel}</label>
          <textarea
            name="message"
            rows={10}
            placeholder={content[language].messagePlaceholder}
            required
          ></textarea>
          <button type="submit" className="btn">
            {content[language].sendButton} <img src={imageLinks.arrow} alt="Send button" />
          </button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  );
};

export default Contact;
