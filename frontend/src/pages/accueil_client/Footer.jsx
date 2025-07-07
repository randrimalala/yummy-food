import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#120a04] text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8">

        {/* Branding */}
        <div>
          <img
            src="/logo.png" // adapte ce chemin selon ton projet
            alt="Logo YummyFood"
            className="w-32 mb-4"
          />
          <p className="text-sm text-gray-400 leading-relaxed">
            Une expérience de commande <br /> simple, rapide et savoureuse.
          </p>
        </div>


        {/* Navigation */}
        <nav aria-label="Navigation principale">
          <h4 className="text-lg font-semibold text-white mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#d35400] transition">Accueil</a></li>
            <li><a href="/produits" className="hover:text-[#d35400] transition">Produits</a></li>
            <li><a href="/panier" className="hover:text-[#d35400] transition">Panier</a></li>
            <li><a href="/contact" className="hover:text-[#d35400] transition">Contact</a></li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#d35400]" />
              <span>+261 34 12 345 67</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#d35400]" />
              <span>contact@montunnel.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#d35400]" />
              <span>Antananarivo, Madagascar</span>
            </li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-[#d35400] transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#d35400] transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#d35400] transition">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Ligne de séparation */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white">YummyFood</span>. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
