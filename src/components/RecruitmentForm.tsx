import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { CheckCircle2, Sparkles, AlertCircle, Info } from 'lucide-react'

type ErrorMap = Record<string, string>

type SuggestionStatus = 'valid' | 'preschool' | 'out_of_range'

interface SuggestionResult {
  status: SuggestionStatus
  classNum?: string
  message: string
}

const FIELD_ORDER = [
  'childFirstName', 'childLastName', 'birthDate', 'pesel', 'class',
  'parentFirstName', 'parentLastName', 'phone', 'email', 'address',
  'consent1', 'consent2',
]

const REQUIRED = 'Pole wymaga wypełnienia'
const NAME_MIN_LENGTH = 2
const EMAIL_WITH_DOMAIN = /^[^\s@]+@(?:[^\s.@]+\.)+[^\s.@]{2,}$/

function validateName(value: string): string | null {
  if (!value.trim()) return REQUIRED
  if (value.trim().length < NAME_MIN_LENGTH) return 'Wpisz co najmniej 2 znaki'
  return null
}

function getSuggestedClass(dateString: string): SuggestionResult | null {
  if (!dateString) return null
  const birthYear = new Date(dateString).getFullYear()
  if (isNaN(birthYear)) return null

  // Rok szkolny 2026/2027: 7-latki (rocznik 2019) -> Klasa 1
  const classNum = 2026 - birthYear - 6

  if (classNum <= 0) {
    return {
      status: 'preschool',
      message: `Wiek przedszkolny / zerówka (rocznik ${birthYear})`
    }
  }

  if (classNum >= 1 && classNum <= 8) {
    return {
      status: 'valid',
      classNum: String(classNum),
      message: `Sugerowana klasa: Klasa ${classNum} (rocznik ${birthYear})`
    }
  }

  return {
    status: 'out_of_range',
    message: `Rocznik ${birthYear} jest poza zakresem klas 1–8`
  }
}

export function RecruitmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ErrorMap>({})
  const [selectedClass, setSelectedClass] = useState('')
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null)

  const getVal = (id: string) => {
    if (id === 'class') return selectedClass
    const el = document.getElementById(id)
    if (!el) return ''
    if (el.getAttribute('role') === 'checkbox') {
      return el.getAttribute('aria-checked') === 'true' ? 'on' : ''
    }
    if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      return el.checked ? 'on' : ''
    }
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
      return el.value
    }
    return ''
  }

  const validate = (): ErrorMap => {
    const e: ErrorMap = {}
    const childFirstNameError = validateName(getVal('childFirstName'))
    if (childFirstNameError) e.childFirstName = childFirstNameError
    const childLastNameError = validateName(getVal('childLastName'))
    if (childLastNameError) e.childLastName = childLastNameError
    if (!getVal('birthDate').trim()) e.birthDate = REQUIRED
    if (!getVal('pesel').trim()) e.pesel = REQUIRED
    if (!getVal('class').trim()) e.class = 'Wybierz klasę'
    const parentFirstNameError = validateName(getVal('parentFirstName'))
    if (parentFirstNameError) e.parentFirstName = parentFirstNameError
    const parentLastNameError = validateName(getVal('parentLastName'))
    if (parentLastNameError) e.parentLastName = parentLastNameError
    if (!getVal('phone').trim()) e.phone = REQUIRED
    const email = getVal('email').trim()
    if (!email) e.email = REQUIRED
    else if (!EMAIL_WITH_DOMAIN.test(email)) e.email = 'Wpisz poprawny adres, np. imie@domena.pl'
    if (!getVal('address').trim()) e.address = REQUIRED
    if (!getVal('consent1')) e.consent1 = 'Zgoda jest wymagana'
    if (!getVal('consent2')) e.consent2 = 'Potwierdź zapoznanie się z regulaminem'
    return e
  }

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError('birthDate')
    const val = e.target.value
    const res = getSuggestedClass(val)
    setSuggestion(res)

    if (res?.status === 'valid' && res.classNum) {
      setSelectedClass(res.classNum)
      clearError('class')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const firstKey = FIELD_ORDER.find((k) => newErrors[k])
      if (firstKey) {
        const el = document.getElementById(firstKey)
        if (el) {
          el.setAttribute('data-error', 'true')
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          setTimeout(() => (el as HTMLElement).focus?.(), 300)
        }
      }
      return
    }

    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const clearError = (id: string) => {
    if (!errors[id]) return
    setErrors((prev) => {
      const c = { ...prev }
      delete c[id]
      return c
    })
    document.getElementById(id)?.removeAttribute('data-error')
  }

  const FieldError = ({ id }: { id: string }) =>
    errors[id] ? (
      <div id={`${id}-error`} role="alert" className="error-tooltip-inline">
        <strong>! {errors[id]}</strong>
      </div>
    ) : null

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-12 text-center">
            <CheckCircle2 className="mx-auto mb-4 text-green-600" size={64} />
            <h3 className="text-2xl text-gray-900 mb-4">Formularz został wysłany!</h3>
            <p className="text-gray-600 mb-6">
              Dziękujemy za zgłoszenie. Skontaktujemy się z Państwem w ciągu 2–3 dni roboczych.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Wyślij kolejne zgłoszenie
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Formularz rekrutacyjny</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Wypełnij formularz, aby zapisać dziecko do naszej szkoły na rok szkolny 2026/2027
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dane dziecka</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <Label htmlFor="childFirstName">Imię dziecka *</Label>
                <Input
                  id="childFirstName"
                  placeholder="np. Jan"
                  minLength={NAME_MIN_LENGTH}
                  required
                  onChange={() => clearError('childFirstName')}
                  aria-invalid={!!errors.childFirstName}
                  aria-describedby={errors.childFirstName ? 'childFirstName-error' : undefined}
                />
                <FieldError id="childFirstName" />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="childLastName">Nazwisko dziecka *</Label>
                <Input
                  id="childLastName"
                  placeholder="np. Kowalski"
                  minLength={NAME_MIN_LENGTH}
                  required
                  onChange={() => clearError('childLastName')}
                  aria-invalid={!!errors.childLastName}
                  aria-describedby={errors.childLastName ? 'childLastName-error' : undefined}
                />
                <FieldError id="childLastName" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2 relative">
                <Label htmlFor="birthDate">Data urodzenia *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  onChange={handleBirthDateChange}
                  aria-invalid={!!errors.birthDate}
                  aria-describedby={errors.birthDate ? 'birthDate-error' : undefined}
                />
                <FieldError id="birthDate" />

                {suggestion && (
                  <div className="pt-1.5 transition-all duration-200">
                    {suggestion.status === 'valid' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{suggestion.message}</span>
                      </div>
                    )}
                    {suggestion.status === 'preschool' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70">
                        <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{suggestion.message}</span>
                      </div>
                    )}
                    {suggestion.status === 'out_of_range' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                        <AlertCircle className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                        <span>{suggestion.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="pesel">PESEL dziecka *</Label>
                <Input
                  id="pesel"
                  placeholder="12345678901"
                  maxLength={11}
                  onChange={() => clearError('pesel')}
                  aria-invalid={!!errors.pesel}
                  aria-describedby={errors.pesel ? 'pesel-error' : undefined}
                />
                <FieldError id="pesel" />
              </div>
            </div>

            <div className="space-y-2 mt-6 relative">
              <Label htmlFor="class">Klasa, do której zgłaszasz dziecko *</Label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value)
                  clearError('class')
                }}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.class ? 'border-red-600' : ''}`}
                aria-invalid={!!errors.class}
                aria-describedby={errors.class ? 'class-error' : undefined}
              >
                <option value="">Wybierz klasę</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={String(n)}>Klasa {n}</option>
                ))}
              </select>
              <FieldError id="class" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dane rodzica / opiekuna prawnego</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <Label htmlFor="parentFirstName">Imię rodzica *</Label>
                <Input
                  id="parentFirstName"
                  placeholder="np. Anna"
                  minLength={NAME_MIN_LENGTH}
                  required
                  onChange={() => clearError('parentFirstName')}
                  aria-invalid={!!errors.parentFirstName}
                  aria-describedby={errors.parentFirstName ? 'parentFirstName-error' : undefined}
                />
                <FieldError id="parentFirstName" />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="parentLastName">Nazwisko rodzica *</Label>
                <Input
                  id="parentLastName"
                  placeholder="np. Kowalska"
                  minLength={NAME_MIN_LENGTH}
                  required
                  onChange={() => clearError('parentLastName')}
                  aria-invalid={!!errors.parentLastName}
                  aria-describedby={errors.parentLastName ? 'parentLastName-error' : undefined}
                />
                <FieldError id="parentLastName" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2 relative">
                <Label htmlFor="phone">Telefon kontaktowy *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+48 123 456 789"
                  onChange={() => clearError('phone')}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                <FieldError id="phone" />
              </div>

              <div className="space-y-2 relative">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@przyklad.pl"
                  required
                  onChange={() => clearError('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <FieldError id="email" />
              </div>
            </div>

            <div className="space-y-2 mt-6 relative">
              <Label htmlFor="address">Adres zamieszkania *</Label>
              <Input
                id="address"
                placeholder="ul. Przykładowa 1, 62-500 Konin"
                onChange={() => clearError('address')}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              <FieldError id="address" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 pt-4">
          {[
            { id: 'consent1', text: 'Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z RODO w celu przeprowadzenia procesu rekrutacji *' },
            { id: 'consent2', text: 'Oświadczam, że zapoznałem/am się z zasadami rekrutacji i regulaminem szkoły *' },
            { id: 'consent3', text: 'Wyrażam zgodę na kontakt mailowy i telefoniczny w sprawie rekrutacji' },
          ].map(({ id, text }) => (
            <div key={id}>
              <div className="flex items-start gap-3">
                <Checkbox id={id} onCheckedChange={() => clearError(id)} />
                <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">{text}</label>
              </div>
              {errors[id] && (
                <div role="alert" className="error-tooltip-inline">
                  <strong>! {errors[id]}</strong>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button type="submit" className="flex-1" size="lg">Wyślij zgłoszenie</Button>
          <Button type="button" variant="outline" className="flex-1" size="lg">Zapisz jako szkic</Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          * - Pola wymagane. Po wysłaniu formularza skontaktujemy się z Państwem w celu umówienia spotkania
        </p>
      </form>
    </div>
  )
}
