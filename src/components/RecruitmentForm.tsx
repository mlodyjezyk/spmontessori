import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { CheckCircle2 } from 'lucide-react'

type ErrorMap = Record<string, string>

const FIELD_ORDER = [
  'childFirstName', 'childLastName', 'birthDate', 'pesel', 'class',
  'parentFirstName', 'parentLastName', 'phone', 'email', 'address',
  'consent1', 'consent2',
]

const REQUIRED = 'Pole wymaga wypełnienia'

export function RecruitmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ErrorMap>({})

  const getVal = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null
    if (!el) return ''
    if ((el as HTMLInputElement).type === 'checkbox') return (el as HTMLInputElement).checked ? 'on' : ''
    return el.value ?? ''
  }

  const validate = (): ErrorMap => {
    const e: ErrorMap = {}
    if (!getVal('childFirstName').trim()) e.childFirstName = REQUIRED
    if (!getVal('childLastName').trim())  e.childLastName  = REQUIRED
    if (!getVal('birthDate').trim())      e.birthDate      = REQUIRED
    if (!getVal('pesel').trim())          e.pesel          = REQUIRED
    if (!getVal('class').trim())          e.class          = 'Wybierz klasę'
    if (!getVal('parentFirstName').trim()) e.parentFirstName = REQUIRED
    if (!getVal('parentLastName').trim())  e.parentLastName  = REQUIRED
    if (!getVal('phone').trim())          e.phone          = REQUIRED
    if (!getVal('email').trim())          e.email          = REQUIRED
    if (!getVal('address').trim())        e.address        = REQUIRED
    if (!getVal('consent1'))              e.consent1       = 'Zgoda jest wymagana'
    if (!getVal('consent2'))              e.consent2       = 'Potwierdź zapoznanie się z regulaminem'
    return e
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
    setErrors((prev) => { const c = { ...prev }; delete c[id]; return c })
    document.getElementById(id)?.removeAttribute('data-error')
  }

  const FieldError = ({ id }: { id: string }) =>
    errors[id] ? (
      <div id={`${id}-error`} role="alert" className="error-tooltip">
        <strong>!</strong> {errors[id]}
      </div>
    ) : null

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-12 text-center">
              <CheckCircle2 className="mx-auto mb-4 text-green-600" size={64} />
              <h3 className="text-2xl text-gray-900 mb-4">Formularz został wysłany!</h3>
              <p className="text-gray-600 mb-6">Dziękujemy za zgłoszenie. Skontaktujemy się z Państwem w ciągu 2–3 dni roboczych.</p>
              <Button onClick={() => setSubmitted(false)} variant="outline">Wyślij kolejne zgłoszenie</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="rekrutacja" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Formularz rekrutacyjny</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wypełnij formularz, aby zapisać dziecko do naszej szkoły na rok szkolny 2026/2027
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Dane dziecka</CardTitle></CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <Label htmlFor="childFirstName">Imię dziecka *</Label>
                  <Input id="childFirstName" placeholder="np. Jan"
                    onChange={() => clearError('childFirstName')}
                    aria-invalid={!!errors.childFirstName}
                    aria-describedby={errors.childFirstName ? 'childFirstName-error' : undefined} />
                  <FieldError id="childFirstName" />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="childLastName">Nazwisko dziecka *</Label>
                  <Input id="childLastName" placeholder="np. Kowalski"
                    onChange={() => clearError('childLastName')}
                    aria-invalid={!!errors.childLastName}
                    aria-describedby={errors.childLastName ? 'childLastName-error' : undefined} />
                  <FieldError id="childLastName" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="birthDate">Data urodzenia *</Label>
                  <Input id="birthDate" type="date"
                    onChange={() => clearError('birthDate')}
                    aria-invalid={!!errors.birthDate}
                    aria-describedby={errors.birthDate ? 'birthDate-error' : undefined} />
                  <FieldError id="birthDate" />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="pesel">PESEL dziecka *</Label>
                  <Input id="pesel" placeholder="12345678901" maxLength={11}
                    onChange={() => clearError('pesel')}
                    aria-invalid={!!errors.pesel}
                    aria-describedby={errors.pesel ? 'pesel-error' : undefined} />
                  <FieldError id="pesel" />
                </div>
              </div>

              <div className="space-y-2 mt-6 relative">
                <Label htmlFor="class">Klasa, do której zgłaszasz dziecko *</Label>
                <select
                  id="class"
                  required
                  onChange={() => clearError('class')}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${errors.class ? 'border-red-600' : ''}`}
                  aria-invalid={!!errors.class}
                  aria-describedby={errors.class ? 'class-error' : undefined}
                >
                  <option value="">Wybierz klasę</option>
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={String(n)}>Klasa {n}</option>
                  ))}
                </select>
                <FieldError id="class" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Dane rodzica / opiekuna prawnego</CardTitle></CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <Label htmlFor="parentFirstName">Imię rodzica *</Label>
                  <Input id="parentFirstName" placeholder="np. Anna"
                    onChange={() => clearError('parentFirstName')}
                    aria-invalid={!!errors.parentFirstName}
                    aria-describedby={errors.parentFirstName ? 'parentFirstName-error' : undefined} />
                  <FieldError id="parentFirstName" />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="parentLastName">Nazwisko rodzica *</Label>
                  <Input id="parentLastName" placeholder="np. Kowalska"
                    onChange={() => clearError('parentLastName')}
                    aria-invalid={!!errors.parentLastName}
                    aria-describedby={errors.parentLastName ? 'parentLastName-error' : undefined} />
                  <FieldError id="parentLastName" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2 relative">
                  <Label htmlFor="phone">Telefon kontaktowy *</Label>
                  <Input id="phone" type="tel" placeholder="+48 123 456 789"
                    onChange={() => clearError('phone')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined} />
                  <FieldError id="phone" />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="email@przyklad.pl"
                    onChange={() => clearError('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined} />
                  <FieldError id="email" />
                </div>
              </div>

              <div className="space-y-2 mt-6 relative">
                <Label htmlFor="address">Adres zamieszkania *</Label>
                <Input id="address" placeholder="ul. Przykładowa 1, 62-500 Konin"
                  onChange={() => clearError('address')}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? 'address-error' : undefined} />
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
                  <Checkbox id={id} />
                  <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">{text}</label>
                </div>
                {errors[id] && (
                  <div role="alert" className="error-tooltip-inline"><strong>!</strong> {errors[id]}</div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="submit" className="flex-1" size="lg">Wyślij zgłoszenie</Button>
            <Button type="button" variant="outline" className="flex-1" size="lg">Zapisz jako szkic</Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            * Pola wymagane. Po wysłaniu formularza skontaktujemy się z Państwem w celu umówienia spotkania.
          </p>
        </form>
      </div>
    </section>
  )
}
