import nextId from "react-id-generator";
import javascript from "../../images/javascript-icon.svg";
import react from "../../images/react-icon.svg";
import node from "../../images/nodejs-icon.svg";
import mongo from "../../images/mongodb-icon.svg";
import html from "../../images/html-icon.svg";
import css from "../../images/css-icon.svg";
import sass from "../../images/sass-icon.svg";
import github from "../../images/github-icon.svg";
import tickbox from "../../images/tick-box.svg";

export const resume = [
  {
    id: nextId(),
    year: "2007 - 2011",
    school: "Faculty of Technical Sciences Novi Sad, Master academic studies",
    title: "Title obtained Master in Engineering Management.",
  },
  {
    id: nextId(),
    year: "2004 - 2007",
    school:
      "Higher School of Professional Business Studies, University of Novi Sad",
    title: "Title obtained, Bachelor in Trade and International Business",
  },
];

export const skills = [
  {
    id: nextId(),
    experience: tickbox,
    skill: javascript,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: react,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: node,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: mongo,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: html,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: css,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: sass,
  },
  {
    id: nextId(),
    experience: tickbox,
    skill: github,
  },
];
