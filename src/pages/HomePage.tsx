import useResource from '../hooks/useResource.ts'
import Loading from '../components/loading/Loading.tsx'
import Search from '../components/search/Search.tsx'
import ResourceList from '../components/resource/ResourceList.tsx'
import Pagination from '../components/resource/Pagination.tsx'

export default function HomePage() {
  const {
    isLoading,
    resourcesList,
    currentPage,
    totalPages,
    changeSearch,
    changePage
  } = useResource()

  return <>
    <Search changeSearch={changeSearch} />
    {!isLoading && totalPages > 1
      && <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />}
    {isLoading
      ? <Loading message='Buscando...' />
      : <ResourceList resources={resourcesList} />}
  </>
}
