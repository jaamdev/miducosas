import type { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  LinkIcon,
  VideoIcon,
  ExternalLinkIcon,
  StorageMinusIcon,
  StoragePlusIcon
} from '../Icons.tsx'
import { Category, type IResource } from '../../types/types.ts'

interface Props {
  resource: IResource
  addedToFavs: boolean
  handleFavs: (value: boolean, resource: IResource) => void
}

export default function ResourceCard({ resource, addedToFavs, handleFavs }: Props) {
  const navigate = useNavigate()
  const {
    id,
    url,
    vids,
    title,
    image,
    source,
    category,
    description
  } = resource

  const isItACourse = category === Category.Courses
  const prefixTitle = isItACourse
    ? 'Curso ' + title
    : title

  const backgroundStyle = isItACourse
    ? title.toLowerCase()
    : 'generic'

  const handleExternalClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }

  const handleCardClick = () => navigate(`/${id}`)

  const handleFavsClick = (
    e: MouseEvent<HTMLButtonElement>,
    addedToFavs: boolean,
    resource: IResource
  ) => {
    e.stopPropagation()
    handleFavs(addedToFavs, resource)
  }

  return <div
    role='link'
    tabIndex={0}
    title='Ver más ...'
    onClick={handleCardClick}
    className={`
      ${backgroundStyle}
      p-4 border border-border relative overflow-hidden cursor-pointer
      grid grid-rows-[max-content_1fr_min-content] rounded-xl
      before:bg-card before:absolute before:top-0 before:left-0
      before:size-full before:opacity-0 [.generic]:hover:before:opacity-100
      hover:before:opacity-30 before:transition-all
      before:duration-300 before:z-0 group
    `}
  >
    {
      image && <img
        src={`/${isItACourse ? 'icons' : 'books'}/${image}`}
        alt={`Imagen del logo ${title}`}
        className='
          w-24 absolute -bottom-5 -left-5
          rotate-12 opacity-75 z-0 group-hover:rotate-24
          transition-transform duration-300
        '
      />
    }
    <h2 className='text-text-primary text-xl font-semibold z-10'>{prefixTitle}</h2>
    <p className='text-text-primary my-1 z-10'>{description}</p>
    <div
      className='
        flex flex-row flex-nowrap justify-between items-center gap-1
      '
    >
      <div className='z-10'>
        {
          vids.length !== 0 && <h3 className='text-text-primary flex flex-row flex-nowrap justify-center items-center gap-2'>{vids.length}<VideoIcon className='size-6' /></h3>
        }
      </div>
      <nav
        className={`
          ${category === Category.Courses ? 'text-text-primary' : 'text-text-secondary'} flex flex-row flex-nowrap
          justify-center items-center gap-2 z-10
        `}
      >
        <Link title='Ir al recurso' onClick={handleExternalClick} to={url} rel='noopener noreferrer nofollow external' target='_blank'><LinkIcon className='size-6 hover:text-text-primary transition-colors duration-300' /></Link>
        <Link title='Ir a la fuente' onClick={handleExternalClick} to={source} rel='noopener noreferrer nofollow external' target='_blank'><ExternalLinkIcon className='size-6 hover:text-text-primary transition-colors duration-300' /></Link>
        <button
          title='Añadir a favoritos'
          onClick={(e) => handleFavsClick(e, !addedToFavs, resource)}
          className='cursor-pointer size-6 hover:text-text-primary transition-colors duration-300'
        >
          {
            addedToFavs
              ? <StorageMinusIcon />
              : <StoragePlusIcon />
          }
        </button>
      </nav>
    </div>
  </div>
}
