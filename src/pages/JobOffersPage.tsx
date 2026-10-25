import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function JobOffersPage() {
  const [demoApplication, setDemoApplication] = useState('');

  const offers = [
    {
      id: 1,
      title: "Nauczyciel Edukacji Wczesnoszkolnej",
      type: "Pełny etat",
      location: "Konin",
      salary: "Od 4500 zł brutto",
      description: "Poszukujemy pasjonata metody Montessori do prowadzenia klasy w edukacji wczesnoszkolnej. Wymagane wykształcenie kierunkowe oraz chęć rozwoju.",
      requirements: [
        "Wykształcenie wyższe pedagogiczne",
        "Znajomość metody Montessori (mile widziany kurs)",
        "Empatia i cierpliwość",
        "Umiejętność pracy w zespole"
      ]
    },
    {
      id: 2,
      title: "Asystent Nauczyciela",
      type: "Część etatu / Pełny etat",
      location: "Konin",
      salary: "Od 3600 zł brutto",
      description: "Wsparcie nauczyciela prowadzącego w codziennej pracy z dziećmi, przygotowywanie materiałów dydaktycznych i dbanie o porządek w klasie.",
      requirements: [
        "Wykształcenie średnie lub wyższe (w trakcie studiów)",
        "Zainteresowanie pedagogiką alternatywną",
        "Wysoka kultura osobista"
      ]
    },
    {
      id: 3,
      title: "Nauczyciel Języka Angielskiego",
      type: "Pełny etat",
      location: "Konin",
      salary: "Do negocjacji",
      description: "Prowadzenie zajęć z języka angielskiego w grupach przedszkolnych i szkolnych z wykorzystaniem metod aktywnych.",
      requirements: [
        "Filologia angielska lub kolegium językowe",
        "Doświadczenie w pracy z dziećmi",
        "Kreatywność w prowadzeniu zajęć"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Briefcase className="text-blue-600" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dołącz do naszego zespołu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tworzymy miejsce, w którym nauczyciele mają przestrzeń do rozwoju, a dzieci do odkrywania świata. Sprawdź, kogo aktualnie poszukujemy.
          </p>
        </div>

        <div className="space-y-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 mb-2">{offer.title}</CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {offer.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {offer.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {offer.salary}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="shrink-0 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setDemoApplication(offer.title)}
                  >
                    Aplikuj (demo) <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {demoApplication === offer.title && (
                <div role="status" className="mx-6 mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
                  Dziękujemy za zainteresowanie. Tryb demo — aplikacja nie została wysłana ani zapisana.
                </div>
              )}
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {offer.description}
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Wymagania:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {offer.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Nie znalazłeś oferty dla siebie?</h3>
          <p className="text-gray-600 mb-6">
            Zgłoszenie spontaniczne jest dostępne demonstracyjnie. Żadne CV ani dane nie zostaną wysłane lub zapisane.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setDemoApplication('spontaneous')}
          >
            Przetestuj zgłoszenie
          </Button>
          {demoApplication === 'spontaneous' && (
            <p role="status" className="mt-4 text-sm text-green-800">
              Dziękujemy za przetestowanie. Żadne CV ani dane nie zostały wysłane.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
