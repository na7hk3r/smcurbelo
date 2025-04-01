import React, { useState, useMemo } from 'react';
import './CourseCard.css';
import CertificateModal from '../CertificateModal/CertificateModal';
import { imageLinks } from '../../assets/imageLinks';

interface CourseCardProps {
  language: 'en' | 'es';
}

interface ContentType {
  coursesTitle: string;
  coursesSubtitle: string;
  date: string;
  utuTitle: string;
  utuDescription: string;
  ctdDescription: string;
  japTitle: string;
  japDescription: string;
  oneTitle: string;
  oneDescription: string;
  voxyTitle: string;
  voxyDescription: string;
  fccTitle: string;
  fccDescription: string;
  ibmTitle: string;
  ibmDescription: string;
}

interface CourseItemProps {
  img: string;
  alt: string;
  title: string;
  date: string;
  description: string;
  pdfUrl?: string;
  clickable: boolean;
}

const CourseCard: React.FC<CourseCardProps> = React.memo(({ language }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  const openModal = (url: string): void => {
    setPdfUrl(url);
    setModalIsOpen(true);
  };

  const content = useMemo<Record<'en' | 'es', ContentType>>(() => ({
    en: {
      coursesTitle: 'Where I learned?',
      coursesSubtitle: 'Courses & Certificates',
      date: 'Ongoing',
      utuTitle: 'Bachelor`s degree in IT',
      utuDescription:
        'Technical Degree in Computer Science from UTU, Uruguay, providing comprehensive knowledge in programming languages, algorithms, and system design, equipping with skills for software development and IT solutions.',
      ctdDescription:
        'Learning advanced concepts in web development including frameworks, databases, testing, best-practices and project management methodologies.',
      japTitle: 'Fullstack Web Development',
      japDescription:
        'Hands-on experience in front-end and back-end technologies to build dynamic web applications.',
      oneTitle: 'Backend Specialization',
      oneDescription:
        'Backend Specialization focusing on server-side programming with JAVA, database management, and API development for scalable and efficient backend systems with Springboot.',
      voxyTitle: 'English B2',
      voxyDescription:
        'Completed a Voxy Proficiency Assessment (VPA), significantly improving mycommunication skills for both professional and academic contexts. The coursework involved over 200 hours of speaking practice and other activities.',
      fccTitle: 'Javascript Certification',
      fccDescription:
        'This comprehensive program delved deep into fundamental concepts such as data structures, algorithms, object-oriented programming, and functional programming. Through hands-on projects and challenges, gained proficiency in solving complex problems, implementing algorithms efficiently, and manipulating data structures effectively.',
      ibmTitle: 'Fullstack Web Development',
      ibmDescription:
        'Enrolled in the Fullstack Web Development course through Coursera, focusing on mastering the latest tools and technologies for building robust and scalable web applications, with a comprehensive understanding of both front-end and back-end development as part of a license from Ceibal in &quot;VeranoJAP&quot;.',
    },
    es: {
      coursesTitle: '¿Dónde aprendí?',
      coursesSubtitle: 'Estudios y Certificaciones',
      date: 'Actualidad',
      utuTitle: 'Bachillerato (EMT) en IT',
      utuDescription:
        'Inscrito en Bachillerato TI de UTU, que proporciona conocimientos integrales en lenguajes de programación, algoritmos y diseño de sistemas, equipando con habilidades para el desarrollo de software y soluciones de TI.',
      ctdDescription:
        'Aprendizaje de conceptos avanzados en desarrollo web, incluyendo frameworks, bases de datos, pruebas, mejores prácticas y metodologías de gestión de proyectos.',
      japTitle: 'Desarrollo Web Fullstack',
      japDescription:
        'Fundamentos sólidos en el pensamiento computacional. Experiencia práctica en tecnologías front-end y back-end para construir aplicaciones web dinámicas.',
      oneTitle: 'Especialización en Backend',
      oneDescription:
        'Especialización en Backend centrada en la programación del lado del servidor con JAVA, gestión de bases de datos y desarrollo de API para sistemas backend escalables y eficientes con Springboot.',
      voxyTitle: 'Inglés B2',
      voxyDescription:
        'Completado una Evaluación de Competencia Voxy (VPA) y asistiendo a más de 100 horas de conversación grupal , mejorando significativamente mis habilidades de comunicación para contextos profesionales y académicos. El curso incluyó más de 200 horas de práctica de conversación y otras actividades.',
      fccTitle: 'Certificación en Javascript',
      fccDescription:
        'Este programa integral profundizó en conceptos fundamentales como estructuras de datos, algoritmos, programación orientada a objetos y programación funcional. A través de proyectos prácticos y desafíos, adquirí competencia en la resolución de problemas complejos, implementación eficiente de algoritmos y manipulación efectiva de estructuras de datos.',
      ibmTitle: 'Desarrollo Web Fullstack',
      ibmDescription:
        'Inscrito en el curso de Desarrollo Web Fullstack a través de Coursera, enfocado en dominar las últimas herramientas y tecnologías para construir aplicaciones web robustas y escalables, con una comprensión integral tanto del desarrollo front-end como back-end como parte de una licencia de Ceibal en VeranoJAP.',
    },
  }), []);

  const CourseItem: React.FC<CourseItemProps> = ({ img, alt, title, date, description, pdfUrl, clickable }) => (
    <div 
      className={`course-card ${clickable ? 'clickable' : ''}`}
      onClick={clickable && pdfUrl ? () => openModal(pdfUrl) : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? `Ver certificado de ${title}` : undefined}
    >
      <div className="course-img">
        <img src={img} alt={alt} loading="lazy" />
      </div>
      <div className="course-description">
        <h2>{title}</h2>
        <span>{date}</span>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="courses-title">
        <h2>{content[language].coursesTitle}</h2>
        <h1>{content[language].coursesSubtitle}</h1>
      </div>
      <section className="courses-container">
        <CourseItem 
          img={imageLinks.utu_logo}
          alt="UTU"
          title={content[language].utuTitle}
          date={`UTU, Uruguay. 2023 - ${content[language].date}`}
          description={content[language].utuDescription}
          clickable={false}
        />
        
        <CourseItem 
          img={imageLinks.ctd_logo}
          alt="Certified Tech Developer"
          title="Certified Tech Developer"
          date="DigitalHouse, Argentina. 2023 - 2025"
          description={content[language].ctdDescription}
          pdfUrl="/certificates/ctd.pdf"
          clickable={true}
        />
        
        <CourseItem 
          img={imageLinks.jap_logo}
          alt="Jovenes A Programar"
          title="Fullstack Web Development"
          date="Jóvenes a Programar, Uruguay. 2022 - 2023"
          description={content[language].japDescription}
          pdfUrl="/certificates/jap.pdf"
          clickable={true}
        />
        
        <CourseItem 
          img={imageLinks.one_logo}
          alt="Oracle ONE"
          title={content[language].oneTitle}
          date="Oracle Next Education | Alura, LATAM. 2022 - 2023"
          description={content[language].oneDescription}
          pdfUrl="/certificates/one.pdf"
          clickable={true}
        />
        
        <CourseItem 
          img={imageLinks.voxy_logo}
          alt="Voxy"
          title={content[language].voxyTitle}
          date="VOXY. 2022 - 2023"
          description={content[language].voxyDescription}
          clickable={false}
        />
        
        <CourseItem 
          img={imageLinks.fcc_logo}
          alt="Free Code Camp"
          title={content[language].fccTitle}
          date="FreeCodeCamp. 2022 - 2023"
          description={content[language].fccDescription}
          pdfUrl="/certificates/fcc.pdf"
          clickable={true}
        />
        
        <CourseItem 
          img={imageLinks.ibm_logo}
          alt="IBM Skills Network"
          title={content[language].ibmTitle}
          date="IBM Skills Network. 2023"
          description={content[language].ibmDescription}
          pdfUrl="/certificates/ibm.pdf"
          clickable={true}
        />
      </section>
      
      <CertificateModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        pdfUrl={pdfUrl}
      />
    </>
  );
});

export default CourseCard;