<script setup lang="ts">
useHead({ title: 'Configuracoes | Dashboard Financeiro' })
</script>

<template>
  <DashboardPageShell>
    <section class="page-heading">
      <div>
        <p>Configuracoes</p>
        <h2>Perfil e seguranca</h2>
      </div>
      <button class="primary-action" type="button">
        <Icon name="lucide:save" class="ui-icon small" />
        Salvar
      </button>
    </section>

    <section class="page-grid two">
      <article class="panel profile-settings-card">
        <div class="section-heading compact">
          <h2>Foto e dados do perfil</h2>
        </div>

        <div class="profile-photo-row">
          <span class="profile-photo-preview"></span>
          <button class="secondary-action" type="button">
            <Icon name="lucide:upload" class="ui-icon small" />
            Alterar foto
          </button>
        </div>

        <div class="settings-form">
          <label>
            Nome
            <input type="text" value="Jaylon Baptista" />
          </label>
          <label>
            E-mail
            <input type="email" value="jaylon@empresa.com" />
          </label>
          <label>
            Cargo
            <input type="text" value="Administrador" />
          </label>
        </div>
      </article>

      <article class="panel profile-settings-card">
        <div class="section-heading compact">
          <h2>Senha e acesso</h2>
        </div>

        <div class="settings-form">
          <label>
            Senha atual
            <input type="password" placeholder="Digite sua senha atual" />
          </label>
          <label>
            Nova senha
            <input type="password" placeholder="Digite uma nova senha" />
          </label>
          <label>
            Confirmar senha
            <input type="password" placeholder="Confirme a nova senha" />
          </label>
        </div>

        <div class="security-list">
          <div>
            <span>Autenticacao em duas etapas</span>
            <button type="button">Ativar</button>
          </div>
          <div>
            <span>Sessoes ativas</span>
            <button type="button">Gerenciar</button>
          </div>
        </div>
      </article>
    </section>
  </DashboardPageShell>
</template>
