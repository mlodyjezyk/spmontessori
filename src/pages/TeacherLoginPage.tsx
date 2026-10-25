import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { GraduationCap, AlertCircle } from 'lucide-react'

/** Strona logowania nauczyciela do panelu administracyjnego. */
export function TeacherLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  /**
   * Obsługuje wysłanie formularza logowania nauczyciela.
   * 1. Wywołuje supabase.auth.signInWithPassword.
   * 2. Weryfikuje rolę user_metadata.role === "teacher".
   * 3. Jeśli rola jest inna — wylogowuje i wyświetla błąd.
   * 4. Przy sukcesie — przekierowuje do /panel-nauczyciela.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError('Nieprawidłowy email lub hasło. Sprawdź dane i spróbuj ponownie.')
        return
      }

      if (data.user?.user_metadata?.role !== 'teacher') {
        await supabase.auth.signOut()
        setError('To konto nie ma uprawnień nauczyciela.')
        return
      }

      navigate('/panel-nauczyciela')
    } catch {
      setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-200">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Panel Nauczyciela</h1>
          <p className="text-gray-500 text-sm mt-1">Szkoła Montessori Konin — dostęp tylko dla nauczycieli</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Zaloguj się</CardTitle>
            <CardDescription>Wprowadź dane logowania do panelu</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nauczyciel@szkola.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl"
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
                  className="h-11 rounded-xl"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-purple-600 hover:bg-purple-700 rounded-xl mt-2"
                disabled={loading}
              >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Powrót na stronę główną
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-400 mt-6">
          Problemy z logowaniem?{' '}
          <a href="mailto:kontakt@odkrywcyswiata.pl" className="text-purple-500 hover:text-purple-700">
            Skontaktuj się z administratorem
          </a>
        </p>
      </div>
    </div>
  )
}
