import { NavLink } from 'react-router'

const locations = [
  { href: '/', text: 'Inicio' },
  { href: '/changes', text: 'Recientes' },
  { href: '/favorites', text: 'Favoritos' },
  { href: '/midudev', text: 'Midudev' }
]

export default function Navigation() {
  return (
    <nav
      className='ml-auto flex flex-row flex-nowrap justify-center items-center gap-1'
    >
      {locations.map(({ href = '', text = '' }, index) => {
        return <NavLink
          key={index}
          to={href}
          className={({ isActive }) => (`${isActive ? 'bg-midu' : ''} px-2 py-1 font-semibold hover:bg-midu rounded transition duration-300`)}
        >{text}</NavLink>
      })}
    </nav>
  )
}
