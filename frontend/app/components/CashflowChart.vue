<template>
  <article class="panel cashflow-card">
    <div class="section-heading">
      <div>
        <h2>Fluxo de caixa</h2>
        <div class="chart-legend">
          <span class="legend-dot green-dot"></span>Receitas
          <span class="legend-dot red-dot"></span>Despesas
        </div>
      </div>
      <button class="select-button" type="button">
        Ultimos 12 meses
        <Icon name="lucide:chevron-down" class="ui-icon small" />
      </button>
    </div>

    <div class="cashflow-chart">
      <div class="axis-labels">
        <span>R$ 30k</span>
        <span>R$ 20k</span>
        <span>R$ 10k</span>
        <span>R$ 0</span>
        <span>-R$ 10k</span>
      </div>
      <svg viewBox="0 0 980 250" preserveAspectRatio="none" role="img" aria-label="Grafico de fluxo de caixa dos ultimos 12 meses">
        <line x1="0" y1="35" x2="980" y2="35" class="grid-line" />
        <line x1="0" y1="86" x2="980" y2="86" class="grid-line" />
        <line x1="0" y1="137" x2="980" y2="137" class="grid-line" />
        <line x1="0" y1="188" x2="980" y2="188" class="grid-line" />
        <line x1="0" y1="238" x2="980" y2="238" class="grid-line" />
        <path class="chart-line green-line" d="M70 100 C120 115 150 112 190 112 C235 125 260 138 305 112 C350 88 370 86 410 110 C460 102 480 76 530 92 C575 108 590 105 640 76 C675 88 705 111 745 102 C790 72 820 90 860 104 C900 88 928 66 960 58" />
        <path class="chart-line red-line" d="M70 138 C120 145 150 144 190 148 C232 154 263 151 305 130 C350 120 372 129 410 136 C455 142 480 143 530 130 C575 122 600 134 640 142 C681 154 705 143 745 132 C785 130 812 144 860 151 C900 137 928 131 960 128" />
        <line x1="875" y1="18" x2="875" y2="238" class="active-line" />
      </svg>
      <div class="chart-badges">
        <span class="value-pill income">R$ 16.281,48</span>
        <span class="value-pill expense">R$ 6.638,72</span>
      </div>
      <div class="month-labels">
        <span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span>
      </div>
    </div>
  </article>
</template>
