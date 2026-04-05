export const Category = {
  Empty: 'todos',
  Resources: 'recursos',
  Courses: 'cursos',
  Books: 'libros'
} as const

export type CategoryType = typeof Category[keyof typeof Category]

export interface IVids {
  title: string
  demo: string
  code: string
  url: string
}

export interface INewFeature {
  date: number
  resources: {
    id: `${string}-${string}-${string}-${string}-${string}`,
    title: string
  }[]
}

export interface IResource {
  id: `${string}-${string}-${string}-${string}-${string}`
  title: string
  description?: string
  image?: string
  url: string
  vids?: IVids[]
  category: CategoryType
  tags: string[]
  source: string
}

export interface IAPI<T> {
  ok: boolean
  data: T
}