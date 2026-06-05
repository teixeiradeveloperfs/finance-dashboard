<template>
  <div class="dashboard-shell">
    <div class="dashboard">
      <DashboardSidebar />

      <main class="dashboard-main">
        <DashboardTopbar />
        <slot />
      </main>

      <DashboardMobileNav />
    </div>
  </div>
</template>
