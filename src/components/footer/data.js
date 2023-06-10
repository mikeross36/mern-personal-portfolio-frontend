import nextId from "react-id-generator";
import facebook from "../../images/facebook-footer.svg";
import github from "../../images/github-footer.svg";
import linkedin from "../../images/linkedin-footer.svg";

export const footerSocials = [
  {
    id: nextId(),
    url: "https://sr-rs.facebook.com/fitposle.cetrdeset",
    image: facebook,
  },
  {
    id: nextId(),
    url: "https://github.com/mikeross36",
    image: github,
  },
  {
    id: nextId(),
    url: "https://rs.linkedin.com/in/vladimir-monarov-8b79511a2",
    image: linkedin,
  },
];
