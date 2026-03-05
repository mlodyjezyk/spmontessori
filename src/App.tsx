import { BrowserRouter, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Toaster } from './components/ui/sonner'
import { PageRoutes } from './components/PageRoutes'

const PLATFORM_PATHS = [
  '/logowanie-ucznia',
  '/platforma-ucznia',
  '/logowanie-nauczyciela',
  '/panel-nauczyciela',
]

function Layout() {
  const { pathname } = useLocation()
  const isPlatform = PLATFORM_PATHS.includes(pathname)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isPlatform && <Header />}
      <main className="flex-1">
        <PageRoutes />
      </main>
      {!isPlatform && <Footer />}
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
