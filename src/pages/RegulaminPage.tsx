import { ScrollText } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Rozdział I – Postanowienia ogólne',
    items: [
      'Prywatna Szkoła Podstawowa Montessori „Odkrywcy Świata" w Koninie (dalej: „Szkoła") jest placówką edukacyjną działającą na podstawie ustawy z dnia 14 grudnia 2016 r. – Prawo oświatowe.',
      'Szkoła działa zgodnie ze swoim Statutem, niniejszym Regulaminem oraz obowiązującymi przepisami prawa.',
      'Organem prowadzącym Szkołę jest podmiot prywatny z siedzibą w Koninie.',
      'Szkoła realizuje program nauczania zgodny z metodą Montessori, uzupełnioną o podstawę programową kształcenia ogólnego.',
    ],
  },
  {
    title: 'Rozdział II – Przyjęcie ucznia do szkoły',
    items: [
      'Przyjęcie dziecka do Szkoły następuje na podstawie złożonego formularza rekrutacyjnego, rozmowy kwalifikacyjnej z rodzicami/opiekunami prawnymi oraz podpisania umowy o świadczenie usług edukacyjnych.',
      'Warunkiem przyjęcia jest dostarczenie kompletu wymaganych dokumentów, w tym zaświadczenia lekarskiego o braku przeciwwskazań do nauki.',
      'W przypadku dzieci z orzeczeniami o potrzebie kształcenia specjalnego, Szkoła zastrzega sobie prawo do oceny możliwości zapewnienia odpowiednich warunków nauki.',
      'Rodzice/opiekunowie prawni zobowiązani są do terminowego wnoszenia opłat za czesne zgodnie z harmonogramem ustalonym w umowie.',
    ],
  },
  {
    title: 'Rozdział III – Prawa i obowiązki ucznia',
    items: [
      'Uczeń ma prawo do: bezpiecznych i higienicznych warunków nauki, sprawiedliwej i jawnej oceny, poszanowania godności osobistej, swobody wyrażania myśli i przekonań, rozwijania zainteresowań i uzdolnień.',
      'Uczeń jest zobowiązany do: przestrzegania Statutu Szkoły i niniejszego Regulaminu, systematycznego uczęszczania na zajęcia, punktualności, szanowania mienia szkolnego, kulturalnego zachowania wobec wszystkich uczestników społeczności szkolnej.',
      'Każdy uczeń zobowiązany jest do posiadania wymaganych przyborów szkolnych.',
      'Zabrania się przynoszenia do szkoły niebezpiecznych przedmiotów, papierosów, alkoholu i środków odurzających.',
      'Korzystanie z telefonów komórkowych podczas zajęć edukacyjnych jest dozwolone wyłącznie za zgodą nauczyciela i w celach edukacyjnych.',
    ],
  },
  {
    title: 'Rozdział IV – Prawa i obowiązki rodziców',
    items: [
      'Rodzice/opiekunowie prawni mają prawo do: rzetelnej informacji o postępach dziecka, uczestnictwa w zebraniach i spotkaniach szkolnych, wyrażania opinii na temat pracy szkoły, wglądu w dokumentację szkolną dotyczącą ich dziecka.',
      'Rodzice/opiekunowie prawni są zobowiązani do: zapewnienia regularnego uczęszczania dziecka na zajęcia, usprawiedliwiania nieobecności w terminie 7 dni roboczych, terminowego wnoszenia opłat za czesne, współpracy ze szkołą w procesie wychowania.',
      'O nieobecności dziecka rodzice zobowiązani są poinformować szkołę w dniu nieobecności (telefonicznie lub mailowo).',
      'Rodzice są zobowiązani do aktualizacji danych kontaktowych w sekretariacie szkoły.',
    ],
  },
  {
    title: 'Rozdział V – Zasady bezpieczeństwa',
    items: [
      'Szkoła sprawuje opiekę nad uczniami podczas zajęć lekcyjnych, przerw oraz innych zajęć organizowanych przez szkołę.',
      'Odbiór dziecka ze szkoły może nastąpić wyłącznie przez osoby wskazane przez rodziców w karcie informacyjnej.',
      'W przypadku wcześniejszego wyjścia dziecka ze szkoły wymagana jest pisemna zgoda rodziców/opiekunów.',
      'Uczniowie mają zakaz samowolnego opuszczania terenu szkoły podczas trwania zajęć i przerw.',
      'W razie wypadku lub nagłego pogorszenia stanu zdrowia, szkoła niezwłocznie powiadamia rodziców/opiekunów.',
    ],
  },
  {
    title: 'Rozdział VI – Organizacja zajęć',
    items: [
      'Rok szkolny przebiega zgodnie z Rozporządzeniem Ministra Edukacji Narodowej w sprawie organizacji roku szkolnego.',
      'Godzina lekcyjna trwa 45 minut. Plan zajęć ustalany jest na początku roku szkolnego.',
      'Przerwy śródlekcyjne trwają co najmniej 10 minut. Przerwa obiadowa wynosi minimum 20 minut.',
      'Zajęcia pozalekcyjne, wycieczki i imprezy szkolne organizowane są zgodnie z planem pracy szkoły.',
      'Zmiany w planie zajęć podawane są do wiadomości z minimum jednodniowym wyprzedzeniem.',
    ],
  },
  {
    title: 'Rozdział VII – Ocenianie i promocja',
    items: [
      'Ocenianie uczniów odbywa się zgodnie z Wewnątrzszkolnym Systemem Oceniania (WSO), stanowiącym integralną część Statutu Szkoły.',
      'Szkoła stosuje ocenianie opisowe (klasy I-III) oraz ocenianie cyfrowe w skali 1–6 (klasy IV-VIII).',
      'Uczeń otrzymuje świadectwo ukończenia klasy na zakończenie każdego roku szkolnego.',
      'Warunki i tryb uzyskania wyższych ocen niż przewidywane oraz warunki poprawiania ocen określa WSO.',
    ],
  },
  {
    title: 'Rozdział VIII – Opłaty',
    items: [
      'Wysokość czesnego i innych opłat określona jest w umowie o świadczenie usług edukacyjnych.',
      'Czesne płatne jest miesięcznie, z góry do 10. dnia każdego miesiąca.',
      'Za nieterminową płatność szkoła zastrzega sobie prawo naliczenia odsetek ustawowych.',
      'W uzasadnionych przypadkach, na pisemny wniosek rodziców, dyrektor szkoły może wyrazić zgodę na odroczenie lub rozłożenie na raty zaległych płatności.',
      'Rezygnacja z miejsca w szkole wymaga pisemnego wypowiedzenia umowy z zachowaniem miesięcznego okresu wypowiedzenia.',
    ],
  },
  {
    title: 'Rozdział IX – Postanowienia końcowe',
    items: [
      'Niniejszy Regulamin wchodzi w życie z dniem 1 września 2024 r.',
      'Wszelkie sprawy nieuregulowane niniejszym Regulaminem rozstrzyga dyrektor szkoły w oparciu o Statut Szkoły i obowiązujące przepisy prawa.',
      'Regulamin jest dostępny w sekretariacie szkoły oraz na stronie internetowej.',
      'Szkoła zastrzega sobie prawo do zmiany Regulaminu. O zmianach rodzice informowani są z co najmniej 14-dniowym wyprzedzeniem.',
    ],
  },
];

export function RegulaminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Dokument prawny</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Regulamin Szkoły</h1>
          <p className="text-gray-500">
            Prywatna Szkoła Podstawowa Montessori „Odkrywcy Świata" w Koninie<br />
            <span className="text-sm">Obowiązuje od: 1 września 2024 r.</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-8">
          <p className="text-sm text-amber-800 leading-relaxed">
            Niniejszy Regulamin określa zasady funkcjonowania Prywatnej Szkoły Podstawowej Montessori 
            „Odkrywcy Świata" w Koninie. Podpisanie umowy o świadczenie usług edukacyjnych jest równoznaczne 
            z akceptacją postanowień niniejszego Regulaminu oraz Statutu Szkoły.
          </p>
        </div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <ol className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                    <span className="text-gray-300 font-medium flex-shrink-0 mt-0.5">§{i + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-6 text-white">
          <h3 className="font-semibold mb-2">Pytania dotyczące regulaminu?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Pełna treść Statutu Szkoły dostępna jest w sekretariacie. Wszelkie pytania kieruj do dyrekcji lub sekretariatu.
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
              <span>⏰</span>
              <span>Sekretariat: Pn–Pt, 7:00–17:00</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Link to="/polityka-prywatnosci" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Polityka prywatności →
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
