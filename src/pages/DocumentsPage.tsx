import { useEffect, useState } from 'react';
import { serverUrl } from '../utils/supabaseClient';
import { FileText, Download, Loader2, FolderOpen, AlertCircle, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Document {
  id: string;
  name: string;
  description: string;
  category: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
  downloadUrl: string | null;
}

const CATEGORY_ORDER = [
  'Dokumenty szkolne',
  'Dla rodziców',
  'Rok szkolny',
  'Formularze',
  'Inne',
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) return '📄';
  if (fileType.includes('word') || fileType.includes('doc')) return '📝';
  if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('xls')) return '📊';
  if (fileType.includes('image')) return '🖼️';
  return '📁';
}

function getFileBadgeColor(fileType: string) {
  if (fileType.includes('pdf')) return 'bg-red-50 text-red-700 border-red-100';
  if (fileType.includes('word') || fileType.includes('doc')) return 'bg-blue-50 text-blue-700 border-blue-100';
  if (fileType.includes('sheet') || fileType.includes('excel') || fileType.includes('xls')) return 'bg-green-50 text-green-700 border-green-100';
  return 'bg-gray-50 text-gray-700 border-gray-100';
}

function getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toUpperCase() || 'PLIK';
}

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setError('');
    try {
      setLoading(true);
      const res = await fetch(`${serverUrl}/documents`);
      if (!res.ok) {
        let message = 'Błąd podczas wczytywania dokumentów';
        try {
          const data = await res.json();
          if (typeof data.error === 'string') message = data.error;
        } catch {
          // Keep the user-facing fallback when the server response is not JSON.
        }
        throw new Error(message);
      }

      const data: unknown = await res.json();
      if (!data || typeof data !== 'object' || !Array.isArray((data as { documents?: unknown }).documents)) {
        throw new Error('Serwer zwrócił nieprawidłową listę dokumentów');
      }
      setDocuments((data as { documents: Document[] }).documents);
    } catch (err) {
      console.error('Load documents error:', err);
      setError(err instanceof Error
        ? err.message
        : 'Nie udało się wczytać dokumentów. Sprawdź połączenie z internetem.');
    } finally {
      setLoading(false);
    }
  };


  const grouped: Record<string, Document[]> = {};
  documents.forEach(doc => {
    const cat = doc.category || 'Inne';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(doc);
  });

  const categories = [
    ...CATEGORY_ORDER.filter(c => grouped[c]),
    ...Object.keys(grouped).filter(c => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Dla Rodziców</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3">
            Dokumenty do pobrania
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Tutaj znajdziesz statut szkoły, regulaminy, formularze i inne ważne dokumenty. 
            Wszystkie pliki są aktualne i dostępne do pobrania w formacie PDF.
          </p>
        </div>
      </div>


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-400 text-sm">Wczytywanie dokumentów...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Nie udało się wczytać dokumentów</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={loadDocuments}
                className="mt-3 text-sm text-red-700 underline hover:text-red-900"
              >
                Spróbuj ponownie
              </button>
            </div>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Brak dokumentów</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Dokumenty zostaną tu opublikowane wkrótce. W razie pytań skontaktuj się ze szkołą.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:kontakt@odkrywcyswiata.pl"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Napisz do nas
              </a>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Sekcja kontakt
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map(category => (
              <section key={category}>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">
                  {category}
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {grouped[category].map(doc => (
                    <div
                      key={doc.id}
                      className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50 transition-all duration-200 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl group-hover:bg-blue-50 transition-colors">
                          {getFileIcon(doc.fileType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 text-sm leading-snug mb-1 truncate">
                                {doc.name}
                              </h3>
                              {doc.description && (
                                <p className="text-xs text-gray-400 leading-relaxed mb-2 line-clamp-2">
                                  {doc.description}
                                </p>
                              )}
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getFileBadgeColor(doc.fileType)}`}>
                                  {getFileExtension(doc.fileName)}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {formatFileSize(doc.fileSize)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-50">
                        {doc.downloadUrl ? (
                          <a
                            href={doc.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={doc.fileName}
                            className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Pobierz dokument
                          </a>
                        ) : (
                          <div className="text-center text-sm text-gray-400 py-1">
                            Plik tymczasowo niedostępny
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}


        <div className="mt-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-2">Nie znalazłeś potrzebnego dokumentu?</h3>
            <p className="text-blue-100 text-sm mb-6">
              Skontaktuj się z sekretariatem szkoły – chętnie pomożemy i udostępnimy niezbędne dokumenty.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:kontakt@odkrywcyswiata.pl"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-blue-700 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                kontakt@odkrywcyswiata.pl
              </a>
              <a
                href="tel:+48724139955"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-500/40 text-white rounded-xl text-sm font-semibold hover:bg-blue-500/60 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +48 724 139 955
              </a>
            </div>
          </div>
        </div>


        <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/polityka-prywatnosci" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Polityka prywatności
          </Link>
          <Link to="/regulamin" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Regulamin
          </Link>
          <Link to="/kontakt" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}
