interface Props {
  message?: string
}

export default function Loading({ message = 'Cargando ...' }: Props) {
  return <div
    className='
      size-full m-auto my-20 px-2 py-1 max-w-6xl
      flex text-center justify-center items-center
    '
  >
    <div
      className='
        ring w-50 h-50 absolute rounded-full
        before:absolute before:top-0 before:left-0
        before:size-full before:rounded-full
        before:shadow-[0_0_5px_rgba(255,255,255,0.3)]
        animate-[ring_1s_linear_infinite]
      '
    ></div>
    <span
      className='
        text-text-primary text-xl leading-50 uppercase ease-in-out
        tracking-widest animate-[text_3s_linear_infinite]
      '
    >{message}</span>
  </div>
}
