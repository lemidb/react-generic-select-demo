import { useInfiniteQuery } from "@tanstack/react-query"
import { skills, type Skill } from "@/data/skills"

export interface PaginatedSkillsResponse {
  items: Skill[]
  page: number
  pageSize: number
  totalPages: number
  totalCount: number
}

interface FetchSkillsParams {
  page: number
  pageSize: number
  searchTerm: string
}

async function mockFetchSkills({
  page,
  pageSize,
  searchTerm,
}: FetchSkillsParams): Promise<PaginatedSkillsResponse> {
  const term = searchTerm.trim().toLowerCase()

  const filtered = term
    ? skills.filter((skill) => {
        const name = skill.name.toLowerCase()
        const category = skill.category.toLowerCase()
        const level = skill.level.toLowerCase()

        return (
          name.includes(term) ||
          category.includes(term) ||
          level.includes(term)
        )
      })
    : skills

  const totalCount = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize
  const end = start + pageSize

  const items = filtered.slice(start, end)

  // small delay to make loading state visible
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    items,
    page: safePage,
    pageSize,
    totalPages,
    totalCount,
  }
}

// Keep the same name (useSkillsQuery) but make it infinite + paginated,
// mirroring the useInfiniteEmployeesQuery behavior.
export const useSkillsQuery = (searchTerm: string, perPage: number) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["infinite-skills", searchTerm, perPage],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      mockFetchSkills({
        page: pageParam,
        pageSize: perPage,
        searchTerm,
      }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page
      const totalPages = lastPage.totalPages

      return currentPage < totalPages ? currentPage + 1 : undefined
    },
  })

  const flatSkills: Skill[] =
    queryResult.data?.pages.flatMap((page) => page.items) ?? []

  return {
    skills: flatSkills,
    queryResult,
    fetchNextSkills: queryResult.fetchNextPage,
    hasNextSkillsPage: queryResult.hasNextPage,
    isFetchingNextSkillsPage: queryResult.isFetchingNextPage,
    isFetchingSkills: queryResult.isFetching,
  }
}


