import { Mail, Award, GraduationCap } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

const management = [
  {
    name: 'Dr Anna Kowalska',
    position: 'Dyrektor szkoły',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    email: 'a.kowalska@szkola-montessori.pl',
    bio: 'Doktor nauk pedagogicznych, certyfikowany trener Montessori AMI. 25 lat doświadczenia w edukacji alternatywnej.',
    credentials: ['Certyfikat AMI 6-12', 'Doktor pedagogiki', 'Supervisor Montessori'],
  },
  {
    name: 'Mgr Tomasz Nowak',
    position: 'Wicedyrektor ds. dydaktycznych',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    email: 't.nowak@szkola-montessori.pl',
    bio: 'Specjalista z zakresu metod aktywizujących, wieloletni nauczyciel matematyki i fizyki.',
    credentials: ['Certyfikat Montessori 12-18', 'Magister matematyki', 'Trener edukacji'],
  },
]

const teachers = [
  {
    name: 'Mgr Joanna Wiśniewska',
    position: 'Nauczyciel edukacji wczesnoszkolnej',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    email: 'j.wisniewska@szkola-montessori.pl',
    specialty: 'Klasy 1–3',
    credentials: ['Certyfikat AMI 3-6', 'Certyfikat AMI 6-9'],
  },
  {
    name: 'Mgr Piotr Zieliński',
    position: 'Nauczyciel języka angielskiego',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    email: 'p.zielinski@szkola-montessori.pl',
    specialty: 'Wszystkie klasy',
    credentials: ['Cambridge CELTA', 'Doświadczenie native-speaker'],
  },
  {
    name: 'Mgr Maria Lewandowska',
    position: 'Nauczyciel przyrody i biologii',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    email: 'm.lewandowska@szkola-montessori.pl',
    specialty: 'Klasy 4–8',
    credentials: ['Certyfikat Montessori 6-12', 'Magister biologii'],
  },
  {
    name: 'Mgr Katarzyna Dąbrowska',
    position: 'Psycholog szkolny',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
    email: 'k.dabrowska@szkola-montessori.pl',
    specialty: 'Wsparcie psychologiczne',
    credentials: ['Psycholog kliniczny', 'Terapeuta poznawczo-behawioralny'],
  },
  {
    name: 'Mgr Robert Wojciechowski',
    position: 'Nauczyciel wychowania fizycznego',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    email: 'r.wojciechowski@szkola-montessori.pl',
    specialty: 'Wszystkie klasy',
    credentials: ['AWF Poznań', 'Licencja trenerska UEFA B'],
  },
  {
    name: 'Mgr Aleksandra Kamińska',
    position: 'Nauczyciel muzyki i plastyki',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    email: 'a.kaminska@szkola-montessori.pl',
    specialty: 'Edukacja artystyczna',
    credentials: ['ASP Warszawa', 'Akademia Muzyczna'],
  },
]

export function Staff() {
  return (
    <section id="kadra" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Kadra i dyrekcja</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nasz zespół to wykwalifikowani pedagodzy z pasją do edukacji Montessori
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl text-gray-900 mb-8 text-center">Dyrekcja</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {management.map((person) => (
              <Card key={person.email} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-gray-200">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl text-gray-900 mb-1">{person.name}</h4>
                  <p className="text-blue-600 mb-3">{person.position}</p>
                  <p className="text-sm text-gray-600 mb-4">{person.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {person.credentials.map((cred) => (
                      <Badge key={cred} variant="secondary" className="text-xs">
                        <Award size={12} className="mr-1" />
                        {cred}
                      </Badge>
                    ))}
                  </div>
                  <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail size={16} />
                    {person.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl text-gray-900 mb-8 text-center">Kadra pedagogiczna</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <Card key={teacher.email} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg text-gray-900 mb-1">{teacher.name}</h4>
                  <p className="text-blue-600 text-sm mb-2">{teacher.position}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <GraduationCap size={16} />
                    <span>{teacher.specialty}</span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {teacher.credentials.map((cred) => (
                      <Badge key={cred} variant="outline" className="text-xs mr-1">
                        {cred}
                      </Badge>
                    ))}
                  </div>
                  <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    <Mail size={14} />
                    Napisz wiadomość
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <GraduationCap className="mx-auto mb-4 text-blue-600" size={48} />
          <h3 className="text-xl text-gray-900 mb-2">Dołącz do naszego zespołu</h3>
          <p className="text-gray-600 mb-4">
            Jesteś nauczycielem z certyfikatem Montessori lub chcesz się nim stać? Poszukujemy osób z pasją do edukacji.
          </p>
          <Link to="/praca">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Zobacz oferty pracy
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
