import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Odkrywcy Świata
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Niepubliczna Szkoła <br />
              <span className="text-blue-600">Montessori</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Rozwijamy potencjał każdego dziecka poprzez indywidualne podejście i sprawdzone metody edukacyjne Marii Montessori.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/rekrutacja">
                <Button size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-blue-600 hover:bg-blue-700">
                  Zapisz dziecko
                </Button>
              </Link>
              <Link to="/metoda">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl border-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300">
                  Poznaj naszą szkołę
                </Button>
              </Link>
            </div>
            <div className="pt-8 flex flex-wrap gap-8 text-sm border-t border-gray-200/60 mt-8">
              {[
                { value: '1–8', label: 'Klasy' },
                { value: '100%', label: 'Metoda Montessori' },
                { value: '10+', label: 'Lat doświadczenia' },
              ].map((stat) => (
                <div key={stat.label} className="hover:scale-105 transition-transform duration-300 cursor-default">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500" />
            <div className="rounded-2xl overflow-hidden shadow-2xl relative transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1080&q=80"
                alt="Uczniowie podczas zajęć w klasie"
                className="w-full h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
