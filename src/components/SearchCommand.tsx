import { Dialog, DialogContent } from "./ui/dialog";
import { Command as CommandPrimitive } from "cmdk";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem, 
  CommandList 
} from "./ui/command";
import { 
  Home, 
  BookOpen, 
  Users, 
  Newspaper, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  School,
  Search,
  FileText,
  ArrowRight,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface SearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchCommand({ open, setOpen }: SearchCommandProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const hasQuery = query.trim() !== "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-full w-full h-full p-0 gap-0 border-0 rounded-none bg-white z-[100] sm:max-w-full top-0 left-0 translate-x-0 translate-y-0 data-[state=open]:slide-in-from-bottom-2 [&>button]:hidden flex items-center justify-center">
        
        {/* Close Button */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
        >
          <XIcon className="w-7 h-7 text-gray-900" />
        </button>

        <Command className="w-full h-full bg-transparent flex flex-col items-center justify-center [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          
          <div className="relative w-full max-w-2xl px-4 flex items-center justify-center mb-12">
            <CommandPrimitive.Input
              placeholder="Szukaj na stronie..."
              value={query}
              onValueChange={setQuery}
              className="w-full bg-transparent border-b text-center border-gray-200 text-4xl font-light text-gray-900 placeholder:text-gray-300 py-4 focus:outline-none focus:border-gray-900 transition-colors tracking-wide font-sans"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-6 h-6" />
          </div>

          <CommandList className="w-full max-w-2xl px-4 max-h-[55vh] overflow-y-auto">
            {hasQuery && (
              <CommandEmpty className="py-10 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium mb-1">Nie znaleźliśmy tej strony</p>
                    <p className="text-sm text-gray-400 mb-4">
                      Możesz skontaktować się z nami bezpośrednio
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a 
                      href="mailto:kontakt@odkrywcyswiata.pl" 
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      kontakt@odkrywcyswiata.pl
                    </a>
                    <button
                      onClick={() => runCommand(() => navigate("/kontakt"))}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      Przejdź do Kontaktu
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CommandEmpty>
            )}

            {query && (
              <>
                <CommandGroup heading="Strony">
                  <CommandItem onSelect={() => runCommand(() => navigate("/"))} className="cursor-pointer rounded-xl my-0.5">
                    <Home className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Strona główna</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/metoda"))} className="cursor-pointer rounded-xl my-0.5">
                    <BookOpen className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Metoda Montessori</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/klasy"))} className="cursor-pointer rounded-xl my-0.5">
                    <School className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Klasy</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/aktualnosci"))} className="cursor-pointer rounded-xl my-0.5">
                    <Newspaper className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Aktualności</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/kadra"))} className="cursor-pointer rounded-xl my-0.5">
                    <Users className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Kadra</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/kontakt"))} className="cursor-pointer rounded-xl my-0.5">
                    <Phone className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Kontakt</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/dla-rodzicow"))} className="cursor-pointer rounded-xl my-0.5">
                    <FileText className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Dla Rodziców – Dokumenty</span>
                  </CommandItem>
                </CommandGroup>
                
                <CommandGroup heading="Rekrutacja i Praca">
                  <CommandItem onSelect={() => runCommand(() => navigate("/rekrutacja"))} className="cursor-pointer rounded-xl my-0.5">
                    <GraduationCap className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Zapisy / Rekrutacja</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/praca"))} className="cursor-pointer rounded-xl my-0.5">
                    <Briefcase className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Oferty Pracy</span>
                  </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Platforma Edukacyjna">
                  <CommandItem onSelect={() => runCommand(() => navigate("/logowanie-ucznia"))} className="cursor-pointer rounded-xl my-0.5">
                    <BookOpen className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Platforma dla Uczniów</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => navigate("/logowanie-nauczyciela"))} className="cursor-pointer rounded-xl my-0.5">
                    <GraduationCap className="mr-3 h-5 w-5 text-gray-400" />
                    <span className="text-lg font-light">Panel Nauczyciela</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}

            {!hasQuery && (
              <div className="py-8 text-center">
                <p className="text-sm text-gray-400">Zacznij pisać, aby wyszukać...</p>
                <p className="text-xs text-gray-300 mt-2">Skrót: Ctrl + K</p>
              </div>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
