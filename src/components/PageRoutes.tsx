import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'

import { HomePage }            from '../pages/HomePage'
import { MontessoriPage }      from '../pages/MontessoriPage'
import { ClassesPage }         from '../pages/ClassesPage'
import { NewsPage }            from '../pages/NewsPage'
import { StaffPage }           from '../pages/StaffPage'
import { RecruitmentPage }     from '../pages/RecruitmentPage'
import { ContactPage }         from '../pages/ContactPage'
import { JobOffersPage }       from '../pages/JobOffersPage'
import { DocumentsPage }       from '../pages/DocumentsPage'
import { PrivacyPolicyPage }   from '../pages/PrivacyPolicyPage'
import { RegulaminPage }       from '../pages/RegulaminPage'
import { StudentLoginPage }    from '../pages/StudentLoginPage'
import { StudentPlatformPage } from '../pages/StudentPlatformPage'
import { TeacherLoginPage }    from '../pages/TeacherLoginPage'
import { TeacherPanelPage }    from '../pages/TeacherPanelPage'

const Fade = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.22, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)

export function PageRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                     element={<Fade><HomePage /></Fade>} />
        <Route path="/metoda"               element={<Fade><MontessoriPage /></Fade>} />
        <Route path="/klasy"                element={<Fade><ClassesPage /></Fade>} />
        <Route path="/aktualnosci"          element={<Fade><NewsPage /></Fade>} />
        <Route path="/kadra"                element={<Fade><StaffPage /></Fade>} />
        <Route path="/rekrutacja"           element={<Fade><RecruitmentPage /></Fade>} />
        <Route path="/kontakt"              element={<Fade><ContactPage /></Fade>} />
        <Route path="/praca"                element={<Fade><JobOffersPage /></Fade>} />
        <Route path="/dla-rodzicow"         element={<Fade><DocumentsPage /></Fade>} />
        <Route path="/polityka-prywatnosci" element={<Fade><PrivacyPolicyPage /></Fade>} />
        <Route path="/regulamin"            element={<Fade><RegulaminPage /></Fade>} />
        <Route path="/logowanie-ucznia"     element={<Fade><StudentLoginPage /></Fade>} />
        <Route path="/platforma-ucznia"     element={<Fade><StudentPlatformPage /></Fade>} />
        <Route path="/logowanie-nauczyciela" element={<Fade><TeacherLoginPage /></Fade>} />
        <Route path="/panel-nauczyciela"    element={<Fade><TeacherPanelPage /></Fade>} />
        <Route path="*"                     element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
