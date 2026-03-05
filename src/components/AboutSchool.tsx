import { Users, Heart, BookOpen, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function AboutSchool() {
  const features = [
    {
      icon: Users,
      title: 'Małe grupy',
      description: 'Indywidualne podejście do każdego ucznia w kameralnych klasach'
    },
    {
      icon: Heart,
      title: 'Rozwój społeczny',
      description: 'Wspieramy rozwój emocjonalny i społeczny dzieci'
    },
    {
      icon: BookOpen,
      title: 'Metoda Montessori',
      description: 'Edukacja oparta na sprawdzonych metodach pedagogicznych'
    },
    {
      icon: Award,
      title: 'Wysoka jakość',
      description: 'Doświadczeni nauczyciele z certyfikatami Montessori'
    }
  ];

  return (
    <section id="o-szkole" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">O naszej szkole</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jesteśmy prywatną szkołą podstawową w Koninie, która od lat z powodzeniem wdraża metodę Montessori w edukacji dzieci.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-blue-600 transition-all hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-lg text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl text-gray-900 mb-4">Dlaczego nasza szkoła?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Autorskie programy nauczania zgodne z podstawą programową</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Certyfikowani nauczyciele z wykształceniem Montessori</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Nowoczesne pomoce dydaktyczne i sale dostosowane do metody</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Wsparcie psychologiczno-pedagogiczne dla uczniów</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Rozbudowany program zajęć pozalekcyjnych</span>
                </li>
              </ul>
            </div>
            <div className="lg:pl-8">
              <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-700">
                <p className="mb-4">
                  "Pomóż mi to zrobić samemu" - to filozofia, którą kierujemy się w pracy z dziećmi. Każde dziecko ma w sobie ogromny potencjał, który czeka na odkrycie.
                </p>
                <footer className="text-sm text-gray-600">
                  - Maria Montessori
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
