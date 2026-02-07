import { useState } from 'react'
import { X } from 'lucide-react'
import { useStore } from '../store'

interface CreateFolderDialogProps {
  onClose: () => void
}

export default function CreateFolderDialog({ onClose }: CreateFolderDialogProps) {
  const { currentPath, setLoading } = useStore()
  const [folderName, setFolderName] = useState('')
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreate = async () => {
    if (!folderName.trim()) {
      setError('Folder name required')
      return
    }

    try {
      setCreating(true)
      setError('')

      const response = await fetch('/api/folders/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          folderName: folderName.trim(),
          parentPath: currentPath
        })
      })

      if (response.ok) {
        setLoading(true)
        // Reload content
        const listResponse = await fetch(
          `/api/drive/list.php?path=${encodeURIComponent(currentPath)}`
        )
        if (listResponse.ok) {
          // Data will be handled by DriveContent
        }
        setLoading(false)
        onClose()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create folder')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setCreating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New folder</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Folder name"
          disabled={creating}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          autoFocus
        />

        {error && (
          <div className="text-red-600 text-sm mb-4">{error}</div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onClose}
            disabled={creating}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
