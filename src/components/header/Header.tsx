import { Link } from 'react-router'
import Navigation from '../navigation/Navigation.tsx'

export default function Header() {
  return <header
    className='
      size-full m-auto mt-5 px-2 py-3 max-w-6xl z-30
      sticky top-0 left-0 bg-[#000000ab]
      backdrop-blur-xs flex flex-row flex-nowrap gap-1
    '
  >
    <h1
      className='
        bg-linear-to-r from-10% from-midu to-purple-400
        bg-clip-text text-transparent text-center text-2xl
        font-bold tracking-wide hover:tracking-wider
        transition-all duration-300
      '
    >
      <Link to='/'>MiduCosas</Link>
    </h1>
    <Navigation />
  </header>
}
