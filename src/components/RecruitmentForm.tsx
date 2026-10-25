import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { EMAIL_WITH_DOMAIN } from '../utils/formValidation'

export function RecruitmentForm() {
  const [demoComplete, setDemoComplete] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDemoComplete(true)
  }

  if (demoComplete) {
    return (
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="recruitment-title">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-8 sm:p-12 text-center">
            <CheckCircle2 className="mx-auto mb-4 text-green-600" size={64} aria-hidden="true" />
            <h1 id="recruitment-title" className="text-2xl text-gray-900 mb-3">
              Dziękujemy za przetestowanie formularza!
            </h1>
            <p className="text-gray-700 mb-2">
              To demonstracja — zgłoszenie nie zostało wysłane ani zapisane.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Żadne dane nie opuściły tej strony ani nie zostały zachowane.
            </p>
            <Button onClick={() => setDemoComplete(false)} variant="outline">
              Wróć do formularza
            </Button>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="recruitment-title">
      <div className="text-center mb-8">
        <h1 id="recruitment-title" className="text-3xl lg:text-4xl text-gray-900 mb-4">
          Formularz rekrutacyjny
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Wypełnij formularz demonstracyjny, aby zobaczyć jego działanie.
        </p>
      </div>

      <div role="note" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          <p>
            <strong>Tryb demonstracyjny.</strong> Dane nie są wysyłane ani zapisywane. Nie podawaj prawdziwych danych osobowych.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Dane dziecka</CardTitle></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="childFirstName">Imię dziecka *</Label>
              <Input id="childFirstName" name="childFirstName" minLength={2} required placeholder="np. Jan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childLastName">Nazwisko dziecka *</Label>
              <Input id="childLastName" name="childLastName" minLength={2} required placeholder="np. Kowalski" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Data urodzenia *</Label>
              <Input id="birthDate" name="birthDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Klasa *</Label>
              <select
                id="class"
                name="class"
                required
                defaultValue=""
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2"
              >
                <option value="" disabled>Wybierz klasę</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((classNumber) => (
                  <option key={classNumber} value={classNumber}>Klasa {classNumber}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Dane rodzica / opiekuna prawnego</CardTitle></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="parentFirstName">Imię rodzica *</Label>
              <Input id="parentFirstName" name="parentFirstName" minLength={2} required placeholder="np. Anna" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentLastName">Nazwisko rodzica *</Label>
              <Input id="parentLastName" name="parentLastName" minLength={2} required placeholder="np. Kowalska" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon kontaktowy *</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="+48 123 456 789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                pattern={EMAIL_WITH_DOMAIN}
                title="Wpisz adres w formacie imie@domena.pl"
                placeholder="email@przyklad.pl"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Adres zamieszkania *</Label>
              <Input id="address" name="address" required placeholder="ul. Przykładowa 1, 62-500 Konin" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" name="consent1" required className="mt-1" />
              <span>Wyrażam zgodę na przetwarzanie danych osobowych w celu przeprowadzenia procesu rekrutacji. *</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" name="consent2" required className="mt-1" />
              <span>Oświadczam, że zapoznałem/am się z zasadami rekrutacji i regulaminem szkoły. *</span>
            </label>
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" name="consent3" className="mt-1" />
              <span>Wyrażam zgodę na kontakt w sprawie rekrutacji.</span>
            </label>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          Wyślij zgłoszenie demonstracyjne
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-gray-500">
        Masz pytania? <Link to="/kontakt" className="text-blue-700 underline">Zobacz informacje o szkole</Link>.
      </p>
    </section>
  )
}
