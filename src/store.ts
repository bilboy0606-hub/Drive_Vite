import { create } from 'zustand'

export interface File {
  id: string
  name: string
  size: number
  mime_type: string
  uploaded_at: string
  folder: string
}

export interface Folder {
  id: string
  folder_name: string
  parent_path: string
  created_at: string
}

export interface User {
  id: string
  username: string
  email: string
}

interface DriveStore {
  user: User | null
  files: File[]
  folders: Folder[]
  currentPath: string
  loading: boolean
  usedSpace: number
  totalSpace: number
  
  setUser: (user: User | null) => void
  setFiles: (files: File[]) => void
  setFolders: (folders: Folder[]) => void
  setCurrentPath: (path: string) => void
  setLoading: (loading: boolean) => void
  setUsedSpace: (space: number) => void
}

export const useStore = create<DriveStore>((set) => ({
  user: null,
  files: [],
  folders: [],
  currentPath: '/',
  loading: false,
  usedSpace: 0,
  totalSpace: 15 * 1024 * 1024 * 1024, // 15GB
  
  setUser: (user) => set({ user }),
  setFiles: (files) => set({ files }),
  setFolders: (folders) => set({ folders }),
  setCurrentPath: (currentPath) => set({ currentPath }),
  setLoading: (loading) => set({ loading }),
  setUsedSpace: (usedSpace) => set({ usedSpace }),
}))
