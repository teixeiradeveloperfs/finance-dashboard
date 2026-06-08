<script setup lang="ts">
useHead({
  title: 'Dashboard Financeiro',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }
  ]
})

const {
  accounts,
  projects,
  transactions,
  categoryLegend,
  commandExamples
} = useDashboardData()
</script>

<template>
  <DashboardPageShell>
    <section class="toolbar-row">
      <button class="date-button" type="button">
        <Icon name="lucide:calendar-days" class="ui-icon" />
        01/07/2024 - 31/07/2024
        <Icon name="lucide:chevron-down" class="ui-icon small" />
      </button>
    </section>

    <DashboardMetricCards
      :accounts="accounts"
      :category-legend="categoryLegend"
      :transactions="transactions"
    />

    <section class="content-grid">
      <div class="main-column">
        <CashflowChart :transactions="transactions" />

        <section class="list-grid">
          <AccountsList :accounts="accounts" />
          <ProjectsList :projects="projects" />
        </section>

        <TransactionsTable :transactions="transactions" />
      </div>

      <aside class="side-column">
        <WhatsappLauncher :command-examples="commandExamples" />
        <AiInsights :category-legend="categoryLegend" :transactions="transactions" />
      </aside>
    </section>
  </DashboardPageShell>
</template>
