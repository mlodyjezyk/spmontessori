import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Administrator danych osobowych',
    content: `Administratorem danych osobowych jest Prywatna Szkoła Podstawowa Montessori „Odkrywcy Świata" z siedzibą przy ul. Zofii Urbanowskiej 9, 62-500 Konin (dalej: „Szkoła", „Administrator").

Kontakt z Administratorem: kontakt@odkrywcyswiata.pl | +48 724 139 955`,
  },
  {
    title: '2. Cele i podstawy przetwarzania danych',
    content: `Szkoła przetwarza dane osobowe w następujących celach:

• Realizacja procesu rekrutacji i kształcenia uczniów – na podstawie umowy (art. 6 ust. 1 lit. b RODO) oraz obowiązku prawnego (art. 6 ust. 1 lit. c RODO).
• Komunikacja z rodzicami i opiekunami prawnymi – na podstawie prawnie uzasadnionego interesu Administratora (art. 6 ust. 1 lit. f RODO).
• Prowadzenie dokumentacji szkolnej – na podstawie obowiązku prawnego wynikającego z przepisów prawa oświatowego (art. 6 ust. 1 lit. c RODO).
• Marketing usług edukacyjnych – na podstawie udzielonej zgody (art. 6 ust. 1 lit. a RODO).
• Publikacja wizerunku na stronie internetowej i w mediach społecznościowych – wyłącznie na podstawie odrębnej pisemnej zgody (art. 6 ust. 1 lit. a RODO).`,
  },
  {
    title: '3. Kategorie przetwarzanych danych',
    content: `Administrator przetwarza następujące kategorie danych osobowych:

• Dane identyfikacyjne: imię, nazwisko, PESEL (uczniowie), data urodzenia.
• Dane kontaktowe: adres zamieszkania, numer telefonu, adres e-mail.
• Dane dotyczące nauki: wyniki w nauce, frekwencja, opinie pedagogiczne i psychologiczne.
• Dane szczególnych kategorii (wrażliwe): dane dotyczące zdrowia ucznia – wyłącznie w zakresie niezbędnym do zapewnienia odpowiedniej opieki i warunków nauki, na podstawie wyraźnej zgody lub przepisów prawa.`,
  },
  {
    title: '4. Okres przechowywania danych',
    content: `Dane osobowe przechowywane są przez okres:

• Danych uczniów i rodziców: przez czas trwania umowy edukacyjnej oraz wymagany przepisami prawa okresy archiwizacyjne (min. 5 lat od zakończenia nauki).
• Danych kandydatów (rekrutacja): do 6 miesięcy od zakończenia procesu rekrutacji.
• Danych marketingowych: do czasu wycofania zgody.
• Dokumentacji kadrowej nauczycieli: 50 lat zgodnie z przepisami prawa pracy.`,
  },
  {
    title: '5. Prawa osób, których dane dotyczą',
    content: `Każdej osobie, której dane są przetwarzane, przysługują następujące prawa:

• Prawo dostępu do danych (art. 15 RODO).
• Prawo do sprostowania danych (art. 16 RODO).
• Prawo do usunięcia danych („prawo do bycia zapomnianym") – art. 17 RODO.
• Prawo do ograniczenia przetwarzania (art. 18 RODO).
• Prawo do przenoszenia danych (art. 20 RODO).
• Prawo do sprzeciwu wobec przetwarzania (art. 21 RODO).
• Prawo do wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed wycofaniem).
• Prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, www.uodo.gov.pl).`,
  },
  {
    title: '6. Odbiorcy danych',
    content: `Dane osobowe mogą być przekazywane:

• Organom administracji publicznej (kuratoria oświaty, GUS) – w zakresie wynikającym z przepisów prawa.
• Dostawcom usług IT obsługującym systemy informatyczne szkoły (dziennik elektroniczny, poczta e-mail) – na podstawie umów powierzenia danych.
• Ubezpieczycielom – w zakresie niezbędnym do zapewnienia uczniom ubezpieczenia NNW.

Administrator nie przekazuje danych osobowych do państw trzecich ani organizacji międzynarodowych bez wyraźnej zgody lub odpowiedniej podstawy prawnej.`,
  },
  {
    title: '7. Pliki cookies i dane techniczne',
    content: `Strona internetowa Szkoły korzysta z plików cookies (ciasteczek), które służą do:

• Zapewnienia prawidłowego funkcjonowania strony.
• Analizy ruchu (statystyki – np. Google Analytics).
• Umożliwienia logowania do platformy edukacyjnej.

Użytkownik może w każdej chwili wyłączyć obsługę plików cookies w ustawieniach przeglądarki. Wyłączenie cookies może ograniczyć dostępność niektórych funkcji strony.`,
  },
  {
    title: '8. Bezpieczeństwo danych',
    content: `Administrator stosuje odpowiednie środki techniczne i organizacyjne zapewniające bezpieczeństwo przetwarzanych danych osobowych, w tym:

• Szyfrowanie danych przesyłanych przez Internet (protokół HTTPS/TLS).
• Kontrolę dostępu do systemów informatycznych.
• Regularne kopie zapasowe danych.
• Szkolenia personelu w zakresie ochrony danych.`,
  },
  {
    title: '9. Zmiany polityki prywatności',
    content: `Administrator zastrzega sobie prawo do zmiany niniejszej Polityki Prywatności. O wszelkich zmianach użytkownicy zostaną poinformowani poprzez zamieszczenie zaktualizowanej wersji na stronie internetowej Szkoły.

Niniejsza Polityka Prywatności obowiązuje od dnia 1 września 2024 r.`,
  },
];

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Dokument prawny</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Polityka Prywatności</h1>
          <p className="text-gray-500">
            Prywatna Szkoła Podstawowa Montessori „Odkrywcy Świata" w Koninie<br />
            <span className="text-sm">Ostatnia aktualizacja: 1 września 2024 r.</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8">
          <p className="text-sm text-blue-800 leading-relaxed">
            Szanując Twoją prywatność i zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 
            z dnia 27 kwietnia 2016 r. (RODO), informujemy o zasadach przetwarzania danych osobowych przez 
            Prywatną Szkołę Podstawową Montessori „Odkrywcy Świata".
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-2">Kontakt w sprawie danych osobowych</h3>
          <p className="text-gray-400 text-sm mb-4">
            Wszelkie pytania, wnioski i żądania dotyczące przetwarzania danych osobowych prosimy kierować na:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <span>📧</span>
              <a href="mailto:kontakt@odkrywcyswiata.pl" className="hover:text-white transition-colors">
                kontakt@odkrywcyswiata.pl
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>📍</span>
              <span>ul. Zofii Urbanowskiej 9, 62-500 Konin</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span>📞</span>
              <a href="tel:+48724139955" className="hover:text-white transition-colors">
                +48 724 139 955
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link to="/regulamin" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Regulamin szkoły →
          </Link>
          <Link to="/dla-rodzicow" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Dokumenty dla rodziców →
          </Link>
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}
