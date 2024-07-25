import React from 'react';
import './CourseCard.css';

import utu_logo from '../../assets/utu-logo.png';
import ctd_logo from '../../assets/ctd-logo.png';
import jap_logo from '../../assets/jap-logo.png';
import one_logo from '../../assets/one-logo.png';
import voxy_logo from '../../assets/voxy-logo.png';
import fcc_logo from '../../assets/fcc-logo.png';
import ibm_logo from '../../assets/ibm-logo.png';

const CourseCard = ({ language }) => {
  const content = {
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
  };

  return (
    <>
      <div className="courses-title">
        <h2>{content[language].coursesTitle}</h2>
        <h1>{content[language].coursesSubtitle}</h1>
      </div>
      <section className="courses-container">
        <div className="course-card">
          <div className="course-img">
            <img src={utu_logo} alt="UTU" />
          </div>
          <div className="course-description">
            <h2>{content[language].utuTitle}</h2>
            <span>UTU, Uruguay. 2023 - {content[language].date}</span>
            <p>{content[language].utuDescription}</p>
          </div>
        </div>
        <div className="course-card">
          <div className="course-img">
            <img src={ctd_logo} alt="Certified Tech Developer" />
          </div>
          <div className="course-description">
            <h2>Certified Tech Developer</h2>
            <span>
              DigitalHouse, Argentina. 2023 - {content[language].date}
            </span>
            <p>{content[language].ctdDescription}</p>
          </div>
        </div>
        <div className="course-card">
          <div className="course-img">
            <img src={jap_logo} alt="Jovenes A Programar" />
          </div>
          <div className="course-description">
            <h2>Fullstack Web Development</h2>
            <span>Jóvenes a Programar, Uruguay. 2022 - 2023</span>
            <p>{content[language].japDescription}</p>
          </div>
        </div>
        <div className="course-card">
          <div className="course-img">
            <img src={one_logo} alt="Oracle ONE" />
          </div>
          <div className="course-description">
            <h2>{content[language].oneTitle}</h2>
            <span>Oracle Next Education | Alura, LATAM. 2022 - 2023</span>
            <p>{content[language].oneDescription}</p>
          </div>
        </div>
        <div className="course-card">
          <div className="course-img">
            <img src={voxy_logo} alt="Voxy" />
          </div>
          <div className="course-description">
            <h2>{content[language].voxyTitle}</h2>
            <span>VOXY. 2022 - 2023</span>
            <p>{content[language].voxyDescription}</p>
          </div>
        </div>
        <div className="course-card">
          <div className="course-img">
            <img src={fcc_logo} alt="Free Code Camp" />
          </div>
          <div className="course-description">
            <h2>{content[language].fccTitle}</h2>
            <span>FreeCodeCamp. 2022 - 2023</span>
            <p>{content[language].fccDescription}</p>
          </div>
        </div>
        <div className="course-card">
          <div className="course-img">
            <img src={ibm_logo} alt="IBM Skills Network" />
          </div>
          <div className="course-description">
            <h2>{content[language].ibmTitle}</h2>
            <span>IBM Skills Network. 2023</span>
            <p>{content[language].ibmDescription}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseCard;
