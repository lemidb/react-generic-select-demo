import { useInfiniteQuery } from "@tanstack/react-query"
import { employees, type Employee } from "@/data/employees"

export interface PaginatedEmployeesResponse {
  items: Employee[]
  page: number
  pageSize: number
  totalPages: number
  totalCount: number
}

interface FetchEmployeesParams {
  page: number
  pageSize: number
  searchTerm: string
}

// Simulate a backend call with filtering + pagination
async function mockFetchEmployees({
  page,
  pageSize,
  searchTerm,
}: FetchEmployeesParams): Promise<PaginatedEmployeesResponse> {
  const term = searchTerm.trim().toLowerCase()

  const filtered = term
    ? employees.filter((employee) => {
        const name = employee.name.toLowerCase()
        const department = employee.department.toLowerCase()
        const title = employee.title.toLowerCase()

        return (
          name.includes(term) ||
          department.includes(term) ||
          title.includes(term)
        )
      })
    : employees

  const totalCount = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize
  const end = start + pageSize

  const items = filtered.slice(start, end)

  // small delay to better showcase loading states
  await new Promise((resolve) => setTimeout(resolve, 400))

  return {
    items,
    page: safePage,
    pageSize,
    totalPages,
    totalCount,
  }
}

export const useInfiniteEmployeesQuery = (
  searchTerm: string,
  perPage: number
) => {
  const queryResult = useInfiniteQuery({
    queryKey: ["infinite-employees", searchTerm, perPage],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) =>
      mockFetchEmployees({
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

  const flatEmployees: Employee[] =
    queryResult.data?.pages.flatMap((page) => page.items) ?? []

  return {
    employees: flatEmployees,
    queryResult,
    fetchNextEmployees: queryResult.fetchNextPage,
    hasNextEmployeesPage: queryResult.hasNextPage,
    isFetchingNextEmployeesPage: queryResult.isFetchingNextPage,
    isFetchingEmployees: queryResult.isFetching,
  }
}


