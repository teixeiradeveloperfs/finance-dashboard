<template>
  <header class="topbar panel">
    <div class="brand-block">
      <div class="brand-mark" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <p class="eyebrow">Bom dia, Jaylon</p>
        <h1>Aqui esta o resumo financeiro da sua empresa hoje.</h1>
      </div>
    </div>

    <label class="search-box">
      <span class="icon search-icon"></span>
      <input type="search" placeholder="Buscar..." />
      <kbd>⌘K</kbd>
    </label>

    <div class="header-actions">
      <button class="whatsapp-chip" type="button" aria-label="Abrir WhatsApp Bot">
        <span class="whatsapp-dot"></span>
        WhatsApp Bot
        <span class="status-dot"></span>
      </button>
      <button class="icon-button" type="button" aria-label="Notificacoes">
        <span class="icon bell-icon"></span>
        <span class="notification-badge">8</span>
      </button>
      <button class="profile-button" type="button" aria-label="Abrir perfil">
        <span class="avatar"></span>
        <span>
          <strong>Jaylon Baptista</strong>
          <small>Administrador</small>
        </span>
        <span class="chevron"></span>
      </button>
    </div>
  </header>
</template>
