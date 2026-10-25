import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, serverUrl } from '../utils/supabaseClient'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { BookOpen, Bell, Info, Calendar, LogOut, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

/** Dane zalogowanego użytkownika (uczeń). */
interface User {
  name: string
  email: string
}

/** Aktualność szkolna opublikowana przez nauczyciela. */
interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
  createdBy: string
}

/** Zadanie domowe przypisane przez nauczyciela. */
interface Assignment {
  id: string
  title: string
  description: string
  dueDate: string
  subject: string
  createdAt: string
  createdBy: string
}

/** Informacja szkolna (np. terminy, organizacja). */
interface InfoItem {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  createdBy: string
}

/** Skrót nagłówka autoryzacji Bearer używany przy każdym żądaniu do API. */
const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` })

/**
 * Główna strona platformy edukacyjnej ucznia.
 *
 * Po wejściu na stronę komponent:
 *  1. Sprawdza aktywną sesję Supabase — brak sesji lub zła rola przekierowuje do logowania.
 *  2. Pobiera równolegle (Promise.all) aktualności, zadania i informacje z API serwera.
 *  3. Prezentuje dane w trzech zakładkach (Tabs).
 *  4. Przycisk "Wyloguj" kończy sesję i wraca na stronę główną.
 */
export function StudentPlatformPage() {
  const navigate = useNavigate()

  const [user, setUser]                   = useState<User | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [assignments, setAssignments]     = useState<Assignment[]>([])
  const [infos, setInfos]                 = useState<InfoItem[]>([])
  const [loading, setLoading]             = useState(true)
  const [loadError, setLoadError]         = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  /**
   * Weryfikuje sesję Supabase.
   * Jeśli sesja istnieje i rola = "student" — pobiera dane z API.
   * W przeciwnym razie przekierowuje do strony logowania.
   */
  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        navigate('/logowanie-ucznia')
        return
      }

      if (session.user.user_metadata?.role !== 'student') {
        await supabase.auth.signOut()
        navigate('/logowanie-ucznia')
        return
      }

      setUser({
        name: session.user.user_metadata?.name || session.user.email || '',
        email: session.user.email || '',
      })

      await loadData(session.access_token)
    } catch {
      navigate('/logowanie-ucznia')
    }
  }

  /**
   * Pobiera dane z trzech endpointów API równolegle.
   * Każde żądanie wymaga tokenu Bearer w nagłówku Authorization.
   * Wyniki zapisywane są w odpowiednich stanach komponentu.
   *
   * @param token - access_token z aktywnej sesji Supabase
   */
  const loadData = async (token: string) => {
    setLoading(true)
    setLoadError(false)
    try {
      const [annRes, assRes, infRes] = await Promise.all([
        fetch(`${serverUrl}/announcements`, { headers: authHeader(token) }),
        fetch(`${serverUrl}/assignments`,   { headers: authHeader(token) }),
        fetch(`${serverUrl}/info`,          { headers: authHeader(token) }),
      ])

      if (!annRes.ok || !assRes.ok || !infRes.ok) {
        throw new Error('One or more student data requests failed')
      }

      const [ann, ass, inf] = await Promise.all([
        annRes.json(),
        assRes.json(),
        infRes.json(),
      ])

      if (annRes.ok) setAnnouncements(ann.announcements || [])
      if (assRes.ok) setAssignments(ass.assignments || [])
      if (infRes.ok) setInfos(inf.infos || [])
    } catch (error) {
      console.error('Load student platform data error:', error)
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }

  /** Kończy sesję Supabase i wraca na stronę główną. */
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  /** Spinner ładowania wyświetlany wewnątrz zakładek. */
  const Spinner = () => (
    <div className="flex justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  )

  /** Karta wyświetlana gdy zakładka nie ma żadnych wpisów. */
  const Empty = ({ label }: { label: string }) => (
    <Card>
      <CardContent className="pt-8 pb-8 text-center text-gray-400">{label}</CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Platforma Ucznia</h1>
              <p className="text-sm text-gray-500">{user.name}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Wyloguj
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="announcements">
              <Bell className="w-4 h-4 mr-2" />
              Aktualności
            </TabsTrigger>
            <TabsTrigger value="assignments">
              <Calendar className="w-4 h-4 mr-2" />
              Zadania
            </TabsTrigger>
            <TabsTrigger value="info">
              <Info className="w-4 h-4 mr-2" />
              Informacje
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            {loading ? <Spinner /> : loadError ? <Empty label="Nie udało się wczytać danych. Odśwież stronę i spróbuj ponownie." /> : announcements.length === 0 ? <Empty label="Brak aktualności" /> : (
              <div className="space-y-4">
                {announcements.map((a) => (
                  <Card key={a.id} className="shadow-sm border-0">
                    <CardHeader>
                      <CardTitle className="text-base">{a.title}</CardTitle>
                      <CardDescription>
                        {a.createdBy} · {format(new Date(a.createdAt), 'PPP', { locale: pl })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-wrap text-sm">{a.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="assignments">
            {loading ? <Spinner /> : loadError ? <Empty label="Nie udało się wczytać danych. Odśwież stronę i spróbuj ponownie." /> : assignments.length === 0 ? <Empty label="Brak zadań" /> : (
              <div className="space-y-4">
                {assignments.map((a) => (
                  <Card key={a.id} className="shadow-sm border-0">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <CardTitle className="text-base">{a.title}</CardTitle>
                        <Badge variant="secondary">{a.subject}</Badge>
                      </div>
                      <CardDescription>
                        {a.createdBy} · Termin: {format(new Date(a.dueDate), 'PPP', { locale: pl })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-wrap text-sm">{a.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="info">
            {loading ? <Spinner /> : loadError ? <Empty label="Nie udało się wczytać danych. Odśwież stronę i spróbuj ponownie." /> : infos.length === 0 ? <Empty label="Brak informacji" /> : (
              <div className="space-y-4">
                {infos.map((item) => (
                  <Card key={item.id} className="shadow-sm border-0">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <CardDescription>
                        {item.createdBy} · {format(new Date(item.createdAt), 'PPP', { locale: pl })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-wrap text-sm">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
