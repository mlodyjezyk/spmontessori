import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function MontessoriMethod() {
  return (
    <section id="metoda" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Metoda Montessori</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Metoda edukacyjna opracowana przez włoską lekarkę i pedagog Marię Montessori, która stawia dziecko w centrum procesu nauczania.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1619970984080-2666543ed883?w=1080&q=80"
              alt="Materiały edukacyjne Montessori"
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl text-gray-900">Podstawowe zasady metody</h3>
            <Tabs defaultValue="independent" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="independent">Samodzielność</TabsTrigger>
                <TabsTrigger value="environment">Środowisko</TabsTrigger>
              </TabsList>
              <TabsContent value="independent" className="space-y-4 mt-6">
                <p className="text-gray-700">
                  Dzieci uczą się poprzez własną aktywność, a nauczyciel pełni rolę przewodnika. Uczniowie sami wybierają zajęcia i pracują we własnym tempie.
                </p>
                <ul className="space-y-2 text-gray-700">
                  {[
                    'Rozwój samodzielności i odpowiedzialności',
                    'Kształtowanie wewnętrznej motywacji do nauki',
                    'Umiejętność podejmowania decyzji',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="environment" className="space-y-4 mt-6">
                <p className="text-gray-700">
                  Przygotowane środowisko to kluczowy element metody Montessori. Sale są specjalnie zaprojektowane, aby wspierać naturalną ciekawość dzieci.
                </p>
                <ul className="space-y-2 text-gray-700">
                  {[
                    'Materiały dostosowane do wzrostu dziecka',
                    'Porządek i ład wspierający koncentrację',
                    'Swobodny dostęp do pomocy dydaktycznych',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { emoji: '🎯', title: 'Indywidualizacja', desc: 'Każde dziecko rozwija się we własnym tempie. Dostosowujemy program do potrzeb i możliwości ucznia.' },
            { emoji: '🤝', title: 'Współpraca', desc: 'Dzieci w różnym wieku uczą się razem, co wspiera rozwój społeczny i empatię.' },
            { emoji: '🌱', title: 'Rozwój holistyczny', desc: 'Dbamy o wszechstronny rozwój: intelektualny, emocjonalny, społeczny i fizyczny.' },
          ].map((card) => (
            <div key={card.title} className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">{card.emoji}</div>
              <h4 className="text-xl text-gray-900 mb-3">{card.title}</h4>
              <p className="text-gray-600">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
