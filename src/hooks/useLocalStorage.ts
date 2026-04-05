import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import type { IResource } from '../types/types.ts'

export default function useLocalStorage() {
  const [state, setState] = useState<IResource[]>(
    JSON.parse(localStorage.getItem('resources') || '[]')
  )

  const saveOne = (resource: IResource) => {
    const shortTitle = resource.title.split(' ').length > 3
      ? resource.title.split(' ').slice(0, 3).join(' ') + ' ...'
      : resource.title

    toast.success(`${shortTitle} añadido a favoritos.`)
    setState(prev => ([
      resource,
      ...prev
    ]))
  }

  const removeOne = (resource: IResource) => {
    const shortTitle = resource.title.split(' ').length > 3
      ? resource.title.split(' ').slice(0, 3).join(' ') + ' ...'
      : resource.title

    toast.error(`${shortTitle} eliminado de favoritos.`)
    setState(prev => prev.filter(i => i.id !== resource.id))
  }

  const clearAll = () => {
    const numResources = state.length
    if (numResources === 1) {
      toast.error(`Eliminado ${numResources} elemento de favoritos.`)
      setState([])
    } else if (numResources > 1) {
      toast.error(`Eliminados ${numResources} elementos de favoritos.`)
      setState([])
    }
  }

  const setResources = (resources: IResource[]) => {
    setState(resources)
  }

  useEffect(() => {
    if (state.length !== 0) {
      localStorage.setItem('resources', JSON.stringify(state))
    } else localStorage.removeItem('resources')
  }, [state])

  return {
    currentFavorites: state,
    setResources,
    saveOne,
    removeOne,
    clearAll
  }
}
