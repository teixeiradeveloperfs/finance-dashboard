<script setup lang="ts">
import type { DashboardAccount, DashboardLegendItem, DashboardTransaction } from '~/composables/useDashboardData'

const props = defineProps<{
  accounts: DashboardAccount[]
  categoryLegend: DashboardLegendItem[]
  transactions: DashboardTransaction[]
}>()

const parseCurrency = (value: string) => Number(value.replace(/[^\d,-]/g, '').replace('.', '').replace(',', '.')) || 0

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(value)

const totalBalance = computed(() => props.accounts.reduce((total, account) => total + parseCurrency(account.amount), 0))
const incomeTotal = computed(() => props.transactions.filter((transaction) => transaction.positive).reduce((total, transaction) => total + Math.abs(parseCurrency(transaction.value)), 0))
const expenseTotal = computed(() => props.transactions.filter((transaction) => !transaction.positive).reduce((total, transaction) => total + Math.abs(parseCurrency(transaction.value)), 0))
const profitTotal = computed(() => incomeTotal.value - expenseTotal.value)
const hasTransactions = computed(() => props.transactions.length > 0)
</script>

<template>
  <section class="overview-grid" aria-label="Metricas financeiras">
    <article class="metric-card panel balance-card">
      <div>
        <p class="card-label">Saldo total</p>
        <div class="metric-value-row">
          <strong>{{ formatCurrency(totalBalance) }}</strong>
        </div>
        <small>{{ accounts.length }} contas cadastradas</small>
      </div>
      <div class="connected-accounts">
        <p>Contas conectadas</p>
        <div class="account-badges">
          <span v-for="account in accounts.slice(0, 4)" :key="account.name" :style="{ backgroundColor: account.color }">
            {{ account.badge }}
          </span>
          <button type="button" aria-label="Adicionar conta">
            <Icon name="lucide:plus" class="ui-icon small" />
          </button>
        </div>
      </div>
      <button class="soft-button" type="button">Ver contas</button>
    </article>

    <article class="metric-card panel">
      <span class="metric-icon green"><Icon name="lucide:wallet-cards" class="ui-icon" /></span>
      <p class="card-label">Receitas do mes</p>
      <strong class="metric-value">{{ formatCurrency(incomeTotal) }}</strong>
      <p class="comparison">{{ hasTransactions ? 'Calculado pelas transacoes cadastradas.' : 'Nenhuma receita cadastrada.' }}</p>
      <svg class="sparkline" viewBox="0 0 220 70" role="img" aria-label="Tendencia de receitas">
        <path class="spark-area green-area" d="M0 58 L18 52 L36 38 L54 45 L72 52 L90 43 L108 48 L126 35 L144 28 L162 50 L180 35 L198 28 L220 20 L220 70 L0 70 Z" />
        <path class="spark green-line" d="M0 58 L18 52 L36 38 L54 45 L72 52 L90 43 L108 48 L126 35 L144 28 L162 50 L180 35 L198 28 L220 20" />
      </svg>
    </article>

    <article class="metric-card panel">
      <span class="metric-icon red"><Icon name="lucide:receipt-text" class="ui-icon" /></span>
      <p class="card-label">Despesas do mes</p>
      <strong class="metric-value">{{ formatCurrency(expenseTotal) }}</strong>
      <p class="comparison">{{ hasTransactions ? 'Calculado pelas transacoes cadastradas.' : 'Nenhuma despesa cadastrada.' }}</p>
      <svg class="sparkline" viewBox="0 0 220 70" role="img" aria-label="Tendencia de despesas">
        <path class="spark-area red-area" d="M0 42 L18 45 L36 20 L54 27 L72 35 L90 50 L108 58 L126 38 L144 47 L162 18 L180 29 L198 45 L220 36 L220 70 L0 70 Z" />
        <path class="spark red-line" d="M0 42 L18 45 L36 20 L54 27 L72 35 L90 50 L108 58 L126 38 L144 47 L162 18 L180 29 L198 45 L220 36" />
      </svg>
    </article>

    <article class="metric-card panel">
      <span class="metric-icon purple"><Icon name="lucide:trending-up" class="ui-icon" /></span>
      <p class="card-label">Lucro do mes</p>
      <strong class="metric-value">{{ formatCurrency(profitTotal) }}</strong>
      <p class="comparison">{{ hasTransactions ? 'Receitas menos despesas.' : 'Sem transacoes para calcular.' }}</p>
      <svg class="sparkline" viewBox="0 0 220 70" role="img" aria-label="Tendencia de lucro">
        <path class="spark-area green-area" d="M0 55 L22 58 L44 36 L66 54 L88 46 L110 22 L132 36 L154 14 L176 50 L198 38 L220 22 L220 70 L0 70 Z" />
        <path class="spark green-line" d="M0 55 L22 58 L44 36 L66 54 L88 46 L110 22 L132 36 L154 14 L176 50 L198 38 L220 22" />
      </svg>
    </article>

    <article class="panel category-card">
      <div class="section-heading">
        <h2>Todas as despesas</h2>
        <button class="select-button" type="button">
          Categorias
          <Icon name="lucide:chevron-down" class="ui-icon small" />
        </button>
      </div>
      <div class="expense-tabs">
        <span><small>Receitas</small><strong>{{ formatCurrency(incomeTotal) }}</strong></span>
        <span><small>Despesas</small><strong>{{ formatCurrency(expenseTotal) }}</strong></span>
        <span><small>Lucro</small><strong>{{ formatCurrency(profitTotal) }}</strong></span>
      </div>
      <div class="donut-row">
        <div class="donut-chart">
          <div>
            <span>Total</span>
            <strong>{{ formatCurrency(expenseTotal) }}</strong>
          </div>
        </div>
        <p v-if="!categoryLegend.length" class="empty-state compact">Nenhuma categoria com despesa cadastrada.</p>
        <ul v-else class="legend-list">
          <li v-for="item in categoryLegend" :key="item.name">
            <span :style="{ backgroundColor: item.color }"></span>
            {{ item.name }}
            <strong>{{ item.value }}</strong>
          </li>
        </ul>
      </div>
      <button class="neutral-button" type="button">Ver relatorio completo</button>
    </article>
  </section>
</template>
