import {
  useState,
  useRef,
  useId,
  type ChangeEvent,
  type FormEvent
} from 'react'
import { useSearchParams } from 'react-router'
import { SearchIcon } from '../Icons.tsx'
import { Category, type CategoryType } from '../../types/types.ts'

interface Props {
  changeSearch: (query: string, category: CategoryType) => void
}

export default function Search({ changeSearch }: Props) {
  const [searchParams] = useSearchParams()
  const [textSearch, setTextSearch] = useState<string>(() => {
    const searchParam = searchParams.get('q')
    const prevSearch = localStorage.getItem('prevSearch')

    if (searchParam) return searchParam
    else if (prevSearch) return prevSearch
    else return ''
  })
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(() => {
    const filtersParam = searchParams.get('category') as CategoryType | null
    const prevFilters = localStorage.getItem('prevFilters') as CategoryType | null

    if (filtersParam) return filtersParam
    else if (prevFilters) return prevFilters
    else return Category.Empty
  })
  const formRef = useRef<HTMLFormElement>(null)
  const timeoutRef = useRef<number>(0)
  const idSearch = useId()
  const idCategory = useId()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changeSearch(textSearch, selectedCategory)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value
    setTextSearch(newSearch)

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      changeSearch(newSearch, selectedCategory)
    }, 500)
  }

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as CategoryType
    setSelectedCategory(newCategory)
    changeSearch(textSearch, newCategory)
  }

  return <form
    ref={formRef}
    role='search-form'
    autoComplete='off'
    onSubmit={handleSubmit}
    className='
      size-full px-2 py-1 m-auto max-w-6xl
      grid grid-cols-[min-content_1fr_min-content_min-content]
      justify-center items-center gap-0.5 text-black
    '
  >
    <label
      htmlFor='input-search'
      className='p-1 bg-white rounded-l'
    >
      <SearchIcon
        className='size-6'
      />
    </label>
    <input
      id='input-search'
      type='search'
      name={idSearch}
      placeholder='cursos, sql, agentes...'
      value={textSearch}
      onChange={handleSearch}
      className='p-1 bg-white'
    />
    <select
      id='input-select'
      name={idCategory}
      value={selectedCategory}
      onChange={handleCategory}
      className='h-full p-1 bg-white capitalize'
    >
      {Object.values(Category).map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <input
      type='submit'
      value='Buscar'
      className='
          px-2 py-1 bg-white rounded-r
          hover:text-white hover:bg-midu
          disabled:bg-gray-300 cursor-pointer
        '
    />
  </form>
}
