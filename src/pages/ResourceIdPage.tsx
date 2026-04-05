import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import Loading from '../components/loading/Loading.tsx'
import ResourceDetails from '../components/resource/ResourceDetails.tsx'
import { API } from '../config/config.ts'
import type { IAPI, IResource } from '../types/types.ts'

export default function ResourceIdPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [resource, setResource] = useState<IResource | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    async function fetchData() {
      const resourceId = params.id

      if (!resourceId) return

      try {
        setLoading(true)
        const response = await fetch(
          `${API}/resources/${resourceId}`,
          { signal }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: IAPI<IResource> = await response.json()
        const foundResource = result.data

        if (foundResource) {
          setResource(foundResource)
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch abortado.')
        } else {
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => abortController.abort()
  }, [params.id])

  if (loading) return <Loading />

  if (!resource) {
    return <h2
      className='
        w-full text-xl font-bold text-center
      '
    >
      El recurso no existe
    </h2>
  }

  return <ResourceDetails
    resource={resource as IResource}
    prevButton={() => navigate(-1)}
  />
}
