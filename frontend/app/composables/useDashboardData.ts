export type DashboardAccount = {
  name: string
  type: string
  amount: string
  badge: string
  color: string
}

export type DashboardProject = {
  name: string
  amount: string
  trend: string
  positive: boolean
  color: string
}

export type DashboardTransaction = {
  description: string
  category: string
  project: string
  account: string
  type: 'Receita' | 'Despesa'
  value: string
  date: string
  positive: boolean
}

export type DashboardLegendItem = {
  name: string
  value: string
  color: string
}

export type WhatsappCommandExample = {
  text: string
  detail: string
  tag: 'Receita' | 'Despesa'
  positive: boolean
}

export const useDashboardData = () => {
  const accounts: DashboardAccount[] = [
    { name: 'Nubank', type: 'Conta corrente', amount: 'R$ 15.320,50', badge: 'nu', color: '#6D28D9' },
    { name: 'Inter', type: 'Conta corrente', amount: 'R$ 8.250,30', badge: 'in', color: '#F97316' },
    { name: 'Mercado Pago', type: 'Conta corrente', amount: 'R$ 5.450,20', badge: 'mp', color: '#0EA5E9' },
    { name: 'Stripe', type: 'Conta empresarial', amount: 'R$ 24.180,64', badge: 's', color: '#635BFF' },
    { name: 'Carteira', type: 'Dinheiro', amount: 'R$ 29.970,00', badge: 'R$', color: '#03C494' }
  ]

  const projects: DashboardProject[] = [
    { name: 'AfiliaHouse', amount: 'R$ 18.450,90', trend: '+12,4%', positive: true, color: '#0EA5E9' },
    { name: 'CassinoTrack', amount: 'R$ 9.230,50', trend: '+8,1%', positive: true, color: '#64748B' },
    { name: 'Grupo Automa', amount: 'R$ 7.500,00', trend: '-4,2%', positive: false, color: '#111827' },
    { name: 'Appzk', amount: 'R$ 5.320,00', trend: '+15,7%', positive: true, color: '#F97316' },
    { name: 'Outros Projetos', amount: 'R$ 3.120,20', trend: '-2,1%', positive: false, color: '#06B6D4' }
  ]

  const transactions: DashboardTransaction[] = [
    { description: 'Stripe - Venda mensal', category: 'Receita', project: 'AfiliaHouse', account: 'Stripe', type: 'Receita', value: '+ R$ 1.500,00', date: '30/07/2024', positive: true },
    { description: 'Digital Ocean - Servidor', category: 'Hospedagem', project: 'Grupo Automa', account: 'Nubank', type: 'Despesa', value: '- R$ 89,90', date: '29/07/2024', positive: false },
    { description: 'OpenAI - Assinatura', category: 'Ferramentas', project: 'Appzk', account: 'Nubank', type: 'Despesa', value: '- R$ 120,00', date: '29/07/2024', positive: false },
    { description: 'Freelancer - Design', category: 'Servicos', project: 'CassinoTrack', account: 'Inter', type: 'Despesa', value: '- R$ 350,00', date: '28/07/2024', positive: false },
    { description: 'Venda de Curso', category: 'Receita', project: 'AfiliaHouse', account: 'Mercado Pago', type: 'Receita', value: '+ R$ 297,00', date: '28/07/2024', positive: true }
  ]

  const categoryLegend: DashboardLegendItem[] = [
    { name: 'Entretenimento', value: '46%', color: '#03C494' },
    { name: 'Plataformas', value: '56%', color: '#EF4444' },
    { name: 'Compras', value: '48%', color: '#F97316' },
    { name: 'Alimentacao', value: '63%', color: '#0EA5E9' }
  ]

  const commandExamples: WhatsappCommandExample[] = [
    { text: '+1500', detail: 'Stripe - Venda mensal', tag: 'Receita', positive: true },
    { text: '-89,90', detail: 'Digital Ocean - Servidor', tag: 'Despesa', positive: false },
    { text: '-120,00', detail: 'OpenAI - Assinatura', tag: 'Despesa', positive: false }
  ]

  return {
    accounts,
    projects,
    transactions,
    categoryLegend,
    commandExamples
  }
}
