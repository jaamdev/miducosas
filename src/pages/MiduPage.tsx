import { Link } from 'react-router'
import { ExternalLinkIcon } from '../components/Icons.tsx'
import socialMedia from '../consts/socialMedia.ts'
import websites from '../consts/websites.ts'

function Item({ title = '', img = '', url = '', className = '' }) {
  return <Link
    to={url}
    title={url}
    target='_blank'
    rel='noopener noreferrer nofollow external'
    className={`
      w-full p-2 rounded-md text-black bg-slate-200 group
      hover:bg-slate-300 transition-colors duration-300 relative
      flex flex-row flex-nowrap not-sm:justify-center items-center gap-2
      ${className}
    `}
  >
    <img src={img} className='w-6 rounded-md transition-all duration-300 group-hover:-translate-y-0.5' alt={'Logotipo de ' + title} />
    <h3 className='text-sm font-medium transition-all duration-300 group-hover:-translate-y-0.5'>{title}</h3>
    <ExternalLinkIcon className='w-4 absolute top-1 right-1 z-10' />
  </Link>
}

export default function MiduPage() {
  return <section
    className='size-full px-2 py-1 m-auto max-w-6xl'
  >
    <article className='w-full m-auto rounded-md text-center flex flex-col flex-nowrap gap-2'>
      <img src='/social/midudev.jpg' className='mt-10 size-40 rounded-md overflow-hidden m-auto object-cover' />
      <h2 className='text-xl font-bold tracking-wide'>💛 Midudev 💜</h2>
      <h3 className='font-semibold'>Desarrollador FullStack</h3>
      <h2 className='text-center'>
        ¡Entérate de <strong>TODO</strong> en las redes de Midudev!
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 justify-center gap-1'>
        <div className='p-1 rounded-md bg-linear-to-b from-violet-500 to-background grid grid-rows-[min-content_auto] grid-cols-1 sm:grid-cols-2 justify-center gap-1'>
          <h4 className='col-span-1 sm:col-span-2'>Redes</h4>
          {socialMedia.map(({
            title, img, url
          }) => <Item
              key={url}
              url={url}
              title={title}
              img={'/social/' + img}
            />)}
        </div>
        <div className='p-1 rounded-md bg-linear-to-b from-midu to-background grid grid-cols-1 md:grid-cols-2 justify-center gap-1'>
          <h4 className='col-span-1 md:col-span-2'>Sitios</h4>
          {websites.map(({
            title, img, url
          }) => <Item
              key={url}
              url={url}
              title={title}
              img={'/sites/' + img}
              className={
                websites.length % 2 === 0
                  ? '' : 'col-span-1 md:last:col-span-2'
              }
            />)}
        </div>
      </div>
    </article>
  </section>
}
