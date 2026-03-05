import { Menu, Phone, Mail, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchCommand } from './SearchCommand';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => `
    relative py-1 transition-colors duration-300 font-medium text-sm
    ${isActive(path) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
    after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300
    ${isActive(path) ? 'after:scale-x-100' : ''}
  `;

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300 border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md shadow-blue-200">
              <span className="text-base">🎓</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">Szkoła Montessori</p>
              <p className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors leading-tight">Konin</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/" className={linkClass('/')}>O szkole</Link>
            <Link to="/metoda" className={linkClass('/metoda')}>Metoda</Link>
            <Link to="/klasy" className={linkClass('/klasy')}>Klasy</Link>
            <Link to="/aktualnosci" className={linkClass('/aktualnosci')}>Aktualności</Link>
            <Link to="/kadra" className={linkClass('/kadra')}>Kadra</Link>
            <Link to="/dla-rodzicow" className={linkClass('/dla-rodzicow')}>Dla Rodziców</Link>
            <Link to="/kontakt" className={linkClass('/kontakt')}>Kontakt</Link>

            {/* Platforma dropdown */}
            <div className="relative group">
              <button className="py-1 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 text-sm">
                Platforma
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-1.5">
                  <Link 
                    to="/logowanie-ucznia" 
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    <span className="text-base">📚</span>
                    Platforma ucznia
                  </Link>
                  <Link 
                    to="/logowanie-nauczyciela" 
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                  >
                    <span className="text-base">👩‍🏫</span>
                    Panel nauczyciela
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-110 rounded-xl hover:bg-blue-50"
              title="Wyszukaj (Ctrl+K)"
            >
              <Search size={18} />
            </button>
            <a 
              href="tel:+48724139955" 
              className="p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-110 rounded-xl hover:bg-blue-50"
              title="Zadzwoń do nas"
            >
              <Phone size={18} />
            </a>
            <a 
              href="mailto:kontakt@odkrywcyswiata.pl" 
              className="p-2 text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-110 rounded-xl hover:bg-blue-50"
              title="Napisz do nas"
            >
              <Mail size={18} />
            </a>
            <Link to="/rekrutacja" className="ml-1">
              <Button className="h-9 px-4 text-sm bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300">
                Zapisy
              </Button>
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-1 lg:hidden">
            <button 
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <button 
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[40rem] opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="py-3 border-t border-gray-100 flex flex-col gap-0.5">
            {[
              { to: '/', label: 'O szkole' },
              { to: '/metoda', label: 'Metoda Montessori' },
              { to: '/klasy', label: 'Klasy' },
              { to: '/aktualnosci', label: 'Aktualności' },
              { to: '/kadra', label: 'Kadra' },
              { to: '/dla-rodzicow', label: 'Dla Rodziców' },
              { to: '/kontakt', label: 'Kontakt' },
              { to: '/rekrutacja', label: 'Rekrutacja / Zapisy' },
              { to: '/praca', label: 'Oferty pracy' },
            ].map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`py-2.5 px-3 rounded-xl transition-colors text-sm font-medium ${isActive(link.to) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-gray-100 mt-1 pt-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Platforma</p>
              <Link 
                to="/logowanie-ucznia" 
                className="py-2.5 px-3 rounded-xl transition-colors text-gray-700 hover:bg-gray-50 block text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Platforma ucznia
              </Link>
              <Link 
                to="/logowanie-nauczyciela" 
                className="py-2.5 px-3 rounded-xl transition-colors text-gray-700 hover:bg-gray-50 block text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Panel nauczyciela
              </Link>
            </div>

            <div className="pt-2 px-3 flex items-center gap-2">
              <Link to="/rekrutacja" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm">Zapisy do szkoły</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      
      <SearchCommand open={searchOpen} setOpen={setSearchOpen} />
    </header>
  );
}