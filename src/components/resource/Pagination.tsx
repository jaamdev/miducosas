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

  const buttonCommonStyles = 'size-6 p-0.5 transition-colors duration-300'

  const buttonPrevStyles = firstPage
    ? buttonCommonStyles + ' rounded-l ' + 'bg-slate-700 pointer-events-none'
    : buttonCommonStyles + ' rounded-l ' + 'bg-midudark hover:bg-midu'

  const buttonNextStyles = lastPage
    ? buttonCommonStyles + ' rounded-r ' + 'bg-slate-700 pointer-events-none'
    : buttonCommonStyles + ' rounded-r ' + 'bg-midudark hover:bg-midu'

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
      size-full px-2 py-1 m-auto max-w-6xl select-none
      flex flex-row justify-center items-center gap-1
    '
  >
    <a
      href={pageUrl(!firstPage ? currentPage - 1 : 1)}
      onClick={onPrevPage}
      className={buttonPrevStyles}
    >
      <PrevIcon />
    </a>

    {pages.map(page => <a
      href={pageUrl(page)}
      key={page}
      data-page={page}
      onClick={onChangePage}
      className={`
        size-6 px-2 py-1 font-semibold hover:bg-midu
        flex flex-col justify-center items-center
        transition-colors duration-300
        ${currentPage === page ? 'bg-midu' : 'bg-midudark'}
      `}
    >
      {page}
    </a>)}

    <a
      href={pageUrl(!lastPage ? currentPage + 1 : totalPages)}
      onClick={onNextPage}
      className={buttonNextStyles}
    >
      <NextIcon />
    </a>
  </nav>
}
