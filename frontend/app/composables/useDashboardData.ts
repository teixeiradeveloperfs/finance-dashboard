export type DashboardAccount = {
  name: string
  type: string
  amount: string
  badge: string
  color: string
}

export type DashboardProject = {
  name: string
  amount: string
  trend: string
  positive: boolean
  color: string
}

export type DashboardTransaction = {
  description: string
  category: string
  project: string
  account: string
  type: 'Receita' | 'Despesa'
  value: string
  date: string
  positive: boolean
}

export type DashboardLegendItem = {
  name: string
  value: string
  color: string
}

export type WhatsappCommandExample = {
  text: string
  detail: string
  tag: 'Receita' | 'Despesa'
  positive: boolean
}

type DashboardData = {
  accounts: DashboardAccount[]
  projects: DashboardProject[]
  transactions: DashboardTransaction[]
  categoryLegend: DashboardLegendItem[]
  commandExamples: WhatsappCommandExample[]
}

const emptyDashboardData = (): DashboardData => ({
  accounts: [],
  projects: [],
  transactions: [],
  categoryLegend: [],
  commandExamples: []
})

export const useDashboardData = () => {
  const config = useRuntimeConfig()
  const requestHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {}
  const { data, pending, error, refresh } = useAsyncData('dashboard-data', async () => $fetch<DashboardData>('/dashboard', {
    baseURL: config.public.apiBaseUrl,
    credentials: 'include',
    headers: import.meta.server && requestHeaders.cookie ? {
      cookie: requestHeaders.cookie
    } : undefined
  }), {
    default: emptyDashboardData
  })

  const dashboardData = computed(() => data.value || emptyDashboardData())

  return {
    accounts: computed(() => dashboardData.value.accounts),
    projects: computed(() => dashboardData.value.projects),
    transactions: computed(() => dashboardData.value.transactions),
    categoryLegend: computed(() => dashboardData.value.categoryLegend),
    commandExamples: computed(() => dashboardData.value.commandExamples),
    isLoadingDashboardData: pending,
    dashboardDataError: error,
    refreshDashboardData: refresh
  }
}
