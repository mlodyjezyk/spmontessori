import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { EMAIL_WITH_DOMAIN } from '../utils/formValidation';

export function Contact() {
  const [demoComplete, setDemoComplete] = useState(false);

  return (
    <section id="kontakt" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">Kontakt</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Masz pytania? Skontaktuj się z nami - chętnie odpowiemy na wszystkie Twoje wątpliwości.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-2 hover:border-blue-600 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Adres</h3>
              <p className="text-gray-600">ul. Zofii Urbanowskiej 9</p>
              <p className="text-gray-600">62-500 Konin</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-600 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Telefon</h3>
              <p className="text-gray-600">+48 724 139 955</p>
              <p className="text-gray-600">+48 739 030 388</p>
              <p className="text-gray-600 text-sm">pn-pt: 8:00-16:00</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-600 transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-blue-600" size={32} />
              </div>
              <h3 className="text-lg text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">rekrutacja@szkola-montessori.pl</p>
              <p className="text-gray-600">sekretariat@szkola-montessori.pl</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl text-gray-900 mb-6">Godziny otwarcia</h3>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Clock className="text-blue-600" size={24} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Poniedziałek - Piątek</span>
                        <span className="text-gray-900">7:00 - 17:00</span>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Sekretariat:</strong> 8:00 - 16:00
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Zajęcia lekcyjne:</strong> 8:00 - 14:00
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Świetlica:</strong> 7:00 - 17:00
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-gray-900 mb-2">Dojazd</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Komunikacja miejska:</strong> Autobusy linii 5, 12, 18 - przystanek "Urbanowskiej"
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Parking:</strong> Dostępny bezpłatny parking dla rodziców
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl text-gray-900 mb-6">Napisz do nas</h3>
            <Card>
              <CardContent className="p-6 space-y-4">
                {demoComplete ? (
                  <div role="status" className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
                    <p className="font-medium">Dziękujemy za przetestowanie formularza.</p>
                    <p className="mt-1 text-sm">Tryb demonstracyjny: wiadomość nie została wysłana ani zapisana.</p>
                    <Button type="button" variant="outline" className="mt-4" onClick={() => setDemoComplete(false)}>
                      Wróć do formularza
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-amber-900">
                      Tryb demonstracyjny — nie wpisuj prawdziwych danych. Formularz nie wysyła ani nie zapisuje wiadomości.
                    </p>
                    <form
                      className="space-y-4"
                      onSubmit={(event) => {
                        event.preventDefault();
                        setDemoComplete(true);
                      }}
                    >
                      <div>
                        <label htmlFor="contact-name" className="mb-2 block text-sm text-gray-700">Imię i nazwisko</label>
                        <Input id="contact-name" name="name" required minLength={2} placeholder="Jan Kowalski" />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-2 block text-sm text-gray-700">Email</label>
                        <Input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          pattern={EMAIL_WITH_DOMAIN}
                          title="Wpisz adres w formacie imie@domena.pl"
                          placeholder="jan@example.pl"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="mb-2 block text-sm text-gray-700">Telefon (opcjonalnie)</label>
                        <Input id="contact-phone" name="phone" type="tel" placeholder="+48 123 456 789" />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="mb-2 block text-sm text-gray-700">Wiadomość</label>
                        <Textarea id="contact-message" name="message" required minLength={3} placeholder="Twoja wiadomość..." rows={4} />
                      </div>
                      <Button type="submit" className="w-full">Wyślij wiadomość demonstracyjną</Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
