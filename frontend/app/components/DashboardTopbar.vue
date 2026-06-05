<template>
  <header class="topbar panel">
    <div class="brand-block">
      <img class="brand-mark topbar-logo" src="/favicon.ico" alt="" aria-hidden="true" />
      <div>
        <p class="eyebrow">Bom dia, Jaylon</p>
        <h1>Aqui esta o resumo financeiro da sua empresa hoje.</h1>
      </div>
    </div>

    <label class="search-box">
      <Icon name="lucide:search" class="ui-icon muted" />
      <input type="search" placeholder="Buscar..." />
      <kbd>⌘K</kbd>
    </label>

    <div class="header-actions">
      <button class="whatsapp-chip" type="button" aria-label="Abrir WhatsApp Bot">
        <Icon name="lucide:message-circle" class="ui-icon whatsapp-icon" />
        WhatsApp Bot
        <span class="status-dot"></span>
      </button>
      <button class="icon-button" type="button" aria-label="Notificacoes">
        <Icon name="lucide:bell" class="ui-icon" />
        <span class="notification-badge">8</span>
      </button>
      <button class="profile-button" type="button" aria-label="Abrir perfil">
        <span class="avatar"></span>
        <span>
          <strong>Jaylon Baptista</strong>
          <small>Administrador</small>
        </span>
        <Icon name="lucide:chevron-down" class="ui-icon small muted" />
      </button>
    </div>
  </header>
</template>
