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
    <p>Envie suas receitas e despesas pelo WhatsApp que nossa IA registra automaticamente.</p>
    <div class="phone-box">
      <strong>+55 11 99999-9999</strong>
      <span><i></i>Conectado</span>
    </div>
    <p class="mini-title">Exemplos de comandos:</p>
    <ul class="command-list">
      <li v-for="command in commandExamples" :key="command.detail">
        <strong>{{ command.text }}</strong>
        <span>{{ command.detail }}</span>
        <em :class="command.positive ? 'tag-green' : 'tag-red'">{{ command.tag }}</em>
      </li>
    </ul>
    <button class="soft-button" type="button">Ver todos os comandos</button>
  </article>
</template>
