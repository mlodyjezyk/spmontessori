import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { EMAIL_WITH_DOMAIN } from '../utils/formValidation';

export function News() {
  const [newsletterDemoComplete, setNewsletterDemoComplete] = useState(false);
  const news = [
    {
      id: 1,
      title: 'Dzień Otwarty - 15 lutego 2026',
      date: '2026-11-15',
      category: 'Rekrutacja',
      excerpt: 'Zapraszamy wszystkich zainteresowanych rodziców na dzień otwarty. Możliwość zwiedzenia szkoły, poznania kadry i metody Montessori.',
      time: '10:00 - 14:00'
    },
    {
      id: 2,
      title: 'Sukces naszych uczniów w konkursie matematycznym',
      date: '2026-12-20',
      category: 'Osiągnięcia',
      excerpt: 'Uczniowie klasy 7 zajęli I i II miejsce w wojewódzkim konkursie matematycznym. Gratulujemy!',
      time: null
    },
    {
      id: 3,
      title: 'Warsztaty dla rodziców - Metoda Montessori w domu',
      date: '2027-02-01',
      category: 'Warsztat',
      excerpt: 'Cykl warsztatów dla rodziców, jak wspierać rozwój dziecka w duchu Montessori w codziennym życiu.',
      time: '17:00 - 19:00'
    },
    {
      id: 4,
      title: 'Zimowy obóz naukowy',
      date: '2027-01-20',
      category: 'Wydarzenie',
      excerpt: 'Zapraszamy uczniów klas 4-8 na zimowy obóz naukowy w Zakopanem. Program łączy edukację z rekreacją.',
      time: '20-27 stycznia'
    }
  ];

  const events = [
    {
      date: '15',
      month: 'Lut',
      title: 'Dzień Otwarty',
      time: '10:00 - 14:00',
      description: 'Zwiedzanie szkoły i spotkanie z nauczycielami'
    },
    {
      date: '01',
      month: 'Lut',
      title: 'Warsztaty dla rodziców',
      time: '17:00 - 19:00',
      description: 'Metoda Montessori w domu'
    },
    {
      date: '20',
      month: 'Lut',
      title: 'Ferie zimowe',
      time: 'Cały dzień',
      description: 'Przerwa w zajęciach lekcyjnych'
    },
    {
      date: '01',
      month: 'Mar',
      title: 'Zakończenie rekrutacji',
      time: '16:00',
      description: 'Ostateczny termin składania dokumentów'
    },
    {
      date: '15',
      month: 'Mar',
      title: 'Festiwal Talentów',
      time: '15:00 - 18:00',
      description: 'Prezentacja umiejętności uczniów'
    },
    {
      date: '22',
      month: 'Mar',
      title: 'Wywiadówka',
      time: '17:00 - 19:00',
      description: 'Spotkanie z rodzicami - semestr wiosenny'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Rekrutacja': 'bg-blue-100 text-blue-700',
      'Osiągnięcia': 'bg-green-100 text-green-700',
      'Warsztat': 'bg-purple-100 text-purple-700',
      'Wydarzenie': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section id="aktualnosci" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Aktualności i wydarzenia</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bądź na bieżąco z tym, co dzieje się w naszej szkole
          </p>
        </div>

        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="news">Aktualności</TabsTrigger>
            <TabsTrigger value="calendar">Kalendarz</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {news.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={16} />
                        <span>{new Date(item.date).toLocaleDateString('pl-PL')}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    {item.time && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar size={16} />
                        <span>{item.time}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-lg flex flex-col items-center justify-center">
                          <div className="text-2xl">{event.date}</div>
                          <div className="text-xs uppercase">{event.month}</div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 mb-1">{event.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Clock size={14} />
                          <span>{event.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
              <Calendar className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl text-gray-900 mb-2">Chcesz być na bieżąco?</h3>
              {newsletterDemoComplete ? (
                <div role="status" className="mx-auto max-w-md rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                  Zapis demonstracyjny zakończony. Adres nie został wysłany ani zapisany.
                  <button
                    type="button"
                    onClick={() => setNewsletterDemoComplete(false)}
                    className="ml-2 font-medium underline"
                  >
                    Wróć
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-4">
                    Tryb demonstracyjny — zapis nie zostanie wysłany ani zachowany.
                  </p>
                  <form
                    className="flex gap-2 max-w-md mx-auto"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setNewsletterDemoComplete(true);
                    }}
                  >
                    <label className="sr-only" htmlFor="newsletter-email">Adres email</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      pattern={EMAIL_WITH_DOMAIN}
                      title="Wpisz adres w formacie imie@domena.pl"
                      placeholder="Twój adres email"
                      className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Przetestuj zapis
                    </button>
                  </form>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
