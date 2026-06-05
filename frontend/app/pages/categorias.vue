<script setup lang="ts">
useHead({ title: 'Categorias | Dashboard Financeiro' })

const { categoryLegend } = useDashboardData()
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Categorias</p>
        <h2>Organizacao de receitas e despesas</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:plus" class="ui-icon small" />
        Nova categoria
      </button>
    </section>

    <section class="page-grid two">
      <article class="panel category-management-card">
        <div class="section-heading compact">
          <h2>Despesas por categoria</h2>
        </div>
        <ul class="legend-list category-page-list">
          <li v-for="item in categoryLegend" :key="item.name">
            <span :style="{ backgroundColor: item.color }"></span>
            {{ item.name }}
            <strong>{{ item.value }}</strong>
          </li>
        </ul>
      </article>

      <article class="panel category-management-card">
        <div class="section-heading compact">
          <h2>Regras automaticas</h2>
        </div>
        <div class="settings-list">
          <div><span>Stripe</span><em>Receita recorrente</em></div>
          <div><span>OpenAI</span><em>Ferramentas</em></div>
          <div><span>Digital Ocean</span><em>Hospedagem</em></div>
        </div>
      </article>
    </section>
  </DashboardPageShell>
</template>
