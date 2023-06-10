import React from "react";
import { projects } from "./data";

const Projects = () => {
  return (
    <section className="projects section">
      <h1 className="section__title">Projects</h1>
      <div className="projects__container">
        {projects.map((project) => {
          const { id, image, btns } = project;
          return (
            <article key={id} className="projects__item">
              <img src={image} alt="projects pic" className="projects__img" />
              <div className="projects__btns">
                {btns.map((btn) => {
                  const { id, url, icon } = btn;
                  return (
                    <span key={id} className="btn">
                      <a href={url} target="_blank" rel="noreferrer">
                        <img
                          src={icon}
                          alt="icons"
                          className="projects__btn"
                          width="30px"
                          height="30px"
                        />
                      </a>
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
