import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router'
import { MenuIcon, CloseIcon } from '../Icons.tsx'

const locations = [
  { href: '/', text: 'Inicio' },
  { href: '/changes', text: 'Recientes' },
  { href: '/favorites', text: 'Favoritos' },
  { href: '/midudev', text: 'Midudev' }
]

export default function Navigation() {
  const [open, setOpen] = useState<boolean>(false)
  const $nav = useRef<HTMLElement>(null)
  const $btnMenu = useRef<HTMLButtonElement>(null)

  const handlerMenu = (value?: boolean) => {
    if (value !== undefined) setOpen(value)
    else setOpen(!open)
  }

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 640 && open === true) {
        setOpen(false)
      }
    }

    if (open) {
      $nav.current?.classList.add('open')
    } else $nav.current?.classList.remove('open')

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [open])

  return (
    <div
      className='menu-ctn ml-auto'
    >
      <nav
        ref={$nav}
        className='
          menu flex flex-row flex-nowrap justify-center items-center gap-2
        '
      >
        {locations.map(({ href = '', text = '' }, index) => {
          return <NavLink
            key={index}
            to={href}
            onClick={() => setTimeout(
              () => handlerMenu(false), 200)
            }
            className={({ isActive }) => (`
            ${isActive ? 'before:scale-x-100' : ''}
            ${isActive ? 'text-accent' : 'text-text-primary'}
            px-2 py-1 relative before:w-full before:h-1
            before:absolute before:bg-accent before:-bottom-1
            before:left-0 before:scale-x-0 before:origin-right 
            before:transition-transform before:duration-300
            before:ease-in-out hover:before:scale-x-100
            hover:before:origin-left
          `)}
          >{text}</NavLink>
        })}
      </nav>
      <button
        ref={$btnMenu}
        onClick={() => handlerMenu()}
        className='btnMenu cursor-pointer'
      >
        {
          open
            ? <CloseIcon className={'size-6'} />
            : <MenuIcon className={'size-6'} />
        }
      </button>
    </div>
  )
}
