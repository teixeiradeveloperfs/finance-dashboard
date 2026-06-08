<script setup lang="ts">
import type { DashboardTransaction } from '~/composables/useDashboardData'

const props = defineProps<{
  transactions: DashboardTransaction[]
}>()

const parseCurrency = (value: string) => Number(value.replace(/[^\d,-]/g, '').replace('.', '').replace(',', '.')) || 0

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(value)

const monthKeys = computed(() => {
  const today = new Date()

  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (11 - index), 1)

    return {
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
      label: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    }
  })
})

const monthlyTotals = computed(() => monthKeys.value.map((month) => {
  const transactions = props.transactions.filter((transaction) => {
    const [day, monthNumber, year] = transaction.date.split('/')
    return `${year}-${monthNumber}` === month.key && day
  })

  return {
    ...month,
    income: transactions.filter((transaction) => transaction.positive).reduce((total, transaction) => total + Math.abs(parseCurrency(transaction.value)), 0),
    expense: transactions.filter((transaction) => !transaction.positive).reduce((total, transaction) => total + Math.abs(parseCurrency(transaction.value)), 0)
  }
}))

const maxValue = computed(() => Math.max(1, ...monthlyTotals.value.flatMap((month) => [month.income, month.expense])))
const latestIncome = computed(() => monthlyTotals.value.at(-1)?.income || 0)
const latestExpense = computed(() => monthlyTotals.value.at(-1)?.expense || 0)
const hasTransactions = computed(() => props.transactions.length > 0)

const pointFor = (value: number, index: number) => {
  const x = 40 + index * (900 / Math.max(1, monthlyTotals.value.length - 1))
  const y = 220 - (value / maxValue.value) * 170

  return `${x},${y}`
}

const incomePoints = computed(() => monthlyTotals.value.map((month, index) => pointFor(month.income, index)).join(' '))
const expensePoints = computed(() => monthlyTotals.value.map((month, index) => pointFor(month.expense, index)).join(' '))
</script>

<template>
  <article class="panel cashflow-card">
    <div class="section-heading">
      <div>
        <h2>Fluxo de caixa</h2>
        <div class="chart-legend">
          <span class="legend-dot green-dot"></span>Receitas
          <span class="legend-dot red-dot"></span>Despesas
        </div>
      </div>
    </div>

    <p v-if="!hasTransactions" class="empty-state">Nenhuma transacao cadastrada para montar o fluxo de caixa.</p>

    <div v-else class="cashflow-chart">
      <div class="axis-labels">
        <span>{{ formatCurrency(maxValue) }}</span>
        <span>{{ formatCurrency(maxValue * 0.66) }}</span>
        <span>{{ formatCurrency(maxValue * 0.33) }}</span>
        <span>R$ 0,00</span>
      </div>
      <svg viewBox="0 0 980 250" preserveAspectRatio="none" role="img" aria-label="Grafico de fluxo de caixa dos ultimos 12 meses">
        <line x1="0" y1="50" x2="980" y2="50" class="grid-line" />
        <line x1="0" y1="106" x2="980" y2="106" class="grid-line" />
        <line x1="0" y1="163" x2="980" y2="163" class="grid-line" />
        <line x1="0" y1="220" x2="980" y2="220" class="grid-line" />
        <polyline class="chart-line green-line" :points="incomePoints" fill="none" />
        <polyline class="chart-line red-line" :points="expensePoints" fill="none" />
      </svg>
      <div class="chart-badges">
        <span class="value-pill income">{{ formatCurrency(latestIncome) }}</span>
        <span class="value-pill expense">{{ formatCurrency(latestExpense) }}</span>
      </div>
      <div class="month-labels">
        <span v-for="month in monthlyTotals" :key="month.key">{{ month.label }}</span>
      </div>
    </div>
  </article>
</template>
