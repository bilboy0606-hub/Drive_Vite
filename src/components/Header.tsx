import { Settings, LogOut } from 'lucide-react'
import { useStore } from '../store'

export default function Header() {
  const { user, setUser } = useStore()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout.php', { method: 'POST' })
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="text-lg font-bold">Drive</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="text-right pr-2">
              <p className="text-sm font-medium text-gray-700">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          )}
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <LogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
