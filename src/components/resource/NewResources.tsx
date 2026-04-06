import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import Loading from '../loading/Loading.tsx'
import { API } from '../../config/config.ts'
import type { IAPI, INewFeature } from '../../types/types.ts'

export default function NewResources() {
  const [loading, setLoading] = useState<boolean>(true)
  const [state, setState] = useState<INewFeature[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const getData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API}/changes`, { signal })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result: IAPI<INewFeature[]> = await response.json()
        setState(result.data)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch abortado')
        } else {
          toast.error('No se pudo recuperar los nuevos recursos.')
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }

    getData()
    return () => abortController.abort()
  }, [])

  return loading
    ? <Loading />
    : state.length !== 0 && <section
      className='size-full my-2 m-auto px-2 py-1 max-w-6xl'
    >
      <h2 className='my-4 text-xl text-center'>Recientes:</h2>

      {
        state.map((data, index) => (
          <article key={index} className='size-full mb-1 border-b border-white'>
            <div className='p-1 my-2 grid grid-cols-[6rem_1fr] justify-center items-center gap-1'>
              <h3 className='text-right'>{new Date(data.date).toLocaleDateString()}:</h3>
              <ul className='flex flex-row flex-wrap justify-center items-center gap-2'>
                {data.resources.map(({ id, title }) => (
                  <Link key={id} to={`/${id}`} className='px-2 py-1 rounded bg-midudark hover:bg-midu transition-colors duration-300'>
                    {title}
                  </Link>
                ))}
              </ul>
            </div>
          </article>
        ))
      }
    </section>
}
