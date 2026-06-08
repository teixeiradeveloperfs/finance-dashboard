import type { FastifyPluginAsync } from 'fastify'
import { createSupabaseClient } from '../lib/supabase.js'

type AccountRow = {
  id: string
  name: string
  type: string
  balance_cents: number
  badge: string
  color: string
}

type ProjectRow = {
  id: string
  name: string
  color: string
  trend_percent: number
}

type CategoryRow = {
  id: string
  name: string
  kind: 'income' | 'expense'
  color: string
}

type TransactionRow = {
  id: string
  description: string
  kind: 'income' | 'expense'
  amount_cents: number
  occurred_on: string
  account?: { name: string } | { name: string }[] | null
  project?: { name: string } | { name: string }[] | null
  category?: { name: string, color: string } | { name: string, color: string }[] | null
}

const formatCurrency = (cents: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(cents / 100)

const formatTrend = (value: number) => `${value >= 0 ? '+' : ''}${value.toLocaleString('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
})}%`

const formatDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}

const firstRelation = <T>(value: T | T[] | null | undefined) => Array.isArray(value) ? value[0] : value

export const dashboardRoutes: FastifyPluginAsync = async (app) => {
  app.get('/dashboard', {
    preHandler: app.requireAuth
  }, async (request, reply) => {
    const accessToken = request.authTokens?.accessToken

    if (!accessToken) {
      return reply.code(401).send({
        message: 'Sessao invalida ou expirada.'
      })
    }

    const supabase = createSupabaseClient(accessToken)
    const [accountsResult, projectsResult, categoriesResult, transactionsResult] = await Promise.all([
      supabase
        .from('finance_accounts')
        .select('id,name,type,balance_cents,badge,color')
        .order('created_at', { ascending: true }),
      supabase
        .from('finance_projects')
        .select('id,name,color,trend_percent')
        .order('created_at', { ascending: true }),
      supabase
        .from('finance_categories')
        .select('id,name,kind,color')
        .order('created_at', { ascending: true }),
      supabase
        .from('finance_transactions')
        .select('id,description,kind,amount_cents,occurred_on,account:finance_accounts(name),project:finance_projects(name),category:finance_categories(name,color)')
        .order('occurred_on', { ascending: false })
        .limit(20)
    ])

    const error = accountsResult.error || projectsResult.error || categoriesResult.error || transactionsResult.error

    if (error) {
      app.log.error(error, 'Dashboard data query failed')

      return reply.code(400).send({
        message: error.message || 'Nao foi possivel carregar os dados financeiros.'
      })
    }

    const accounts = (accountsResult.data as AccountRow[] | null || []).map((account) => ({
      name: account.name,
      type: account.type,
      amount: formatCurrency(account.balance_cents),
      badge: account.badge || account.name.slice(0, 2).toLowerCase(),
      color: account.color
    }))

    const transactionRows = (transactionsResult.data as unknown as TransactionRow[] | null) || []

    const transactions = transactionRows.map((transaction) => {
      const positive = transaction.kind === 'income'
      const account = firstRelation(transaction.account)
      const project = firstRelation(transaction.project)
      const category = firstRelation(transaction.category)

      return {
        description: transaction.description,
        category: category?.name || (positive ? 'Receita' : 'Despesa'),
        project: project?.name || '-',
        account: account?.name || '-',
        type: positive ? 'Receita' : 'Despesa',
        value: `${positive ? '+' : '-'} ${formatCurrency(transaction.amount_cents)}`,
        date: formatDate(transaction.occurred_on),
        positive
      }
    })

    const projectTotals = new Map<string, number>()

    for (const transaction of transactionRows) {
      const project = firstRelation(transaction.project)
      const projectName = project?.name

      if (!projectName) {
        continue
      }

      const currentValue = projectTotals.get(projectName) || 0
      projectTotals.set(projectName, currentValue + (transaction.kind === 'income' ? transaction.amount_cents : -transaction.amount_cents))
    }

    const projects = (projectsResult.data as ProjectRow[] | null || []).map((project) => {
      const amount = projectTotals.get(project.name) || 0

      return {
        name: project.name,
        amount: formatCurrency(amount),
        trend: formatTrend(project.trend_percent),
        positive: project.trend_percent >= 0,
        color: project.color
      }
    })

    const expenseCategories = (categoriesResult.data as CategoryRow[] | null || []).filter((category) => category.kind === 'expense')
    const expenseTotals = new Map<string, number>()
    let totalExpenses = 0

    for (const transaction of transactionRows) {
      if (transaction.kind !== 'expense') {
        continue
      }

      totalExpenses += transaction.amount_cents

      const category = firstRelation(transaction.category)
      const categoryName = category?.name || 'Sem categoria'
      expenseTotals.set(categoryName, (expenseTotals.get(categoryName) || 0) + transaction.amount_cents)
    }

    const categoryLegend = expenseCategories.map((category) => {
      const categoryTotal = expenseTotals.get(category.name) || 0
      const percent = totalExpenses > 0 ? Math.round((categoryTotal / totalExpenses) * 100) : 0

      return {
        name: category.name,
        value: `${percent}%`,
        color: category.color
      }
    })

    const commandExamples = transactions.slice(0, 3).map((transaction) => ({
      text: transaction.value.replace('R$', '').trim(),
      detail: transaction.description,
      tag: transaction.type,
      positive: transaction.positive
    }))

    return {
      accounts,
      projects,
      transactions,
      categoryLegend,
      commandExamples
    }
  })
}
