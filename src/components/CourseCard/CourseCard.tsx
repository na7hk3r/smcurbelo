import React, { useMemo } from 'react';
import './CourseCard.css';
import { imageLinks } from '../../assets/imageLinks';

interface CourseCardProps {
  language: 'en' | 'es';
}

interface CourseItemData {
  img: string;
  alt: string;
  title: string;
  date: string;
  description: string;
  pdfUrl?: string;
}

const CourseCard: React.FC<CourseCardProps> = React.memo(({ language }) => {
  const content = useMemo(() => ({
    en: {
      label: 'Education',
      title: 'Courses & Certificates',
      viewCert: 'View certificate',
    },
    es: {
      label: 'Educación',
      title: 'Estudios y Certificaciones',
      viewCert: 'Ver certificado',
    },
  }), []);

  const courses: CourseItemData[] = useMemo(() => [
    {
      img: imageLinks.utu_logo,
      alt: 'UTU',
      title: language === 'en' ? "Bachelor's in IT" : 'Bachillerato (EMT) en IT',
      date: 'UTU, Uruguay · 2023 –',
      description: language === 'en'
        ? 'Technical Degree in Computer Science from UTU, Uruguay, providing comprehensive knowledge in programming languages, algorithms, and system design.'
        : 'Inscrito en Bachillerato TI de UTU, que proporciona conocimientos integrales en lenguajes de programación, algoritmos y diseño de sistemas.',
    },
    {
      img: imageLinks.ctd_logo,
      alt: 'Certified Tech Developer',
      title: 'Certified Tech Developer',
      date: 'DigitalHouse, Argentina · 2023 – 2025',
      description: language === 'en'
        ? 'Advanced web development including frameworks, databases, testing, best-practices and project management methodologies.'
        : 'Conceptos avanzados en desarrollo web, incluyendo frameworks, bases de datos, pruebas, mejores prácticas y metodologías de gestión de proyectos.',
      pdfUrl: '/certificates/ctd.pdf',
    },
    {
      img: imageLinks.jap_logo,
      alt: 'Jóvenes a Programar',
      title: language === 'en' ? 'Fullstack Web Development' : 'Desarrollo Web Fullstack',
      date: 'Jóvenes a Programar, Uruguay · 2022 – 2023',
      description: language === 'en'
        ? 'Hands-on experience in front-end and back-end technologies to build dynamic web applications.'
        : 'Experiencia práctica en tecnologías front-end y back-end para construir aplicaciones web dinámicas.',
      pdfUrl: '/certificates/jap.pdf',
    },
    {
      img: imageLinks.one_logo,
      alt: 'Oracle ONE',
      title: language === 'en' ? 'Backend Specialization' : 'Especialización en Backend',
      date: 'Oracle Next Education | Alura · 2022 – 2023',
      description: language === 'en'
        ? 'Server-side programming with Java, database management, and API development with Springboot.'
        : 'Programación del lado del servidor con Java, gestión de bases de datos y desarrollo de API con Springboot.',
      pdfUrl: '/certificates/one.pdf',
    },
    {
      img: imageLinks.voxy_logo,
      alt: 'Voxy',
      title: language === 'en' ? 'English B2' : 'Inglés B2',
      date: 'VOXY · 2022 – 2023',
      description: language === 'en'
        ? 'Completed a Voxy Proficiency Assessment (VPA) with 200+ hours of speaking practice.'
        : 'Completado una Evaluación de Competencia Voxy (VPA) con más de 200 horas de práctica.',
    },
    {
      img: imageLinks.fcc_logo,
      alt: 'FreeCodeCamp',
      title: language === 'en' ? 'Javascript Certification' : 'Certificación en Javascript',
      date: 'FreeCodeCamp · 2022 – 2023',
      description: language === 'en'
        ? 'Data structures, algorithms, object-oriented and functional programming through hands-on projects.'
        : 'Estructuras de datos, algoritmos, programación orientada a objetos y funcional a través de proyectos prácticos.',
      pdfUrl: '/certificates/fcc.pdf',
    },
    {
      img: imageLinks.ibm_logo,
      alt: 'IBM Skills Network',
      title: language === 'en' ? 'Fullstack Web Development' : 'Desarrollo Web Fullstack',
      date: 'IBM Skills Network · 2023',
      description: language === 'en'
        ? 'Latest tools and technologies for building robust and scalable web applications via Coursera.'
        : 'Últimas herramientas y tecnologías para construir aplicaciones web robustas y escalables vía Coursera.',
      pdfUrl: '/certificates/ibm.pdf',
    },
  ], [language]);

  return (
    <div className="courses">
      <span className="section-label">{content[language].label}</span>
      <h2 className="courses__title">{content[language].title}</h2>

      <div className="courses__list">
        {courses.map((course) => (
          <details key={course.alt} className="course">
            <summary className="course__header">
              <img
                src={course.img}
                alt={course.alt}
                className="course__logo"
                loading="lazy"
              />
              <div className="course__meta">
                <strong className="course__name">{course.title}</strong>
                <span className="course__date">{course.date}</span>
              </div>
            </summary>
            <div className="course__body">
              <p>{course.description}</p>
              {course.pdfUrl && (
                <a
                  href={course.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="course__cert-link"
                >
                  {content[language].viewCert} &rarr;
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
});

export default CourseCard;