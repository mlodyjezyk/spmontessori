import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command as CommandPrimitive } from "cmdk";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Home,
  Newspaper,
  Phone,
  Search,
  School,
  Shield,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";
import { serverUrl } from "../utils/supabaseClient";

interface SearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SearchEntry {
  title: string;
  path: string;
  description: string;
  keywords: string;
  icon: LucideIcon;
}

interface PublishedDocument {
  name: string;
  description?: string;
  category?: string;
}

const PAGE_ENTRIES: SearchEntry[] = [
  {
    title: "Strona główna",
    path: "/",
    description: "Informacje o szkole Montessori Odkrywcy Świata w Koninie.",
    keywords: "szkoła podstawowa Odkrywcy Świata Konin o szkole misja oferta",
    icon: Home,
  },
  {
    title: "Metoda Montessori",
    path: "/metoda",
    description: "Samodzielność, przygotowane otoczenie i edukacja Montessori.",
    keywords: "nauczanie pedagogika Maria Montessori rozwój dziecka środowisko samodzielność przygotowane otoczenie materiały",
    icon: BookOpen,
  },
  {
    title: "Klasy i etapy edukacji",
    path: "/klasy",
    description: "Klasy 1–3, 4–6 i 7–8, program oraz przygotowanie do egzaminów.",
    keywords: "edukacja wczesnoszkolna wiek ucznia egzamin ósmoklasisty nauka matematyka język angielski przyroda projekty",
    icon: School,
  },
  {
    title: "Aktualności i wydarzenia",
    path: "/aktualnosci",
    description: "Wiadomości ze szkoły, wydarzenia, warsztaty i kalendarz.",
    keywords: "dzień otwarty warsztaty konkurs ferie kalendarz wydarzenia rodzice spotkanie wywiadówka",
    icon: Newspaper,
  },
  {
    title: "Kadra i dyrekcja",
    path: "/kadra",
    description: "Nauczyciele, dyrekcja, specjaliści i kwalifikacje zespołu.",
    keywords: "nauczyciel nauczyciele dyrektor psycholog pedagog zespół kwalifikacje specjalista",
    icon: Users,
  },
  {
    title: "Kontakt i dojazd",
    path: "/kontakt",
    description: "Adres szkoły, telefony, godziny pracy i dojazd.",
    keywords: "adres telefon email godziny sekretariat parking mapa Konin Urbanowskiej 9 62-500 dojazd autobus",
    icon: Phone,
  },
  {
    title: "Rekrutacja i zapisy",
    path: "/rekrutacja",
    description: "Informacje i formularz rekrutacyjny do szkoły.",
    keywords: "rekrutacja zapisy kandydat formularz dziecko zgłoszenie rok szkolny 2026 2027",
    icon: GraduationCap,
  },
  {
    title: "Oferty pracy",
    path: "/praca",
    description: "Stanowiska w szkole i informacje dla kandydatów do pracy.",
    keywords: "praca zatrudnienie nauczyciel edukacji wczesnoszkolnej asystent angielski pedagog aplikacja etat wynagrodzenie",
    icon: Briefcase,
  },
  {
    title: "Dokumenty dla rodziców",
    path: "/dla-rodzicow",
    description: "Statut, regulaminy, formularze i dokumenty szkolne do pobrania.",
    keywords: "dokumenty rodzice statut regulamin formularze pobieranie pliki wnioski do pobrania",
    icon: FileText,
  },
  {
    title: "Regulamin szkoły",
    path: "/regulamin",
    description: "Zasady przyjęcia, nauki, bezpieczeństwa, opłat i organizacji szkoły.",
    keywords: "zasady bezpieczeństwo opłaty czesne obowiązki ucznia rodzica",
    icon: FileText,
  },
  {
    title: "Polityka prywatności",
    path: "/polityka-prywatnosci",
    description: "Informacje o ochronie i przetwarzaniu danych osobowych.",
    keywords: "RODO dane osobowe administrator prawa prywatność cookies",
    icon: Shield,
  },
  {
    title: "Platforma ucznia",
    path: "/logowanie-ucznia",
    description: "Logowanie do platformy edukacyjnej dla uczniów.",
    keywords: "uczeń konto logowanie zadania aktualności platforma",
    icon: BookOpen,
  },
  {
    title: "Panel nauczyciela",
    path: "/logowanie-nauczyciela",
    description: "Logowanie nauczycieli do panelu szkolnego.",
    keywords: "nauczyciel konto logowanie panel administracyjny",
    icon: GraduationCap,
  },
];

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pl-PL")
    .trim();
}

function scoreEntry(entry: SearchEntry, query: string): number {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return 0;

  const title = normalize(entry.title);
  const description = normalize(entry.description);
  const keywords = normalize(entry.keywords);
  const searchable = `${title} ${description} ${keywords}`;

  if (!terms.every((term) => searchable.includes(term))) return 0;

  return terms.reduce((score, term) => {
    if (title.includes(term)) return score + (title.startsWith(term) ? 12 : 8);
    if (keywords.includes(term)) return score + 4;
    if (description.includes(term)) return score + 2;
    return score;
  }, 0);
}

function isPublishedDocument(value: unknown): value is PublishedDocument {
  if (!value || typeof value !== "object") return false;
  const doc = value as Record<string, unknown>;
  return typeof doc.name === "string"
    && doc.name.trim().length > 0
    && (doc.description === undefined || typeof doc.description === "string")
    && (doc.category === undefined || typeof doc.category === "string");
}

export function SearchCommand({ open, setOpen }: SearchCommandProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<PublishedDocument[]>([]);
  const [documentsStatus, setDocumentsStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [documentRetry, setDocumentRetry] = useState(0);
  const documentRequestStarted = useRef(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) setQuery("");
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open || documentRequestStarted.current) return;

    documentRequestStarted.current = true;
    setDocumentsStatus("loading");

    fetch(`${serverUrl}/documents`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Document search request failed");
        const data: unknown = await response.json();
        if (!data || typeof data !== "object" || !Array.isArray((data as { documents?: unknown }).documents)) {
          throw new Error("Unexpected document search response");
        }
        return (data as { documents: unknown[] }).documents.filter(isPublishedDocument);
      })
      .then((items) => {
        setDocuments(items);
        setDocumentsStatus("ready");
      })
      .catch((error: unknown) => {
        console.error("Search document load error:", error);
        setDocumentsStatus("error");
      });
  }, [documentRetry, open]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setQuery("");
    command();
  };

  const matchingPages = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return [];

    return PAGE_ENTRIES
      .map((entry) => ({ entry, score: scoreEntry(entry, normalizedQuery) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "pl"))
      .slice(0, 8);
  }, [query]);

  const matchingDocuments = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    return documents
      .map((document) => {
        const title = normalize(document.name);
        const description = normalize(document.description || "");
        const category = normalize(document.category || "");
        const searchable = `${title} ${description} ${category}`;
        const matches = terms.every((term) => searchable.includes(term));
        const score = terms.reduce((total, term) => {
          if (title.includes(term)) return total + 8;
          if (category.includes(term)) return total + 4;
          if (description.includes(term)) return total + 2;
          return total;
        }, 0);
        return { document, score: matches ? score : 0 };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.document.name.localeCompare(b.document.name, "pl"))
      .slice(0, 6);
  }, [documents, query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = matchingPages.length > 0 || matchingDocuments.length > 0;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setQuery("");
      }}
    >
      <DialogContent className="max-w-full w-full h-full p-0 gap-0 border-0 rounded-none bg-white z-[100] sm:max-w-full top-0 left-0 translate-x-0 translate-y-0 data-[state=open]:slide-in-from-bottom-2 [&>button]:hidden flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setQuery("");
          }}
          aria-label="Zamknij wyszukiwarkę"
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
        >
          <span aria-hidden="true" className="text-3xl leading-none text-gray-900">×</span>
        </button>

        <Command
          shouldFilter={false}
          className="w-full h-full bg-transparent flex flex-col items-center justify-center [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        >
          <div className="relative w-full max-w-2xl px-4 flex items-center justify-center mb-8">
            <CommandPrimitive.Input
              placeholder="Szukaj stron, tematów i dokumentów..."
              aria-label="Szukaj na stronie"
              value={query}
              onValueChange={setQuery}
              className="w-full bg-transparent border-b text-center border-gray-200 text-2xl sm:text-4xl font-light text-gray-900 placeholder:text-gray-300 py-4 focus:outline-none focus:border-gray-900 transition-colors tracking-wide font-sans"
            />
            <Search aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-6 h-6" />
          </div>

          <CommandList className="w-full max-w-2xl px-4 max-h-[60vh] overflow-y-auto">
            {hasQuery && !hasResults && documentsStatus !== "idle" && documentsStatus !== "loading" && (
              <CommandEmpty className="py-10 text-center">
                <div className="flex flex-col items-center gap-3">
                  <Search className="w-8 h-8 text-gray-300" />
                  <p className="text-gray-700 font-medium">Brak wyników dla „{query.trim()}”</p>
                  <p className="text-sm text-gray-500">
                    Spróbuj krótszego hasła lub przejdź do strony kontaktowej.
                  </p>
                  <button
                    type="button"
                    onClick={() => runCommand(() => navigate("/kontakt"))}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Kontakt
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CommandEmpty>
            )}

            {matchingPages.length > 0 && (
              <CommandGroup heading="Strony">
                {matchingPages.map(({ entry }) => {
                  const Icon = entry.icon;
                  return (
                    <CommandItem
                      key={entry.path}
                      value={`${entry.title} ${entry.description} ${entry.keywords}`}
                      onSelect={() => runCommand(() => navigate(entry.path))}
                      className="cursor-pointer rounded-xl my-1 py-3"
                    >
                      <Icon aria-hidden="true" className="mr-3 h-5 w-5 text-blue-600" />
                      <span className="min-w-0">
                        <span className="block text-base font-medium text-gray-900">{entry.title}</span>
                        <span className="block text-sm text-gray-500 whitespace-normal">{entry.description}</span>
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}

            {matchingDocuments.length > 0 && (
              <CommandGroup heading="Dokumenty do pobrania">
                {matchingDocuments.map(({ document }) => (
                  <CommandItem
                    key={`${document.category || "document"}-${document.name}`}
                    value={`${document.name} ${document.description || ""} ${document.category || ""}`}
                    onSelect={() => runCommand(() => navigate("/dla-rodzicow"))}
                    className="cursor-pointer rounded-xl my-1 py-3"
                  >
                    <FileText aria-hidden="true" className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="min-w-0">
                      <span className="block text-base font-medium text-gray-900">{document.name}</span>
                      <span className="block text-sm text-gray-500 whitespace-normal">
                        {[document.category, document.description].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {hasQuery && (documentsStatus === "idle" || documentsStatus === "loading") && (
              <p className="px-4 py-3 text-center text-sm text-gray-400">Wyszukiwanie w dokumentach...</p>
            )}

            {hasQuery && documentsStatus === "error" && (
              <div className="px-4 py-3 text-center text-sm text-gray-500">
                <p>Nie udało się wczytać dokumentów. Wyniki stron są nadal dostępne.</p>
                <button
                  type="button"
                  className="mt-2 text-blue-700 underline hover:text-blue-900"
                  onClick={() => {
                    documentRequestStarted.current = false;
                    setDocumentRetry((retry) => retry + 1);
                  }}
                >
                  Spróbuj ponownie
                </button>
              </div>
            )}

            {!hasQuery && (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">Szukaj informacji o szkole, rekrutacji, klasach lub dokumentach.</p>
                <p className="text-xs text-gray-400 mt-2">Skrót klawiszowy: Ctrl + K / ⌘ + K</p>
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
