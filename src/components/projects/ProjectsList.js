import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import APIManager from '../../modules/APIManager';

const ProjectsList = (props) => {
    const [projects, setProjects] = useState([]);

    const getProjects = () => {
        APIManager.getAllWithExpand("projects", "status").then(projectsFromAPI => {
            setProjects(projectsFromAPI);
        });
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div>
            <section className="project-section-content">
                <div className="project-icon-header">
                    <div className="project-header">
                        <h1 className="projects">PROJECTS</h1>
                    </div>
                    <div className="project-icon-container">
                        <span data-tooltip="TO DASHBOARD" data-placement="bottom"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/')}></i></span>
                        <span data-tooltip="ADD" data-placement="top"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/projects/new')}></i></span>
                    </div>
                </div>
                <div className="project-container-cards">
                    {projects.map(projectItem =>
                        <ProjectCard
                            key={projectItem.id}
                            project={projectItem}
                            getProjects={getProjects}
                            {...props}
                        />)}
                </div>
            </section>

        </div >
    );
};
export default ProjectsList