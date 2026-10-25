import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, Users2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Classes() {
  const classGroups = [
    {
      title: 'Klasy 1-3',
      subtitle: 'Edukacja wczesnoszkolna',
      age: '6-9 lat',
      icon: Sparkles,
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-200',
      features: [
        'Nauka czytania i pisania metodą Montessori',
        'Matematyka konkretna - materiały sensoryczne',
        'Kosmiczne edukacja - poznawanie świata',
        'Rozwijanie umiejętności społecznych',
        'Zajęcia artystyczne i muzyczne',
        'Wychowanie fizyczne dostosowane do wieku'
      ]
    },
    {
      title: 'Klasy 4-6',
      subtitle: 'Etap II edukacji',
      age: '9-12 lat',
      icon: Users2,
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-200',
      features: [
        'Pogłębianie wiedzy w zakresie przedmiotów podstawowych',
        'Projekty badawcze i eksperymenty',
        'Rozwój myślenia abstrakcyjnego',
        'Praca w grupach nad projektami',
        'Języki obce (angielski)',
        'Zajęcia dodatkowe według zainteresowań'
      ]
    },
    {
      title: 'Klasy 7-8',
      subtitle: 'Przygotowanie do egzaminów',
      age: '12-15 lat',
      icon: GraduationCap,
      borderColor: 'border-purple-200',
      color: 'bg-purple-100 text-purple-700',
      features: [
        'Realizacja pełnej podstawy programowej',
        'Przygotowanie do egzaminu ósmoklasisty',
        'Rozwijanie samodzielności w nauce',
        'Warsztat umiejętności społecznych',
        'Wsparcie w wyborze dalszej ścieżki edukacyjnej',
        'Indywidualne konsultacje z nauczycielami'
      ]
    }
  ];

  return (
    <section id="klasy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Nasze klasy</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferujemy kompleksową edukację na wszystkich etapach szkoły podstawowej - od klasy 1 do 8.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {classGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Card key={index} className={`border-2 ${group.borderColor} hover:shadow-xl transition-all`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${group.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={32} />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">{group.title}</CardTitle>
                  <p className="text-gray-600">{group.subtitle}</p>
                  <Badge variant="secondary" className="mt-2 mx-auto">
                    {group.age}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {group.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl mb-4">Rekrutacja na rok szkolny 2026/2027</h3>
          <p className="text-lg mb-6 opacity-90">
            Zapisy trwają! Zapraszamy na dzień otwarty, aby poznać naszą szkołę i metodę nauczania.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/kontakt"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Umów wizytę
            </Link>
            <Link
              to="/dla-rodzicow"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Pobierz dokumenty
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
