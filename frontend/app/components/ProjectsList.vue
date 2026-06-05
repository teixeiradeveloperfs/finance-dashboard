<script setup lang="ts">
import type { DashboardProject } from '~/composables/useDashboardData'

defineProps<{
  projects: DashboardProject[]
}>()
</script>

<template>
  <article class="panel list-card">
    <div class="section-heading compact">
      <h2>Projetos</h2>
      <button type="button">Ver todos</button>
    </div>
    <ul class="rows-list">
      <li v-for="project in projects" :key="project.name">
        <span class="row-badge" :style="{ backgroundColor: project.color }"></span>
        <span class="row-main single"><strong>{{ project.name }}</strong></span>
        <strong>{{ project.amount }}</strong>
        <em :class="{ positive: project.positive, negative: !project.positive }">{{ project.trend }}</em>
        <span class="chevron"></span>
      </li>
    </ul>
  </article>
</template>
