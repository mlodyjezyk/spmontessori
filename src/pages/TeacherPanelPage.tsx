import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, serverUrl } from '../utils/supabaseClient'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import {
  GraduationCap, Bell, Info, Calendar, LogOut,
  Loader2, Plus, Trash2, Users, FileText, Upload, Download,
} from 'lucide-react'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { toast } from 'sonner'

/** Dane zalogowanego nauczyciela. */
interface User { name: string; email: string }

/** Aktualność szkolna (ogłoszenie dla uczniów). */
interface Announcement {
  id: string; title: string; content: string; createdAt: string; createdBy: string
}

/** Zadanie domowe przypisane do konkretnego przedmiotu. */
interface Assignment {
  id: string; title: string; description: string
  dueDate: string; subject: string; createdAt: string; createdBy: string
}

/** Informacja organizacyjna (np. terminy, zmiany planu). */
interface InfoItem {
  id: string; title: string; content: string
  category: string; createdAt: string; createdBy: string
}

/** Dokument wgrany przez nauczyciela, widoczny w sekcji "Dla Rodziców". */
interface SchoolDocument {
  id: string; name: string; description: string; category: string
  fileName: string; fileType: string; fileSize: number
  createdAt: string; createdBy: string; downloadUrl: string | null
}

const DOCUMENT_CATEGORIES = ['Dokumenty szkolne', 'Dla rodziców', 'Rok szkolny', 'Formularze', 'Inne']

/** Formatuje rozmiar pliku z bajtów do czytelnej postaci (B / KB / MB). */
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Skrót nagłówka autoryzacji używany przy każdym żądaniu do API. */
const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` })

/**
 * Panel administracyjny nauczyciela.
 *
 * Dostępne zakładki:
 *  - Aktualności  — publikowanie ogłoszeń widocznych dla uczniów
 *  - Zadania      — przypisywanie zadań domowych z terminem
 *  - Informacje   — ogólne informacje organizacyjne (np. wycieczki, zmiany)
 *  - Dokumenty    — wgrywanie plików PDF/DOC widocznych w sekcji "Dla Rodziców"
 *  - Użytkownicy  — tworzenie nowych kont uczniów i nauczycieli
 *
 * Wszystkie zapytania do API wymagają tokenu Bearer z sesji Supabase.
 * Dodawanie i usuwanie każdego zasobu odświeża lokalny stan bez przeładowania strony.
 */
export function TeacherPanelPage() {
  const navigate = useNavigate()

  const [user, setUser]                   = useState<User | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [assignments, setAssignments]     = useState<Assignment[]>([])
  const [infos, setInfos]                 = useState<InfoItem[]>([])
  const [documents, setDocuments]         = useState<SchoolDocument[]>([])
  const [loading, setLoading]             = useState(true)
  const [docsLoading, setDocsLoading]     = useState(false)
  const [accessToken, setAccessToken]     = useState('')

  const [announcementOpen, setAnnouncementOpen] = useState(false)
  const [assignmentOpen, setAssignmentOpen]     = useState(false)
  const [infoOpen, setInfoOpen]                 = useState(false)
  const [userOpen, setUserOpen]                 = useState(false)
  const [docOpen, setDocOpen]                   = useState(false)

  const [announcementForm, setAnnouncementForm] = useState({ title: '', content: '' })
  const [assignmentForm, setAssignmentForm]     = useState({ title: '', description: '', dueDate: '', subject: '' })
  const [infoForm, setInfoForm]                 = useState({ title: '', content: '', category: '' })
  const [userForm, setUserForm]                 = useState({ email: '', password: '', name: '', role: 'student' })
  const [docForm, setDocForm]                   = useState({ name: '', description: '', category: 'Dokumenty szkolne' })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadingDoc, setUploadingDoc] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { checkAuth() }, [])

  /**
   * Weryfikuje sesję Supabase przy wejściu na stronę.
   * Wymaga roli "teacher" — inne role są wylogowywane i przekierowywane.
   */
  const checkAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) { navigate('/logowanie-nauczyciela'); return }
      if (session.user.user_metadata?.role !== 'teacher') {
        await supabase.auth.signOut()
        navigate('/logowanie-nauczyciela')
        return
      }
      setAccessToken(session.access_token)
      setUser({ name: session.user.user_metadata?.name || session.user.email || '', email: session.user.email || '' })
      await loadData(session.access_token)
    } catch {
      navigate('/logowanie-nauczyciela')
    }
  }

  /**
   * Pobiera równolegle aktualności, zadania i informacje z API.
   * Dokumenty ładowane są osobno (loadDocuments) — tylko gdy nauczyciel
   * przejdzie do zakładki Dokumenty, żeby nie obciążać startu.
   *
   * @param token - access_token z sesji Supabase
   */
  const loadData = async (token: string) => {
    setLoading(true)
    try {
      const [annRes, assRes, infRes] = await Promise.all([
        fetch(`${serverUrl}/announcements`, { headers: authHeader(token) }),
        fetch(`${serverUrl}/assignments`,   { headers: authHeader(token) }),
        fetch(`${serverUrl}/info`,          { headers: authHeader(token) }),
      ])
      const [ann, ass, inf] = await Promise.all([annRes.json(), assRes.json(), infRes.json()])
      if (annRes.ok) setAnnouncements(ann.announcements || [])
      if (assRes.ok) setAssignments(ass.assignments || [])
      if (infRes.ok) setInfos(inf.infos || [])
    } catch {
      toast.error('Nie udało się wczytać danych')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Ładuje listę dokumentów — wywoływane gdy nauczyciel klika zakładkę "Dokumenty".
   * Endpoint /documents jest publiczny (bez tokenu), bo rodzice też pobierają pliki.
   */
  const loadDocuments = async () => {
    setDocsLoading(true)
    try {
      const res = await fetch(`${serverUrl}/documents`)
      const data = await res.json()
      if (res.ok) setDocuments(data.documents || [])
    } catch {
      toast.error('Nie udało się wczytać dokumentów')
    } finally {
      setDocsLoading(false)
    }
  }

  /** Kończy sesję Supabase i wraca na stronę główną. */
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  /**
   * Wysyła nową aktualność do API (POST /announcements).
   * Po sukcesie zamyka dialog, resetuje formularz i odświeża listę.
   */
  const handleCreateAnnouncement = async () => {
    try {
      const res = await fetch(`${serverUrl}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(accessToken) },
        body: JSON.stringify(announcementForm),
      })
      if (res.ok) {
        toast.success('Aktualność została dodana')
        setAnnouncementOpen(false)
        setAnnouncementForm({ title: '', content: '' })
        await loadData(accessToken)
      } else {
        const d = await res.json()
        toast.error(d.error || 'Wystąpił błąd')
      }
    } catch {
      toast.error('Wystąpił błąd')
    }
  }

  /**
   * Usuwa aktualność o podanym id (DELETE /announcements/:id).
   * Po sukcesie odświeża listę.
   *
   * @param id - identyfikator aktualności do usunięcia
   */
  const handleDeleteAnnouncement = async (id: string) => {
    try {
      const res = await fetch(`${serverUrl}/announcements/${id}`, {
        method: 'DELETE',
        headers: authHeader(accessToken),
      })
      if (res.ok) {
        toast.success('Aktualność została usunięta')
        await loadData(accessToken)
      } else {
        toast.error('Wystąpił błąd')
      }
    } catch {
      toast.error('Wystąpił błąd')
    }
  }

  /**
   * Wysyła nowe zadanie domowe do API (POST /assignments).
   * Formularz zawiera: tytuł, przedmiot, datę terminu i opis.
   */
  const handleCreateAssignment = async () => {
    try {
      const res = await fetch(`${serverUrl}/assignments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(accessToken) },
        body: JSON.stringify(assignmentForm),
      })
      if (res.ok) {
        toast.success('Zadanie zostało dodane')
        setAssignmentOpen(false)
        setAssignmentForm({ title: '', description: '', dueDate: '', subject: '' })
        await loadData(accessToken)
      } else {
        const d = await res.json()
        toast.error(d.error || 'Wystąpił błąd')
      }
    } catch {
      toast.error('Wystąpił błąd')
    }
  }

  /**
   * Usuwa zadanie o podanym id (DELETE /assignments/:id).
   *
   * @param id - identyfikator zadania do usunięcia
   */
  const handleDeleteAssignment = async (id: string) => {
    try {
      const res = await fetch(`${serverUrl}/assignments/${id}`, {
        method: 'DELETE', headers: authHeader(accessToken),
      })
      if (res.ok) { toast.success('Zadanie zostało usunięte'); await loadData(accessToken) }
      else toast.error('Wystąpił błąd')
    } catch { toast.error('Wystąpił błąd') }
  }

  /**
   * Wysyła nową informację organizacyjną do API (POST /info).
   * Informacja zawiera tytuł, kategorię i treść.
   */
  const handleCreateInfo = async () => {
    try {
      const res = await fetch(`${serverUrl}/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(accessToken) },
        body: JSON.stringify(infoForm),
      })
      if (res.ok) {
        toast.success('Informacja została dodana')
        setInfoOpen(false)
        setInfoForm({ title: '', content: '', category: '' })
        await loadData(accessToken)
      } else {
        const d = await res.json()
        toast.error(d.error || 'Wystąpił błąd')
      }
    } catch { toast.error('Wystąpił błąd') }
  }

  /**
   * Usuwa informację o podanym id (DELETE /info/:id).
   *
   * @param id - identyfikator informacji do usunięcia
   */
  const handleDeleteInfo = async (id: string) => {
    try {
      const res = await fetch(`${serverUrl}/info/${id}`, {
        method: 'DELETE', headers: authHeader(accessToken),
      })
      if (res.ok) { toast.success('Informacja została usunięta'); await loadData(accessToken) }
      else toast.error('Wystąpił błąd')
    } catch { toast.error('Wystąpił błąd') }
  }

  /**
   * Tworzy nowe konto ucznia lub nauczyciela (POST /admin/users).
   * Endpoint dostępny tylko dla zalogowanych nauczycieli.
   * Rola konta ustawiana jest w polu "role" formularza.
   */
  const handleCreateUser = async () => {
    try {
      const res = await fetch(`${serverUrl}/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(accessToken) },
        body: JSON.stringify(userForm),
      })
      if (res.ok) {
        toast.success('Użytkownik został utworzony')
        setUserOpen(false)
        setUserForm({ email: '', password: '', name: '', role: 'student' })
      } else {
        const d = await res.json()
        toast.error(d.error || 'Wystąpił błąd')
      }
    } catch { toast.error('Wystąpił błąd') }
  }

  /**
   * Wgrywa dokument na serwer (POST /documents).
   *
   * Plik jest konwertowany do base64 przez FileReader, a następnie
   * wysyłany jako JSON razem z metadanymi (nazwa, kategoria, opis).
   * Serwer zapisuje plik w Supabase Storage i zwraca URL pobierania.
   *
   * Dokument po wgraniu jest widoczny publicznie w sekcji "Dla Rodziców".
   */
  const handleUploadDocument = async () => {
    if (!selectedFile) { toast.error('Wybierz plik do wgrania'); return }
    if (!docForm.name.trim()) { toast.error('Podaj nazwę dokumentu'); return }

    setUploadingDoc(true)
    try {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const fileBase64 = e.target?.result as string
          const res = await fetch(`${serverUrl}/documents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader(accessToken) },
            body: JSON.stringify({
              name: docForm.name,
              description: docForm.description,
              category: docForm.category,
              fileBase64,
              fileName: selectedFile.name,
              fileType: selectedFile.type || 'application/octet-stream',
            }),
          })
          const data = await res.json()
          if (res.ok) {
            toast.success('Dokument został wgrany')
            setDocOpen(false)
            setDocForm({ name: '', description: '', category: 'Dokumenty szkolne' })
            setSelectedFile(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
            await loadDocuments()
          } else {
            toast.error(data.error || 'Błąd podczas wgrywania dokumentu')
          }
        } catch {
          toast.error('Błąd podczas wgrywania dokumentu')
        } finally {
          setUploadingDoc(false)
        }
      }
      reader.readAsDataURL(selectedFile)
    } catch {
      toast.error('Błąd podczas odczytu pliku')
      setUploadingDoc(false)
    }
  }

  /**
   * Usuwa dokument o podanym id (DELETE /documents/:id).
   * Serwer usuwa plik zarówno z bazy danych jak i Supabase Storage.
   *
   * @param id - identyfikator dokumentu do usunięcia
   */
  const handleDeleteDocument = async (id: string) => {
    try {
      const res = await fetch(`${serverUrl}/documents/${id}`, {
        method: 'DELETE', headers: authHeader(accessToken),
      })
      if (res.ok) { toast.success('Dokument został usunięty'); await loadDocuments() }
      else { const d = await res.json(); toast.error(d.error || 'Błąd podczas usuwania') }
    } catch { toast.error('Błąd podczas usuwania') }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  const Spinner = () => (
    <div className="flex justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Panel Nauczyciela</h1>
              <p className="text-xs text-gray-500">{user.name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />Wyloguj
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="flex w-full overflow-x-auto mb-8 h-auto gap-1 p-1 bg-gray-100 rounded-xl">
            <TabsTrigger value="announcements" className="flex-1 min-w-fit rounded-lg text-xs sm:text-sm">
              <Bell className="w-4 h-4 mr-1.5 hidden sm:block" />Aktualności
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex-1 min-w-fit rounded-lg text-xs sm:text-sm">
              <Calendar className="w-4 h-4 mr-1.5 hidden sm:block" />Zadania
            </TabsTrigger>
            <TabsTrigger value="info" className="flex-1 min-w-fit rounded-lg text-xs sm:text-sm">
              <Info className="w-4 h-4 mr-1.5 hidden sm:block" />Informacje
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex-1 min-w-fit rounded-lg text-xs sm:text-sm" onClick={loadDocuments}>
              <FileText className="w-4 h-4 mr-1.5 hidden sm:block" />Dokumenty
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1 min-w-fit rounded-lg text-xs sm:text-sm">
              <Users className="w-4 h-4 mr-1.5 hidden sm:block" />Użytkownicy
            </TabsTrigger>
          </TabsList>

          {/* ─── AKTUALNOŚCI ─── */}
          <TabsContent value="announcements">
            <div className="mb-4">
              <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />Dodaj aktualność
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Nowa aktualność</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ann-title">Tytuł</Label>
                      <Input id="ann-title" value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="ann-content">Treść</Label>
                      <Textarea id="ann-content" rows={6} value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })} />
                    </div>
                    <Button onClick={handleCreateAnnouncement} className="w-full">Dodaj</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? <Spinner /> : announcements.length === 0 ? (
              <Card><CardContent className="pt-6 text-center text-gray-400 text-sm">Brak aktualności</CardContent></Card>
            ) : (
              <div className="space-y-3">
                {announcements.map((a) => (
                  <Card key={a.id} className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-base">{a.title}</CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {a.createdBy} · {format(new Date(a.createdAt), 'PPP', { locale: pl })}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteAnnouncement(a.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{a.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── ZADANIA ─── */}
          <TabsContent value="assignments">
            <div className="mb-4">
              <Dialog open={assignmentOpen} onOpenChange={setAssignmentOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />Dodaj zadanie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Nowe zadanie</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Tytuł</Label>
                      <Input value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })} />
                    </div>
                    <div>
                      <Label>Przedmiot</Label>
                      <Input placeholder="np. Matematyka" value={assignmentForm.subject}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, subject: e.target.value })} />
                    </div>
                    <div>
                      <Label>Termin oddania</Label>
                      <Input type="date" value={assignmentForm.dueDate}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })} />
                    </div>
                    <div>
                      <Label>Opis zadania</Label>
                      <Textarea rows={5} value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })} />
                    </div>
                    <Button onClick={handleCreateAssignment} className="w-full">Dodaj</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? <Spinner /> : assignments.length === 0 ? (
              <Card><CardContent className="pt-6 text-center text-gray-400 text-sm">Brak zadań</CardContent></Card>
            ) : (
              <div className="space-y-3">
                {assignments.map((a) => (
                  <Card key={a.id} className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <CardTitle className="text-base">{a.title}</CardTitle>
                            <Badge variant="secondary" className="text-xs">{a.subject}</Badge>
                          </div>
                          <CardDescription className="text-xs">
                            {a.createdBy} · Termin: {format(new Date(a.dueDate), 'PPP', { locale: pl })}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteAssignment(a.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{a.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── INFORMACJE ─── */}
          <TabsContent value="info">
            <div className="mb-4">
              <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />Dodaj informację
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Nowa informacja</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Tytuł</Label>
                      <Input value={infoForm.title}
                        onChange={(e) => setInfoForm({ ...infoForm, title: e.target.value })} />
                    </div>
                    <div>
                      <Label>Kategoria</Label>
                      <Input placeholder="np. Organizacja, Ważne" value={infoForm.category}
                        onChange={(e) => setInfoForm({ ...infoForm, category: e.target.value })} />
                    </div>
                    <div>
                      <Label>Treść</Label>
                      <Textarea rows={6} value={infoForm.content}
                        onChange={(e) => setInfoForm({ ...infoForm, content: e.target.value })} />
                    </div>
                    <Button onClick={handleCreateInfo} className="w-full">Dodaj</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loading ? <Spinner /> : infos.length === 0 ? (
              <Card><CardContent className="pt-6 text-center text-gray-400 text-sm">Brak informacji</CardContent></Card>
            ) : (
              <div className="space-y-3">
                {infos.map((item) => (
                  <Card key={item.id} className="border-0 shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <CardTitle className="text-base">{item.title}</CardTitle>
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </div>
                          <CardDescription className="text-xs">
                            {item.createdBy} · {format(new Date(item.createdAt), 'PPP', { locale: pl })}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteInfo(item.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── DOKUMENTY ─── */}
          <TabsContent value="documents">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Dokumenty dla rodziców</h2>
                <p className="text-sm text-gray-500">Pliki widoczne publicznie w sekcji „Dla Rodziców"</p>
              </div>
              <Dialog open={docOpen} onOpenChange={setDocOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 shrink-0">
                    <Upload className="w-4 h-4 mr-2" />Dodaj dokument
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Wgraj nowy dokument</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Nazwa dokumentu *</Label>
                      <Input placeholder="np. Statut Szkoły 2025/2026" value={docForm.name}
                        onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} />
                    </div>
                    <div>
                      <Label>Kategoria</Label>
                      <Select value={docForm.category} onValueChange={(v) => setDocForm({ ...docForm, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {DOCUMENT_CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Opis (opcjonalnie)</Label>
                      <Textarea rows={3} placeholder="Krótki opis dokumentu..." value={docForm.description}
                        onChange={(e) => setDocForm({ ...docForm, description: e.target.value })} />
                    </div>
                    <div>
                      <Label>Plik *</Label>
                      <div
                        className="mt-1 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {selectedFile ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {(selectedFile.size / 1024).toFixed(0)} KB · {selectedFile.type || 'nieznany typ'}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Kliknij, aby wybrać plik</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, XLS, XLSX (maks. 10 MB)</p>
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      />
                    </div>
                    <Button onClick={handleUploadDocument} className="w-full" disabled={uploadingDoc}>
                      {uploadingDoc
                        ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Wgrywanie...</>
                        : <><Upload className="w-4 h-4 mr-2" />Wgraj dokument</>}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {docsLoading ? <Spinner /> : documents.length === 0 ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-8 pb-8 text-center">
                  <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Brak dokumentów. Dodaj pierwszy plik dla rodziców.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <Card key={doc.id} className="border-0 shadow-sm">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 text-xl">
                          {doc.fileType.includes('pdf') ? '📄' : doc.fileType.includes('doc') ? '📝' : '📁'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-xs text-gray-400">{doc.category}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-400">{formatFileSize(doc.fileSize)}</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-400">
                              {format(new Date(doc.createdAt), 'dd MMM yyyy', { locale: pl })}
                            </span>
                          </div>
                          {doc.description && (
                            <p className="text-xs text-gray-400 mt-1 truncate">{doc.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {doc.downloadUrl && (
                            <a
                              href={doc.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── UŻYTKOWNICY ─── */}
          <TabsContent value="users">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Zarządzanie użytkownikami</CardTitle>
                <CardDescription>Twórz nowe konta uczniów i nauczycieli.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-start mb-6">
                  <Dialog open={userOpen} onOpenChange={setUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />Utwórz użytkownika
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Nowy użytkownik</DialogTitle></DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Imię i nazwisko</Label>
                          <Input placeholder="Jan Kowalski" value={userForm.name}
                            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input type="email" placeholder="jan.kowalski@szkola.pl" value={userForm.email}
                            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                        </div>
                        <div>
                          <Label>Hasło</Label>
                          <Input type="password" placeholder="Minimum 6 znaków" value={userForm.password}
                            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} />
                        </div>
                        <div>
                          <Label>Rola</Label>
                          <Select value={userForm.role} onValueChange={(v) => setUserForm({ ...userForm, role: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Uczeń</SelectItem>
                              <SelectItem value="teacher">Nauczyciel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleCreateUser} className="w-full">Utwórz konto</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="p-4 bg-blue-50 text-blue-800 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Informacja</p>
                    <p className="text-sm mt-1 text-blue-700">
                      Ze względów bezpieczeństwa pełna lista użytkowników jest zarządzana
                      bezpośrednio w panelu Supabase. Ten formularz służy do szybkiego tworzenia nowych kont.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
