import React from "react";
import { resume, skills } from "./data";

const About = () => {
  return (
    <section className="about section" id="about">
      <h1 className="section__title about__section-title">about me</h1>
      <div className="about__container">
        <div className="about__resume">
          <h3 className="about__resume-title">resume</h3>
          {resume.map((item) => {
            const { id, year, school, title } = item;
            return (
              <article key={id} className="about__resume-item">
                <p>{year}</p>
                <p>{school}</p>
                <p>{title}</p>
              </article>
            );
          })}
        </div>
        <div className="about__skills">
          <h3 className="about__resume-title">skills</h3>
          {skills.map((item) => {
            const { id, experience, skill } = item;
            return (
              <article key={id} className="about__skills-item">
                <img
                  src={skill}
                  alt="skill icon"
                  className="about__skills-img"
                  width="30px"
                  height="30px"
                />
                <img
                  src={experience}
                  alt="tickbox icon"
                  className="about__tickbox"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
