import useLocalStorage from '../../hooks/useLocalStorage.ts'
import ResourceCard from './ResourceCard.tsx'
import { type IResource } from '../../types/types.ts'

interface Props {
  resources: IResource[]
}

function AnchorExample({ href }: { href: string }) {
  return <a
    href={`?q=${href.toLowerCase()}`}
    title={`Buscar por ${href}`}
    className='px-2 py-1 bg-linear-to-tr from-accent to-tertiary rounded hover:to-accent transition-colors duration-300'
  >
    {href}
  </a>
}

export default function ResourceList({ resources }: Props) {
  const { currentFavorites, saveOne, removeOne } = useLocalStorage()
  const firstTime = localStorage.getItem('prevSearch') ? false : true
  const resourcesNum = resources.length

  const handleFavs = (value: boolean, resource: IResource) => {
    if (value) {
      saveOne(resource)
    } else {
      removeOne(resource)
    }
  }

  if (firstTime && resourcesNum === 0) {
    return <>
      <h2 className='size-full px-2 py-1 m-auto mt-14 max-w-6xl text-xl text-center'>¡Hola! 👋<br />¿Listo para mover las manitas?</h2>
      <div className='px-4 py-2 m-auto mt-2 max-w-6xl flex flex-row flex-wrap justify-center items-center gap-2 border-2 border-border bg-secondary rounded-full'>
        <h3 className='mr-2'>¿ Qué toca hoy ? 👉 </h3>
        <AnchorExample href='Cursos' />
        <AnchorExample href='Skills' />
        <AnchorExample href='SQL' />
        <AnchorExample href='Deploy' />
      </div>
    </>
  } else if (!firstTime && resourcesNum === 0) {
    return <h2 className='size-full px-2 py-1 m-auto mt-14 max-w-6xl text-xl text-center'>¡Vaya!<br />No se encontró nada 😒</h2>
  } else {
    return <ul
      className='size-full px-2 py-1 m-auto max-w-6xl grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 auto-rows-fr'
    >
      {resources.map(resource => {
        const finded = currentFavorites.find(i => i.id === resource.id)
          ? true : false

        return (
          <ResourceCard
            key={resource.id}
            resource={resource}
            addedToFavs={finded}
            handleFavs={handleFavs}
          />
        )
      })}
    </ul>
  }
}
