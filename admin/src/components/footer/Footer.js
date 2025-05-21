import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Section Réseaux Sociaux */}
          <h3 className="text-xl font-semibold mb-4 tracking-wide">
            Suivez-nous sur les réseaux sociaux
          </h3>
          <div className="flex space-x-8 mb-6">
            <a
              href="https://www.facebook.com/librairibenzarti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-500 transition-colors duration-200 transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/librairie_benzarti/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-pink-500 transition-colors duration-200 transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Section Crédits */}
          <p className="text-sm font-medium text-gray-300">
            Dynamic coding with <span className="text-blue-400">TopNiveau</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;