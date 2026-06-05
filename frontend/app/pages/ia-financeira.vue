<script setup lang="ts">
useHead({ title: 'IA Financeira | Dashboard Financeiro' })
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>IA Financeira</p>
        <h2>Automacoes e insights</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:sparkles" class="ui-icon small" />
        Gerar analise
      </button>
    </section>

    <section class="page-grid two">
      <AiInsights />
      <article class="panel management-card">
        <div class="section-heading compact">
          <h2>Automacoes sugeridas</h2>
        </div>
        <div class="settings-list">
          <div><span>OpenAI - Assinatura</span><em>Recorrente mensal</em></div>
          <div><span>Stripe - Venda mensal</span><em>Classificar como receita</em></div>
          <div><span>Digital Ocean</span><em>Classificar como hospedagem</em></div>
        </div>
      </article>
    </section>
  </DashboardPageShell>
</template>
