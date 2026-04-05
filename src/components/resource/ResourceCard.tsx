import { Link } from 'react-router'
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

  return <li
    className='
      size-full grid grid-cols-[min-content_min-content_1fr]
    '
  >
    <div
      className='
        h-min py-1 pl-1 mb-1 bg-white rounded-l-lg
        flex flex-col flex-nowrap justify-start items-center gap-1
      '
    >
      {url && <Link
        to={url}
        rel='noopener noreferrer nofollow external'
        target='_blank'
        title='Ir al recurso'
      >
        <LinkIcon className='size-6 text-black hover:text-slate-500 transition-colors duration-300' />
      </Link>}
      {source && <Link
        to={source}
        rel='noopener noreferrer nofollow external'
        target='_blank'
        title='Ir a la fuente'
      >
        <ExternalLinkIcon className='size-6 text-black hover:text-slate-500 transition-colors duration-300' />
      </Link>}
      <button
        title={addedToFavs ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
        onClick={() => handleFavs(!addedToFavs, resource)}
      >
        {
          addedToFavs
            ? <StorageMinusIcon className='size-6 text-red-500 cursor-pointer' />
            : <StoragePlusIcon className='size-6 text-black hover:text-slate-500 transition-colors duration-300 cursor-pointer' />
        }
      </button>
    </div>
    <div className='w-1 h-full mr-0.5 bg-white rounded-bl-lg'></div>
    <Link
      to={id}
      className={`
        p-1 rounded-r-lg group
        relative overflow-hidden ${backgroundStyle}  
      `}
    >
      {(image && isItACourse) && <img
        width={24}
        height={24}
        src={'/icons/' + image}
        alt={`Imagen del recurso ${title}`}
        className='
          size-18 absolute -bottom-3 -left-3 rotate-12 z-10
          group-hover:rotate-20 transition duration-300
        '
      />}
      {vids && vids.length > 0 && <h4 className='px-2 py-0.5 text-white text-sm font-semibold absolute bottom-0 right-0 z-20 flex flex-row flex-nowrap justify-center items-center gap-1'><VideoIcon />{vids.length}</h4>}
      <h3 className='w-max px-2 py-1 bg-white text-black text-sm rounded-tl absolute z-30 bottom-0 right-0 translate-y-10 group-hover:translate-y-0 transition-transform duration-300'>Ver más...</h3>
      <h2 className='text-white font-semibold relative z-20'>{prefixTitle}</h2>
      <hr className='my-1 text-white relative z-20' />
      <p className='text-white text-sm relative z-20'>{description}</p>
    </Link>
  </li>
}
