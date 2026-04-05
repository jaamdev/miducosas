import useLocalStorage from '../../hooks/useLocalStorage.ts'
import ResourceCard from './ResourceCard.tsx'
import { type IResource } from '../../types/types.ts'

interface Props {
  resources: IResource[]
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
    return <h2 className='size-full px-2 py-1 m-auto mt-14 max-w-6xl text-xl text-center'>¡Hola! 👋<br />¿Listo para mover las manitas?</h2>
  } else if (!firstTime && resourcesNum === 0) {
    return <h2 className='size-full px-2 py-1 m-auto mt-14 max-w-6xl text-xl text-center'>¡Vaya!<br />No se encontró nada 😒</h2>
  } else {
    return <ul
      className='size-full px-2 py-1 m-auto max-w-6xl grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-1.5'
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
