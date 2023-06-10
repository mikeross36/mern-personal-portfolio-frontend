import React from "react";
import portfolioImg from "../../images/portfolio_img.jpg";
import { socials } from "./data";

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="home__container container">
        <div className="home__img-bcg">
          <img src={portfolioImg} alt="" className="home__img" />
        </div>
        <div className="home__socials">
          <span className="line-after"></span>
          {socials.map((social) => {
            const { id, url, text } = social;
            return (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="home__socials-link"
              >
                {text}
              </a>
            );
          })}
          <span className="line-before"></span>
        </div>
        <div className="home__data">
          <h1 className="home__title">vladimir</h1>
          <h1 className="home__title">monarov</h1>
          <div className="home__underline"></div>
          <h3 className="home__description">front-end developer</h3>
        </div>
      </div>
    </section>
  );
};

export default Home;
