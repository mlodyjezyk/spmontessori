import { Facebook, Instagram, Mail, Phone, FileText, Shield, ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                <span className="text-lg">🎓</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm group-hover:text-blue-400 transition-colors">Szkoła Montessori</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Odkrywcy Świata · Konin</p>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Prywatna szkoła podstawowa z metodą Montessori w Koninie. Tworzymy przestrzeń do naturalnego rozwoju każdego dziecka.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/montessorianscyodkrywcyswiata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/szkola_odkrywcy_swiata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Szkoła</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'O szkole' },
                { to: '/metoda', label: 'Metoda Montessori' },
                { to: '/klasy', label: 'Klasy' },
                { to: '/aktualnosci', label: 'Aktualności' },
                { to: '/kadra', label: 'Kadra' },
                { to: '/rekrutacja', label: 'Rekrutacja / Zapisy' },
                { to: '/praca', label: 'Oferty pracy' },
                { to: '/dla-rodzicow', label: 'Dla Rodziców' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-blue-400 transition-colors hover:translate-x-0.5 inline-block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-gray-400" />
                </div>
                <div className="text-sm">
                  <a href="tel:+48724139955" className="block text-gray-500 hover:text-blue-400 transition-colors">+48 724 139 955</a>
                  <a href="tel:+48739030388" className="block text-gray-500 hover:text-blue-400 transition-colors">+48 739 030 388</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-gray-400" />
                </div>
                <a href="mailto:kontakt@odkrywcyswiata.pl" className="text-sm text-gray-500 hover:text-blue-400 transition-colors break-all">
                  kontakt@odkrywcyswiata.pl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs">📍</span>
                </div>
                <div className="text-sm text-gray-500">
                  <p className="text-gray-400 font-medium">Szkoła Podstawowa</p>
                  <p>ul. Zofii Urbanowskiej 9</p>
                  <p>62-500 Konin</p>
                </div>
              </li>
              <li className="bg-gray-900 rounded-xl px-4 py-3 text-sm">
                <p className="text-gray-500 text-xs mb-0.5">Godziny sekretariatu:</p>
                <p className="text-white font-medium">Pn–Pt: 7:00–17:00</p>
              </li>
            </ul>
          </div>

          {/* Documents & Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Dokumenty</h4>
            <ul className="space-y-2.5 mb-6">
              <li>
                <Link
                  to="/dla-rodzicow"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors group"
                >
                  <FileText size={14} className="group-hover:text-blue-400 flex-shrink-0" />
                  Dokumenty dla rodziców
                </Link>
              </li>
              <li>
                <Link
                  to="/regulamin"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors group"
                >
                  <ScrollText size={14} className="group-hover:text-blue-400 flex-shrink-0" />
                  Regulamin szkoły
                </Link>
              </li>
              <li>
                <Link
                  to="/polityka-prywatnosci"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors group"
                >
                  <Shield size={14} className="group-hover:text-blue-400 flex-shrink-0" />
                  Polityka prywatności
                </Link>
              </li>
            </ul>

            <h4 className="text-white text-sm font-semibold mb-3">Platforma edukacyjna</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/logowanie-ucznia"
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Platforma ucznia
                </Link>
              </li>
              <li>
                <Link
                  to="/logowanie-nauczyciela"
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                >
                  Panel nauczyciela
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600 text-center sm:text-left">
              © {year} Prywatna Szkoła Podstawowa Montessori „Odkrywcy Świata" w Koninie. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link to="/polityka-prywatnosci" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Polityka prywatności
              </Link>
              <span className="text-gray-700 text-xs">·</span>
              <Link to="/regulamin" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Regulamin
              </Link>
              <span className="text-gray-700 text-xs">·</span>
              <Link to="/dla-rodzicow" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Dla Rodziców
              </Link>
              <span className="text-gray-700 text-xs">·</span>
              <Link to="/kontakt" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}