interface Props {
  message?: string
}

export default function Loading({ message = 'Cargando...' }: Props) {
  return <h2
    className='
        w-full text-xl font-bold text-center
      '
  >
    {message}
  </h2>
}
