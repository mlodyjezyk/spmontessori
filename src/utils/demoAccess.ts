export type DemoRole = 'student' | 'teacher'

const DEMO_ROLE_KEY = 'montessori-demo-role'
const DEMO_PASSWORD = 'haslo123'

const DEMO_ACCOUNTS: Record<DemoRole, string> = {
  student: 'uczen@gmail',
  teacher: 'nauczyciel@gmail',
}

export function signInToDemo(role: DemoRole, email: string, password: string): boolean {
  if (email.trim().toLowerCase() !== DEMO_ACCOUNTS[role] || password !== DEMO_PASSWORD) {
    return false
  }

  window.sessionStorage.setItem(DEMO_ROLE_KEY, role)
  return true
}

export function getDemoRole(): DemoRole | null {
  const role = window.sessionStorage.getItem(DEMO_ROLE_KEY)
  return role === 'student' || role === 'teacher' ? role : null
}

export function signOutFromDemo(): void {
  window.sessionStorage.removeItem(DEMO_ROLE_KEY)
}
