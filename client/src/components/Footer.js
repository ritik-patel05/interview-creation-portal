import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-5 mx-auto text-center">
      <p>© | 2021 | ritik-patel05</p>
      <ul className="flex w-full justify-center">
        <li className="m-2 cursor-pointer">
          <a href="https://github.com/ritik-patel05" target="_blank">
            <FontAwesomeIcon className="text-blue-500 h-6" icon={faGithub} />
          </a>
        </li>
        <li className="m-2 cursor-pointer">
          <a href="https://twitter.com/RitikPa47438007" target="_blank">
            <FontAwesomeIcon className="text-blue-500 h-6" icon={faTwitter} />
          </a>
        </li>
        <li className="m-2 cursor-pointer">
          <a
            href="https://www.linkedin.com/in/ritik-patel-5a61211a4/"
            target="_blank"
          >
            <FontAwesomeIcon className="text-blue-500 h-6" icon={faLinkedin} />
          </a>
        </li>
        <li className="m-2 cursor-pointer">
          <a href="https://www.instagram.com/ritik_patel05/" target="_blank">
            <FontAwesomeIcon className="text-blue-500 h-6" icon={faInstagram} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
