import { useCallback, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

const MIN_MARGIN = 64
const MAX_WIDTH = 1200

export default function PlayVid({ url, changeVid }: { url: string, changeVid: (url: string) => void }) {
  const [widthVid, setWidthVid] = useState<number>(() => {
    const newWidth = Math.ceil(window.innerWidth - MIN_MARGIN)

    if (newWidth <= 1200) {
      return newWidth
    } else return MAX_WIDTH
  })
  const heightVid = Math.ceil((widthVid * 9) / 16)

  const exitPlayer = useCallback(() => changeVid(''), [changeVid])

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.ceil(window.innerWidth - MIN_MARGIN)

      if (newWidth <= MAX_WIDTH) {
        setWidthVid(newWidth)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        exitPlayer()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKey)
    }
  }, [exitPlayer])

  return <dialog
    open={url.length !== 0}
    onClick={() => exitPlayer()}
    className='
      size-full fixed top-0 left-0 z-40 bg-[#30008870]
      flex justify-center items-center
    '
  >
    <ReactPlayer
      src={url}
      controls
      style={{
        width: widthVid,
        height: heightVid
      }}
    />
  </dialog>
}