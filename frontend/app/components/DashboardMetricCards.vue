<script setup lang="ts">
import type { DashboardAccount, DashboardLegendItem } from '~/composables/useDashboardData'

defineProps<{
  accounts: DashboardAccount[]
  categoryLegend: DashboardLegendItem[]
}>()
</script>

<template>
  <section class="overview-grid" aria-label="Metricas financeiras">
    <article class="metric-card panel balance-card">
      <div>
        <p class="card-label">Saldo total</p>
        <div class="metric-value-row">
          <strong>R$ 83.172,64</strong>
          <span class="trend positive">+6,7%</span>
        </div>
        <small>comparado ao mes anterior</small>
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
      <strong class="metric-value">R$ 16.281,48</strong>
      <p class="comparison"><span class="trend positive">+9,8%</span> comparado ao mes anterior</p>
      <svg class="sparkline" viewBox="0 0 220 70" role="img" aria-label="Tendencia de receitas">
        <path class="spark-area green-area" d="M0 58 L18 52 L36 38 L54 45 L72 52 L90 43 L108 48 L126 35 L144 28 L162 50 L180 35 L198 28 L220 20 L220 70 L0 70 Z" />
        <path class="spark green-line" d="M0 58 L18 52 L36 38 L54 45 L72 52 L90 43 L108 48 L126 35 L144 28 L162 50 L180 35 L198 28 L220 20" />
      </svg>
    </article>

    <article class="metric-card panel">
      <span class="metric-icon red"><Icon name="lucide:receipt-text" class="ui-icon" /></span>
      <p class="card-label">Despesas do mes</p>
      <strong class="metric-value">R$ 6.638,72</strong>
      <p class="comparison"><span class="trend negative">-8,6%</span> comparado ao mes anterior</p>
      <svg class="sparkline" viewBox="0 0 220 70" role="img" aria-label="Tendencia de despesas">
        <path class="spark-area red-area" d="M0 42 L18 45 L36 20 L54 27 L72 35 L90 50 L108 58 L126 38 L144 47 L162 18 L180 29 L198 45 L220 36 L220 70 L0 70 Z" />
        <path class="spark red-line" d="M0 42 L18 45 L36 20 L54 27 L72 35 L90 50 L108 58 L126 38 L144 47 L162 18 L180 29 L198 45 L220 36" />
      </svg>
    </article>

    <article class="metric-card panel">
      <span class="metric-icon purple"><Icon name="lucide:trending-up" class="ui-icon" /></span>
      <p class="card-label">Lucro do mes</p>
      <strong class="metric-value">R$ 9.642,76</strong>
      <p class="comparison"><span class="trend positive">+18,6%</span> comparado ao mes anterior</p>
      <svg class="sparkline" viewBox="0 0 220 70" role="img" aria-label="Tendencia de lucro">
        <path class="spark-area green-area" d="M0 55 L22 58 L44 36 L66 54 L88 46 L110 22 L132 36 L154 14 L176 50 L198 38 L220 22 L220 70 L0 70 Z" />
        <path class="spark green-line" d="M0 55 L22 58 L44 36 L66 54 L88 46 L110 22 L132 36 L154 14 L176 50 L198 38 L220 22" />
      </svg>
    </article>

    <article class="panel category-card">
      <div class="section-heading">
        <h2>Todas as despesas</h2>
        <button class="select-button" type="button">
          Mes atual
          <Icon name="lucide:chevron-down" class="ui-icon small" />
        </button>
      </div>
      <div class="expense-tabs">
        <span><small>Diarias</small><strong>R$ 682,20</strong></span>
        <span><small>Semanais</small><strong>R$ 2.183,26</strong></span>
        <span><small>Mensais</small><strong>R$ 6.638,72</strong></span>
      </div>
      <div class="donut-row">
        <div class="donut-chart">
          <div>
            <span>Total</span>
            <strong>R$ 6.638,72</strong>
          </div>
        </div>
        <ul class="legend-list">
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
