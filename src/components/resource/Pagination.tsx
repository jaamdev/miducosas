import type { MouseEvent } from 'react'
import { NextIcon, PrevIcon } from '../Icons.tsx'

interface Props {
  currentPage: number
  totalPages: number
  changePage: (page: number) => void
}

export default function Pagination({ currentPage = 1, totalPages = 1, changePage }: Props) {
  const firstPage = currentPage === 1
  const lastPage = currentPage === totalPages

  const onChangePage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const page = Number(e.currentTarget.dataset.page)
    if (page !== currentPage) {
      changePage(page)
    }
  }

  const onNextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!lastPage) {
      changePage(currentPage + 1)
    }
  }

  const onPrevPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!firstPage) {
      changePage(currentPage - 1)
    }
  }

  const pageUrl = (page: number) => {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', page.toString())
    return `${url.pathname}?${url.searchParams.toString()}`
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return <nav
    className='
        size-full px-2 py-1 m-auto mt-1 mb-5 max-w-6xl
        w-max bg-secondary rounded-full border-2 border-border
        flex flex-row justify-center items-center gap-1
      '
  >
    <a
      title='Página anterior'
      href={pageUrl(!firstPage ? currentPage - 1 : 1)}
      onClick={onPrevPage}
      className='w-max px-4 py-2 mr-auto border-2 border-border rounded-full hover:bg-accent transition-colors duration-300 flex flex-row flex-nowrap justify-center items-center gap-2'
    >
      <PrevIcon className='size-5' />Atrás
    </a>

    {pages.map(page => <a
      href={pageUrl(page)}
      key={page}
      data-page={page}
      onClick={onChangePage}
      className={`
          size-10 border-2 border-border rounded-xl
          ${currentPage === page ? 'bg-linear-to-br from-accent to-tertiary shadow-[-2px_-2px_25px_var(--color-accent),2px_2px_25px_var(--color-tertiary)]' : ''} hover:bg-tertiary transition duration-300 flex justify-center items-center
        `}
    >
      {page}
    </a>)}

    <a
      title='Página siguiente'
      href={pageUrl(!lastPage ? currentPage + 1 : totalPages)}
      onClick={onNextPage}
      className='w-max px-4 py-2 ml-auto border-2 border-border rounded-full hover:bg-accent transition-colors duration-300 flex flex-row flex-nowrap justify-center items-center gap-2'
    >
      Siguiente<NextIcon className='size-5' />
    </a>
  </nav>
}
