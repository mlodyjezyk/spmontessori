import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { BookOpen, AlertCircle } from 'lucide-react'
import { signInToDemo } from '../utils/demoAccess'

/**
 * Strona logowania ucznia do platformy edukacyjnej.
 *
 * Formularz wysyła dane (email + hasło) do Supabase Auth.
 * Po poprawnym zalogowaniu sprawdzana jest rola użytkownika
 * zapisana w metadanych konta (user_metadata.role).
 * Jeśli rola nie jest "student", sesja jest natychmiast kończona.
 * W przypadku sukcesu następuje przekierowanie do /platforma-ucznia.
 */
export function StudentLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  /**
   * Obsługuje wysłanie formularza logowania.
   * 1. Wywołuje supabase.auth.signInWithPassword z podanymi danymi.
   * 2. Jeśli Supabase zwróci błąd — wyświetla komunikat.
   * 3. Sprawdza rolę zalogowanego użytkownika.
   * 4. Jeśli rola !== "student" — wylogowuje i wyświetla błąd.
   * 5. Jeśli wszystko OK — przekierowuje do platformy ucznia.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (signInToDemo('student', email, password)) {
        navigate('/platforma-ucznia')
        return
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError('Nieprawidłowy email lub hasło')
        return
      }

      if (data.user?.user_metadata?.role !== 'student') {
        await supabase.auth.signOut()
        setError('To konto nie jest kontem ucznia')
        return
      }

      navigate('/platforma-ucznia')
    } catch {
      setError('Wystąpił błąd podczas logowania')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Platforma dla Uczniów</CardTitle>
          <CardDescription>Zaloguj się do swojego konta</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                inputMode="email"
                placeholder="uczen@szkola.pl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </form>

          <div role="note" className="mt-5 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
            <p className="font-medium">Dostęp demonstracyjny — tylko przykładowe dane</p>
            <p className="mt-1">Email: <code>uczen@gmail</code> · Hasło: <code>haslo123</code></p>
            <p className="mt-1 text-xs">Logowanie demo jest lokalne w tej karcie przeglądarki. Nie używaj tych danych jako prawdziwego konta.</p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Powrót na stronę główną
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
