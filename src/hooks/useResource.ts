import { useSearchParams } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { API, ITEMS_PER_PAGE } from '../config/config.ts'
import {
  Category,
  type IResource,
  type CategoryType,
  type IAPI
} from '../types/types.ts'

export default function useResource() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resources, setResources] = useState<IResource[]>([])
  const [querySearch, setQuerySearch] = useState<string>(() => {
    const searchParam = searchParams.get('q')
    const prevSearch = localStorage.getItem('prevSearch')

    if (searchParam) return searchParam
    else if (prevSearch) return prevSearch
    else return ''
  })
  const [filters, setFilters] = useState<CategoryType>(() => {
    const filtersParam = searchParams.get('category') as CategoryType | null
    const prevFilters = localStorage.getItem('prevFilters') as CategoryType | null

    if (filtersParam) return filtersParam
    else if (prevFilters) return prevFilters
    else return Category.Empty
  })
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = Number(searchParams.get('page')) || null
    const prevPage = Number(localStorage.getItem('prevPage')) || null

    if (pageParam) return pageParam
    else if (prevPage) return prevPage
    else return 1
  })
  const prevQuerySearch = useRef<string>('')
  const prevFilters = useRef<CategoryType>(Category.Empty)

  const changeSearch = async (query: string, category: CategoryType) => {
    if (query.length <= 2) return
    if (query === querySearch && category === filters) return

    setQuerySearch(query)
    setFilters(category)
    setCurrentPage(1)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(resources.length / ITEMS_PER_PAGE)

  const resourcesPaginated = resources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    if (resources.length !== 0 && (currentPage > totalPages || currentPage < 1)) {
      setCurrentPage(1)
    }
  }, [resources, currentPage, totalPages])

  useEffect(() => {
    localStorage.setItem('prevSearch', querySearch)
    localStorage.setItem('prevFilters', filters)
    localStorage.setItem('prevPage', currentPage.toString())
  }, [querySearch, filters, currentPage])

  useEffect(() => {
    setSearchParams((params) => {
      if (querySearch) {
        params.set('q', querySearch)
      } else params.delete('q')

      if (filters !== Category.Empty) {
        params.set('category', filters)
      } else params.delete('category')

      if (currentPage !== 1) {
        params.set('page', currentPage.toString())
      } else params.delete('page')

      return params
    })
  }, [querySearch, filters, currentPage, setSearchParams])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    async function fetchData() {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${API}/resources?q=${querySearch}&category=${filters}`,
          { signal }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: IAPI<IResource[]> = await response.json()
        const resourceList = result.data

        prevQuerySearch.current = querySearch
        prevFilters.current = filters
        setResources(resourceList)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch abortado')
        } else {
          toast.error('No se pudo recuperar los recursos.')
          console.error(error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (querySearch.length <= 2) return
    if (prevQuerySearch.current === querySearch && prevFilters.current === filters) return

    fetchData()

    return () => abortController.abort()
  }, [querySearch, filters])

  return {
    isLoading,
    resourcesList: resourcesPaginated,
    currentPage,
    totalPages,
    changeSearch,
    changePage
  }
}
