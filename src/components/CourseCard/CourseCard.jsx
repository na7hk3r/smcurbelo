import React from 'react'
import './CourseCard.css';
import utu_logo from "../../assets/utu-logo.png";
import ctd_logo from "../../assets/ctd-logo.png";
import jap_logo from "../../assets/jap-logo.png";
import one_logo from "../../assets/one-logo.png";
import voxy_logo from "../../assets/voxy-logo.png";
import fcc_logo from "../../assets/fcc-logo.png";
import ibm_logo from "../../assets/ibm-logo.png";

const CourseCard = () => {
  return (
    <>
      <div className="courses-title">
        <h2>Where I learned?</h2>
        <h1>Courses & Certificates</h1>
      </div>
      <section className="courses-container">
        <div className="course-card">
    <div className="course-img">
      <img src={utu_logo} alt="UTU" />
    </div>
    <div className="course-description">
      <h2>Bachelor&lsquo;s degree in IT</h2>
      <span>UTU, Uruguay. 2023 - Ongoing</span>
      <p>
        Technical Degree in Computer Science from UTU, Uruguay, providing
        comprehensive knowledge in programming languages, algorithms, and
        system design, equipping with skills for software development and
        IT solutions.
      </p>
    </div>
        </div>
        <div className="course-card">
    <div className="course-img">
      <img src={ctd_logo} alt="Certified Tech Developer" />
    </div>
    <div className="course-description">
      <h2>Certified Tech Developer</h2>
      <span>DigitalHouse, Argentina. 2023 - Ongoing</span>
      <p>
        Learning advanced concepts in web development including
        frameworks, databases, testing, best-practices and project
        management methodologies.
      </p>
    </div>
        </div>
        <div className="course-card">
    <div className="course-img">
      <img src={jap_logo} alt="Jovenes A Programar" />
    </div>
    <div className="course-description">
      <h2>Fullstack Web Development</h2>
      <span>Jóvenes a Programar, Uruguay. 2022 - 2023</span>
      <p>
        Hands-on experience in front-end and back-end technologies to
        build dynamic web applications.
      </p>
    </div>
        </div>
        <div className="course-card">
    <div className="course-img">
      <img src={one_logo} alt="Jovenes A Programar" />
    </div>
    <div className="course-description">
      <h2>Backend Specialization</h2>
      <span>Oracle Next Education | Alura, LATAM. 2022 - 2023</span>
      <p>
        Backend Specialization focusing on server-side programming with
        JAVA, database management, and API development for scalable and
        efficient backend systems with Springboot.
      </p>
    </div>
        </div>
        <div className="course-card">
    <div className="course-img">
      <img src={voxy_logo} alt="Jovenes A Programar" />
    </div>
    <div className="course-description">
      <h2>English B2</h2>
      <span>VOXY. 2022 - 2023</span>
      <p>
        Completed a Voxy Proficiency Assessment (VPA), significantly
        improving mycommunication skills for both professional and
        academic contexts. The coursework involved over 200 hours of
        speaking practice and other activities.
      </p>
    </div>
        </div>
        <div className="course-card">
    <div className="course-img">
      <img src={fcc_logo} alt="Jovenes A Programar" />
    </div>
    <div className="course-description">
      <h2>Javascript Certification</h2>
      <span>FreeCodeCamp. 2022 - 2023</span>
      <p>
        This comprehensive program delved deep into fundamental concepts
        such as data structures, algorithms, object-oriented programming,
        and functional programming. Through hands-on projects and
        challenges, gained proficiency in solving complex problems,
        implementing algorithms efficiently, and manipulating data
        structures effectively.
      </p>
    </div>
        </div>
        <div className="course-card">
    <div className="course-img">
      <img src={ibm_logo} alt="Jovenes A Programar" />
    </div>
    <div className="course-description">
      <h2>Fullstack Web Development</h2>
      <span>IBM Skills Network. 2023</span>
      <p>
        Enrolled in the Fullstack Web Development course through Coursera, 
        focusing on mastering the latest tools and
        technologies for building robust and scalable web applications,
        with a comprehensive understanding of both front-end and back-end
        development as part of a license from Ceibal in &quot;VeranoJAP&quot;.
      </p>
    </div>
        </div>
      </section>
  </>
  )
}

export default CourseCard