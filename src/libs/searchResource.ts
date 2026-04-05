import {
  Category,
  type IResource,
  type CategoryType
} from '../types/types.ts'

export default function searchResource(
  resources: IResource[] = [],
  query: string = '',
  category: CategoryType = Category.Empty
): IResource[] {
  const terms = query.toLowerCase()
    .split(' ').filter(term => term)

  const categorizedResources = category !== Category.Empty
    ? resources.filter(resource => resource.category === category)
    : resources

  return categorizedResources.filter(resource => {
    const textSearch = (resource.tags.join(' ') + ' ' + resource.title).toLowerCase()

    return terms.every(term => textSearch.includes(term))
  })
}