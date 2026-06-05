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
  <div class="dashboard-shell">
    <main class="dashboard">
      <DashboardTopbar />

      <section class="toolbar-row">
        <button class="date-button" type="button">
          <span class="icon calendar-icon"></span>
          01/07/2024 - 31/07/2024
          <span class="chevron"></span>
        </button>
      </section>

      <DashboardMetricCards
        :accounts="accounts"
        :category-legend="categoryLegend"
      />

      <section class="content-grid">
        <div class="main-column">
          <CashflowChart />

          <section class="list-grid">
            <AccountsList :accounts="accounts" />
            <ProjectsList :projects="projects" />
          </section>

          <TransactionsTable :transactions="transactions" />
        </div>

        <aside class="side-column">
          <WhatsappLauncher :command-examples="commandExamples" />
          <AiInsights />
        </aside>
      </section>
    </main>
  </div>
</template>
