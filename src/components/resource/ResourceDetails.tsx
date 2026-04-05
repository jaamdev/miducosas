import VidsList from './VidsList.tsx'
import { ExternalLinkIcon, LinkIcon, PrevIcon } from '../Icons.tsx'
import { Category, type IResource } from '../../types/types.ts'

interface Props {
  resource: IResource
  prevButton: () => void
}

export default function ResourceDetails({ resource, prevButton }: Props) {
  const {
    title = '',
    description = '',
    category = Category.Resources,
    image = '',
    url = '',
    tags = [],
    vids = [],
    source = ''
  } = resource

  const Icon = {
    [Category.Empty]: '',
    [Category.Resources]: '',
    [Category.Courses]: '/icons/',
    [Category.Books]: '/books/'
  }[category]

  let tagLimit: string[] = []

  if (tags.length > 3) {
    tagLimit = tags.slice(0, 3)
    tagLimit.push(`${tags.length - 3} más...`)
  } else tagLimit = [...tags]

  return <div
    className='
      size-full px-2 py-1 m-auto max-w-6xl
      grid grid-cols-1 justify-center items-center gap-2
      sm:grid-cols-[max-content_1fr]
    '
  >
    <div
      className='size-full px-2 max-w-none sm:max-w-50 flex flex-col items-center gap-4'
    >
      {image && <img
        width={200}
        height={200}
        src={Icon + image}
        alt={`Imagen de ${title}`}
        className='w-full mt-5'
      />}
      <div className='w-full flex flex-row justify-center items-center gap-4'>
        <a title='Ir al recurso' href={url} target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition duration-300'>
          <LinkIcon className='size-10' />
        </a>
        {source && <a title='Ir a la fuente' href={source} target='_blank' rel='noopener noreferrer' className='hover:scale-110 transition duration-300'>
          <ExternalLinkIcon className='size-8 text-white' />
        </a>}
      </div>
      <button
        title='Volver'
        onClick={prevButton}
        className='px-2 py-1 bg-midudark rounded hover:bg-midu cursor-pointer transition duration-300 text-center grid grid-cols-[min-content_max-content] justify-center items-center gap-1'
      >
        <PrevIcon className='size-6' />
        <span>Volver</span>
      </button>
      <p className='w-full flex flex-row flex-wrap justify-center items-center gap-2 select-none'>
        {tagLimit.map(tag => <span key={tag} className='px-2 py-1 bg-radial-[at_0%_25%] from-purple-900 to-midudark rounded'>{tag}</span>)}
      </p>
    </div>
    <div className='w-full'>
      <h2 className='max-h-20 py-1 text-3xl font-bold text-center sm:text-left'>{title}</h2>
      <p className='h-max py-1 text-center sm:text-left'>{description}</p>
      {vids.length > 0 && <VidsList vids={vids} />}
    </div>
  </div>
}
