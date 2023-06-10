import { footerSocials } from "./data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__group">
          <ul className="footer__social">
            {footerSocials.map((social) => {
              const { id, url, image } = social;
              return (
                <li key={id}>
                  <Link
                    to={url}
                    className="footer__social-link"
                    target="_blank"
                  >
                    <img
                      src={image}
                      alt="footer social icon"
                      width={30}
                      height={30}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="footer__copy">
            &copy; Copyright 2022 DodaDesign All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
