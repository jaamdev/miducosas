import { useState } from 'react'
import Pagination from './Pagination.tsx'
import PlayVid from './PlayVid.tsx'
import { CodeIcon, DemoIcon, PlayIcon, YouTubeIcon } from '../Icons.tsx'
import { VIDS_PER_PAGE } from '../../config/config.ts'
import type { IVids } from '../../types/types.ts'

interface Props {
  vids: IVids[]
}

const linksContainer = {
  withoutButtons: 'size-full p-1 bg-gradient-to-b from-5% from-purple-800 to-midudark rounded-tl-lg rounded-tr-lg relative flex flex-row flex-nowrap justify-around items-center gap-2',
  withButtons: 'size-full p-1 bg-gradient-to-b from-5% from-purple-800 to-midudark rounded-tl-lg rounded-tr-lg relative flex flex-row flex-nowrap justify-around items-center gap-2 before:bg-midudark before:size-4 before:rounded before:absolute before:-bottom-2 before:-right-2 before:-z-10 after:bg-background after:size-5 after:rounded-lg after:absolute after:bottom-0 after:-right-5'
}

export default function VidsList({ vids }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [vid, setVid] = useState<string>('')

  const changeVid = (url: string) => {
    setVid(url)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = Math.ceil(vids.length / VIDS_PER_PAGE)
  const paginatedVidsList = vids.slice(
    (currentPage - 1) * VIDS_PER_PAGE,
    currentPage * VIDS_PER_PAGE
  )

  return <>
    {vid.length !== 0 && <PlayVid url={vid} changeVid={changeVid} />}
    {totalPages > 1
      && <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />}
    <ul
      className='
      size-full py-1
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2
    '
    >
      {paginatedVidsList.map(({ title, demo, code, url }) => {
        const pathname = new URL(url).pathname.substring(1)
        const urlImg = `https://img.youtube.com/vi/${pathname}/maxresdefault.jpg`

        return <div
          key={url}
          className='
            grid grid-cols-[min-content_1fr]
            grid-rows-[min-content_min-content_1fr]
          '
        >
          <div
            className={
              url || demo || code
                ? linksContainer.withButtons
                : linksContainer.withoutButtons
            }
          >
            {url && <button
              title='Reproducir vídeo'
              onClick={() => setVid(url)}
              className='
                  min-w-8 text-white cursor-pointer
                  hover:scale-110 transition duration-300
                '
            >
              <PlayIcon />
            </button>}
            {demo && <a
              title='Ver la demo'
              href={demo}
              target='_blank'
              rel='noopener noreferrer'
              className='
                  min-w-8 text-white
                  hover:scale-110 transition duration-300
                '
            >
              <DemoIcon />
            </a>}
            {code && <a
              title='Ver el código'
              href={code}
              target='_blank'
              rel='noopener noreferrer'
              className='
                  min-w-8 text-white
                  hover:scale-110 transition duration-300
                '
            >
              <CodeIcon />
            </a>}
            {url && <a
              title='Ver en youtube'
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='
                  min-w-8 text-white
                  hover:scale-110 transition duration-300
                '
            >
              <YouTubeIcon className='fill-red-500' />
            </a>}
          </div>
          <figure
            className={`size-full p-1 bg-midudark col-span-2 row-start-2 ${url || demo || code ? 'rounded-tr-lg' : 'rounded-t-lg'}`}
          >
            <img
              width={300}
              height={300}
              src={urlImg}
              title='Reproducir vídeo'
              alt={`Miniatura del vídeo ${title}`}
              className='
                w-full overflow-hidden object-cover
                aspect-video rounded-lg z-0
              '
            />
          </figure>
          <h2
            className='
              size-full px-2 pb-1 bg-midudark rounded-b-lg
              col-span-2 row-start-3
            '
          >{title}</h2>
        </div>
      })}
    </ul>
  </>
}
