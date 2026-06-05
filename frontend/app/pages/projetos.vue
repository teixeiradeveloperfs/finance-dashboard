<script setup lang="ts">
useHead({ title: 'Projetos | Dashboard Financeiro' })

const { projects } = useDashboardData()
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Projetos</p>
        <h2>Performance por projeto</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:plus" class="ui-icon small" />
        Novo projeto
      </button>
    </section>

    <section class="page-grid three">
      <article v-for="project in projects" :key="project.name" class="panel project-overview-card">
        <span class="row-badge" :style="{ backgroundColor: project.color }"></span>
        <div>
          <p>{{ project.name }}</p>
          <small>Resultado do mes</small>
        </div>
        <strong>{{ project.amount }}</strong>
        <em :class="{ positive: project.positive, negative: !project.positive }">{{ project.trend }}</em>
      </article>
    </section>
  </DashboardPageShell>
</template>
