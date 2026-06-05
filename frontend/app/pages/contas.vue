<script setup lang="ts">
useHead({ title: 'Contas | Dashboard Financeiro' })

const { accounts } = useDashboardData()
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Contas</p>
        <h2>Contas conectadas e saldos</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:plus" class="ui-icon small" />
        Nova conta
      </button>
    </section>

    <section class="page-grid three">
      <article v-for="account in accounts" :key="account.name" class="panel account-overview-card">
        <span class="row-badge" :style="{ backgroundColor: account.color }">{{ account.badge }}</span>
        <div>
          <p>{{ account.name }}</p>
          <small>{{ account.type }}</small>
        </div>
        <strong>{{ account.amount }}</strong>
      </article>
    </section>

    <section class="panel management-card">
      <div class="section-heading compact">
        <h2>Sincronizacao bancaria</h2>
        <button type="button">Configurar</button>
      </div>
      <div class="settings-list">
        <div><span>Nubank</span><em>Sincronizado ha 2 min</em></div>
        <div><span>Inter</span><em>Sincronizado hoje</em></div>
        <div><span>Stripe</span><em>Webhook ativo</em></div>
      </div>
    </section>
  </DashboardPageShell>
</template>
