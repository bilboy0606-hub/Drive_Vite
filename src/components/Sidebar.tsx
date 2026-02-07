import { FileText, Star, Clock, Users, Trash2 } from 'lucide-react'
import { useStore } from '../store'

export default function Sidebar() {
  const { usedSpace, totalSpace } = useStore()
  const percentage = (usedSpace / totalSpace) * 100

  return (
    <aside className="w-56 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col overflow-y-auto">
      <nav className="space-y-2">
        {[
          { icon: FileText, label: 'My Drive' },
          { icon: Star, label: 'Starred' },
          { icon: Clock, label: 'Recent' },
          { icon: Users, label: 'Shared with me' },
          { icon: Trash2, label: 'Trash' },
        ].map((item, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
              i === 0
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-2">STORAGE</p>
        <div className="space-y-2">
          <div className="text-xs text-gray-600">
            {(usedSpace / (1024 * 1024 * 1024)).toFixed(1)} GB of 15 GB used
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
        </div>
        <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Upgrade Storage
        </button>
      </div>
    </aside>
  )
}
