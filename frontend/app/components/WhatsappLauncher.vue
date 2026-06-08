<script setup lang="ts">
import type { WhatsappCommandExample } from '~/composables/useDashboardData'

defineProps<{
  commandExamples: WhatsappCommandExample[]
}>()
</script>

<template>
  <article class="panel whatsapp-card">
    <span class="side-icon whatsapp-large"><Icon name="lucide:message-circle" class="ui-icon" /></span>
    <h2>Lancamentos via WhatsApp</h2>
    <p>Envie receitas e despesas pelo WhatsApp quando a integracao estiver configurada.</p>
    <button class="soft-button" type="button">Configurar WhatsApp</button>
    <p class="mini-title">Exemplos de comandos:</p>
    <p v-if="!commandExamples.length" class="empty-state compact">Nenhum exemplo disponivel sem transacoes cadastradas.</p>
    <ul v-else class="command-list">
      <li v-for="command in commandExamples" :key="command.detail">
        <strong>{{ command.text }}</strong>
        <span>{{ command.detail }}</span>
        <em :class="command.positive ? 'tag-green' : 'tag-red'">{{ command.tag }}</em>
      </li>
    </ul>
  </article>
</template>
