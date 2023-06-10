import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/portfolio-logo.svg";
import { links } from "./data";
import closeBtn from "../../images/close-icon.svg";
import menuBtn from "../../images/menu-icon.svg";

const Header = () => {
  const [showMobMenu, setShowMobMenu] = useState(false);
  const [scrollHeader, setScrollHeader] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 40) {
        setScrollHeader(true);
      } else {
        setScrollHeader(false);
      }
    };
  }, []);

  const toggleMobMenu = () => {
    setShowMobMenu(!showMobMenu);
  };

  const closeMobMenu = () => {
    setShowMobMenu(false);
  };
  return (
    <header className={`header ${scrollHeader && "scroll-header"}`}>
      <nav className="nav container">
        <div className="nav__logo">
          <img src={logo} alt="logo icon" width={40} haight={40} />
        </div>
        <div
          className={`nav__menu ${showMobMenu && "show-menu"}`}
          onClick={closeMobMenu}
        >
          <ul className="nav__list">
            {links.map((link) => {
              const { id, url, title } = link;
              return (
                <li key={id} className="nav__item">
                  <Link to={url} className="nav__link">
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="nav__close">
            <img src={closeBtn} alt="menu close btn" width={40} height={40} />
          </button>
        </div>
        <button className="nav__toggle" onClick={toggleMobMenu}>
          <img src={menuBtn} alt="menu toggle btn" width={40} height={40} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
