import { useState, useEffect } from 'react'
import { useStore } from '../store'
import { formatBytes, formatDate } from '../utils'
import { File, Folder, Upload, FolderPlus, Search, MoreVertical } from 'lucide-react'
import FileUploadArea from './FileUploadArea'
import CreateFolderDialog from './CreateFolderDialog'

export default function DriveContent() {
  const { files, folders, currentPath, loading, setFiles, setFolders, setLoading } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [showFolderDialog, setShowFolderDialog] = useState(false)

  useEffect(() => {
    loadContent()
  }, [currentPath])

  const loadContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/drive/list.php?path=${encodeURIComponent(currentPath)}`
      )
      if (response.ok) {
        const data = await response.json()
        setFiles(data.files || [])
        setFolders(data.folders || [])
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFolders = folders.filter((f) =>
    f.folder_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Top Bar */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Drive</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Upload size={18} />
            Upload Files
          </button>
          <button 
            onClick={() => setShowFolderDialog(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            <FolderPlus size={18} />
            New Folder
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search in Drive"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Folders Grid */}
        {filteredFolders.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Folders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFolders.map((folder) => (
                <div
                  key={folder.id}
                  className="bg-white rounded-lg border p-4 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Folder className="w-8 h-8 text-blue-500" />
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                  </div>
                  <p className="font-medium text-sm truncate">
                    {folder.folder_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(folder.created_at)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Files List */}
        {filteredFiles.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Files</h3>
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white rounded-lg border p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatBytes(parseInt(file.size))} •{' '}
                        {formatDate(file.uploaded_at)}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical size={18} className="text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredFiles.length === 0 && filteredFolders.length === 0 && (
          <div className="text-center py-12">
            <File className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No files or folders here</p>
            <p className="text-sm text-gray-400">
              {searchQuery
                ? 'Try a different search'
                : 'Upload or create a file to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      {showUpload && (
        <FileUploadArea onClose={() => setShowUpload(false)} />
      )}

      {/* Create Folder Dialog */}
      {showFolderDialog && (
        <CreateFolderDialog onClose={() => setShowFolderDialog(false)} />
      )}
    </div>
  )
}
