import nextId from "react-id-generator";
import coffeebar from "../../images/coffeebar.png";
import drmartens from "../../images/drmartens.png";
import drones from "../../images/drones.png";
import dronesDark from "../../images/drones-dark.png";
import fitness from "../../images/fitness.png";
import eye from "../../images/eye-icon.svg";
import github from "../../images/github-icon.svg";
import ganja from "../../images/ganjawebshop.png";
import sandwitch from "../../images/sandwitch.png";
import michelangelo from "../../images/michelangelo.png";

export const projects = [
  {
    id: nextId(),
    image: ganja,
    btns: [
      { id: nextId(), url: "https://ganja-webshop.onrender.com/", icon: eye },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: drmartens,
    btns: [
      { id: nextId(), url: "https://drmartens-shop.netlify.app/", icon: eye },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: drones,
    btns: [
      {
        id: nextId(),
        url: "https://drones-crude-rest-api.cyclic.app/#home",
        icon: eye,
      },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: fitness,
    btns: [
      {
        id: nextId(),
        url: "https://fitness-truth-website.netlify.app/",
        icon: eye,
      },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: coffeebar,
    btns: [
      { id: nextId(), url: "https://coffeebar-website.netlify.app", icon: eye },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: dronesDark,
    btns: [
      { id: nextId(), url: "https://drones-website.netlify.app", icon: eye },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: sandwitch,
    btns: [
      { id: nextId(), url: "https://sandwich-bar.netlify.app", icon: eye },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
  {
    id: nextId(),
    image: michelangelo,
    btns: [
      {
        id: nextId(),
        url: "https://caffe-michelangelo-ns.netlify.app",
        icon: eye,
      },
      { id: nextId(), url: "https://github.com/mikeross36", icon: github },
    ],
  },
];
