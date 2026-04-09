export default function Footer() {
  return <footer
    className='
        w-full m-auto mt-10 pl-5 py-2 max-w-6xl bg-secondary
        sticky bottom-0 left-0 flex flex-nowrap gap-5 z-30
      '
  >
    <ul
      className='
        flex flex-row justify-center items-center gap-2
      '
    >
      <a className='size-6 group' href='https://github.com/jaamdev' rel='noopener noreferrer nofollow external' target='_blank'>
        <svg className="group-hover:fill-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" role="img" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
      </a>
      <a className='size-6 group' href='https://linkedin.com/in/jaamdev' rel='noopener noreferrer nofollow external' target='_blank'>
        <svg className="group-hover:fill-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><title>LinkedIn</title><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2M8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75M19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.7.7 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
      </a>
    </ul>
    <h2
      className='text-text-primary flex justify-center items-center'
    >
      Creado con 💚 JaamDev 💛
    </h2>
  </footer>
}
