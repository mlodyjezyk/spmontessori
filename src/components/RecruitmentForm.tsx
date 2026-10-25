import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Info, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { EMAIL_WITH_DOMAIN } from '../utils/formValidation'

type ClassSuggestion =
  | { status: 'valid'; classNumber: number; message: string }
  | { status: 'invalid_date' | 'ineligible' | 'out_of_range'; message: string }

type FormErrors = Record<string, string>

const REQUIRED_ERROR = 'To pole jest wymagane.'
const FIELD_ORDER = [
  'childFirstName',
  'childLastName',
  'birthDate',
  'class',
  'parentFirstName',
  'parentLastName',
  'phone',
  'email',
  'address',
  'consent1',
  'consent2',
]

function getClassSuggestion(dateString: string): ClassSuggestion | null {
  if (!dateString) return null

  const dateParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString)
  if (!dateParts) {
    return {
      status: 'invalid_date',
      message: 'Nieprawidłowa data urodzenia. Wpisz poprawną datę.',
    }
  }

  const birthYear = Number(dateParts[1])
  const birthMonth = Number(dateParts[2])
  const birthDay = Number(dateParts[3])
  const lastDayOfMonth = new Date(Date.UTC(birthYear, birthMonth, 0)).getUTCDate()

  if (
    birthYear < 1900 ||
    birthMonth < 1 ||
    birthMonth > 12 ||
    birthDay < 1 ||
    birthDay > lastDayOfMonth
  ) {
    return {
      status: 'invalid_date',
      message: 'Dla dinozaurów programu nie przewidziano. Wpisz poprawną datę.',
    }
  }

  const today = new Date()
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')

  if (dateString > todayString) {
    return {
      status: 'invalid_date',
      message: 'Nienarodzonych, nie nauczymy. Wpisz poprawną datę.',
    }
  }

  const classNumber = 2027 - birthYear - 6

  if (classNumber <= 0) {
    return {
      status: 'ineligible',
      message: `Rocznik ${birthYear} nie kwalifikuje się do klas 1–8 w roku szkolnym 2027/2028.`,
    }
  }

  if (classNumber <= 8) {
    return {
      status: 'valid',
      classNumber,
      message: `Sugerowana klasa: Klasa ${classNumber} (rocznik ${birthYear})`,
    }
  }

  return {
    status: 'out_of_range',
    message: `Rocznik ${birthYear} jest poza zakresem klas 1–8`,
  }
}

export function RecruitmentForm() {
  const [demoComplete, setDemoComplete] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  const [classSuggestion, setClassSuggestion] = useState<ClassSuggestion | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const value = (name: string) => String(formData.get(name) ?? '').trim()
    const nextErrors: FormErrors = {}

    for (const name of FIELD_ORDER) {
      if (!value(name)) nextErrors[name] = REQUIRED_ERROR
    }

    for (const name of ['childFirstName', 'childLastName', 'parentFirstName', 'parentLastName']) {
      if (value(name) && value(name).length < 2) {
        nextErrors[name] = 'Wpisz co najmniej 2 znaki.'
      }
    }

    if (value('email') && !new RegExp(`^(?:${EMAIL_WITH_DOMAIN})$`).test(value('email'))) {
      nextErrors.email = 'Nieprawidłowy adres e-mail. Sprawdź jego format, np. imie@domena.pl.'
    }

    if (!formData.has('consent1')) {
      nextErrors.consent1 = 'Zaznacz zgodę wymaganą do udziału w rekrutacji.'
    }
    if (!formData.has('consent2')) {
      nextErrors.consent2 = 'Potwierdź zapoznanie się z zasadami rekrutacji.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name])
      if (firstInvalid) document.getElementById(firstInvalid)?.focus()
      return
    }

    setDemoComplete(true)
  }

  const clearError = (name: string) => {
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleBirthDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearError('birthDate')
    const suggestion = getClassSuggestion(event.target.value)
    setClassSuggestion(suggestion)
    if (suggestion?.status === 'valid') {
      setSelectedClass(String(suggestion.classNumber))
      clearError('class')
    } else {
      setSelectedClass('')
    }
  }

  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? (
      <p id={`${name}-error`} className="flex items-start gap-2 text-sm font-medium text-red-700" role="alert">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{errors[name]}</span>
      </p>
    ) : null

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

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <Card>
          <CardHeader><CardTitle>Dane dziecka</CardTitle></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="childFirstName">Imię dziecka *</Label>
              <Input id="childFirstName" name="childFirstName" minLength={2} required placeholder="np. Jan"
                aria-invalid={!!errors.childFirstName} aria-describedby={errors.childFirstName ? 'childFirstName-error' : undefined}
                className={errors.childFirstName ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('childFirstName')} />
              <FieldError name="childFirstName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childLastName">Nazwisko dziecka *</Label>
              <Input id="childLastName" name="childLastName" minLength={2} required placeholder="np. Kowalski"
                aria-invalid={!!errors.childLastName} aria-describedby={errors.childLastName ? 'childLastName-error' : undefined}
                className={errors.childLastName ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('childLastName')} />
              <FieldError name="childLastName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Data urodzenia *</Label>
              <Input id="birthDate" name="birthDate" type="date" required onChange={handleBirthDateChange}
                aria-invalid={!!errors.birthDate} aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
                className={errors.birthDate ? 'border-red-500 focus-visible:ring-red-500' : undefined} />
              <FieldError name="birthDate" />
              {classSuggestion && (
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                    classSuggestion.status === 'valid'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : classSuggestion.status === 'ineligible'
                        ? 'border-amber-200 bg-amber-50 text-amber-800'
                        : classSuggestion.status === 'invalid_date'
                          ? 'border-red-200 bg-red-50 text-red-800'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-700'
                  }`}
                  role={classSuggestion.status === 'invalid_date' ? 'alert' : 'status'}
                >
                  {classSuggestion.status === 'valid' ? (
                    <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  ) : classSuggestion.status === 'ineligible' ? (
                    <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  )}
                  <span>{classSuggestion.message}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Klasa *</Label>
              <select
                id="class"
                name="class"
                required
                value={selectedClass}
                onChange={(event) => {
                  setSelectedClass(event.target.value)
                  clearError('class')
                }}
                aria-invalid={!!errors.class}
                aria-describedby={errors.class ? 'class-error' : undefined}
                className={`w-full rounded-md border bg-white px-3 py-2 ${errors.class ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="" disabled>Wybierz klasę</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((classNumber) => {
                  const isSuggested =
                    classSuggestion?.status === 'valid' && classSuggestion.classNumber === classNumber

                  return (
                    <option key={classNumber} value={classNumber}>
                      Klasa {classNumber}{isSuggested ? ' (sugerowana)' : ''}
                    </option>
                  )
                })}
              </select>
              <FieldError name="class" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Dane rodzica / opiekuna prawnego</CardTitle></CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="parentFirstName">Imię rodzica *</Label>
              <Input id="parentFirstName" name="parentFirstName" minLength={2} required placeholder="np. Anna"
                aria-invalid={!!errors.parentFirstName} aria-describedby={errors.parentFirstName ? 'parentFirstName-error' : undefined}
                className={errors.parentFirstName ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('parentFirstName')} />
              <FieldError name="parentFirstName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentLastName">Nazwisko rodzica *</Label>
              <Input id="parentLastName" name="parentLastName" minLength={2} required placeholder="np. Kowalska"
                aria-invalid={!!errors.parentLastName} aria-describedby={errors.parentLastName ? 'parentLastName-error' : undefined}
                className={errors.parentLastName ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('parentLastName')} />
              <FieldError name="parentLastName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon kontaktowy *</Label>
              <Input id="phone" name="phone" type="tel" required placeholder="+48 123 456 789"
                aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={errors.phone ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('phone')} />
              <FieldError name="phone" />
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
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('email')}
              />
              <FieldError name="email" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Adres zamieszkania *</Label>
              <Input id="address" name="address" required placeholder="ul. Przykładowa 1, 62-500 Konin"
                aria-invalid={!!errors.address} aria-describedby={errors.address ? 'address-error' : undefined}
                className={errors.address ? 'border-red-500 focus-visible:ring-red-500' : undefined}
                onChange={() => clearError('address')} />
              <FieldError name="address" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-6">
            <label className={`flex items-start gap-3 text-sm ${errors.consent1 ? 'text-red-800' : 'text-gray-700'}`}>
              <input type="checkbox" name="consent1" required className="mt-1" aria-invalid={!!errors.consent1}
                aria-describedby={errors.consent1 ? 'consent1-error' : undefined} onChange={() => clearError('consent1')} />
              <span>Wyrażam zgodę na przetwarzanie danych osobowych w celu przeprowadzenia procesu rekrutacji. *</span>
            </label>
            <FieldError name="consent1" />
            <label className={`flex items-start gap-3 text-sm ${errors.consent2 ? 'text-red-800' : 'text-gray-700'}`}>
              <input type="checkbox" name="consent2" required className="mt-1" aria-invalid={!!errors.consent2}
                aria-describedby={errors.consent2 ? 'consent2-error' : undefined} onChange={() => clearError('consent2')} />
              <span>Oświadczam, że zapoznałem/am się z zasadami rekrutacji i regulaminem szkoły. *</span>
            </label>
            <FieldError name="consent2" />
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
