import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { useStore } from '../store'

interface FileUploadAreaProps {
  onClose: () => void
}

export default function FileUploadArea({ onClose }: FileUploadAreaProps) {
  const { currentPath, setLoading } = useStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', currentPath)

    try {
      setUploading(true)
      const response = await fetch('/api/files/upload.php', {
        method: 'POST',
        body: formData
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
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    files.forEach(uploadFile)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach(uploadFile)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-96 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload files</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drag and drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Upload className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600 mb-2">Drag and drop files here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={handleFileInput}
            className="hidden"
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Select files'}
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Maximum 5 GB per file
        </div>
      </div>
    </div>
  )
}
