<script setup lang="ts">
import type { DashboardTransaction } from '~/composables/useDashboardData'

defineProps<{
  transactions: DashboardTransaction[]
}>()
</script>

<template>
  <article class="panel transactions-card">
    <div class="section-heading compact">
      <h2>Ultimas movimentacoes</h2>
      <button type="button">Ver todas</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Descricao</th>
            <th>Categoria</th>
            <th>Projeto</th>
            <th>Conta</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.description">
            <td>{{ transaction.description }}</td>
            <td><span class="tag" :class="transaction.positive ? 'tag-green' : 'tag-orange'">{{ transaction.category }}</span></td>
            <td>{{ transaction.project }}</td>
            <td>{{ transaction.account }}</td>
            <td><span :class="transaction.positive ? 'positive' : 'negative'">{{ transaction.type }}</span></td>
            <td :class="transaction.positive ? 'positive amount' : 'negative amount'">{{ transaction.value }}</td>
            <td>{{ transaction.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
