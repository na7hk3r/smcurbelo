import React from 'react'
import './Projects.css'
import ProjectCard from '../ProjectCard/ProjectCard'


const Projects = () => {
  return (
    <div className='container projects-container'>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
    </div>
  )
}

export default Projects