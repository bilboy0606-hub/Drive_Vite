import { useEffect } from 'react'
import { useStore } from './store'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import DriveContent from './components/DriveContent'
import AuthPage from './pages/AuthPage'

export default function App() {
  const { user, setUser } = useStore()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check.php')
        if (response.ok) {
          const data = await response.json()
          if (data.logged_in && !user) {
            // User is logged in but store not updated
            // This will be set by AuthPage or next load
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
      }
    }
    checkAuth()
  }, [])

  if (!user) {
    return <AuthPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <DriveContent />
        </main>
      </div>
    </div>
  )
}
