# 🚀 Deploy no Netlify - Dashboard CP1 Front End

## 📋 Instruções para Deploy

### 1. Preparação do Repositório
✅ **Repositório GitHub configurado:** [https://github.com/alansms/CP-1_2025_2_Front-End-.git](https://github.com/alansms/CP-1_2025_2_Front-End-.git)

### 2. Deploy no Netlify

#### Opção A: Deploy Automático via GitHub
1. Acesse [netlify.com](https://netlify.com)
2. Faça login com sua conta GitHub
3. Clique em "New site from Git"
4. Selecione "GitHub" como provider
5. Escolha o repositório: `alansms/CP-1_2025_2_Front-End-`
6. Configure as seguintes opções:
   - **Branch to deploy:** `main`
   - **Base directory:** `dashboard`
   - **Build command:** (deixe vazio - é um site estático)
   - **Publish directory:** `dashboard`
7. Clique em "Deploy site"

#### Opção B: Deploy Manual via Drag & Drop
1. Acesse [netlify.com](https://netlify.com)
2. Faça login
3. Arraste a pasta `dashboard` para a área de deploy
4. Aguarde o deploy automático

### 3. Configurações Adicionais

#### Domínio Personalizado (Opcional)
1. No painel do Netlify, vá em "Domain settings"
2. Clique em "Add custom domain"
3. Configure seu domínio personalizado

#### Variáveis de Ambiente (Se necessário)
1. No painel do Netlify, vá em "Site settings"
2. Clique em "Environment variables"
3. Adicione variáveis se necessário

### 4. Estrutura do Dashboard

```
dashboard/
├── index.html              # Página principal
├── js/
│   └── data-loader.js      # Carregador de dados dos CSVs
├── _headers                # Configurações de segurança
└── netlify.toml           # Configuração do Netlify
```

### 5. Funcionalidades do Dashboard

#### ✅ Recursos Implementados:
- **📊 Visualização Interativa:** Gráficos com Chart.js
- **🎨 Design Responsivo:** Bootstrap 5 + CSS customizado
- **📱 Mobile-First:** Interface adaptável para todos os dispositivos
- **🔄 Dados Dinâmicos:** Carregamento automático dos CSVs do GitHub
- **🎯 Navegação Suave:** Scroll suave entre seções
- **📈 Métricas em Tempo Real:** Estatísticas dos clusters
- **🎬 Análise Detalhada:** Características de cada cluster
- **⚖️ Comparação de Modelos:** Tabela comparativa com métricas

#### 📊 Seções do Dashboard:
1. **Hero Section:** Apresentação do projeto e informações do aluno
2. **Visão Geral:** Métricas principais e gráficos de distribuição
3. **Análise dos Clusters:** Cards detalhados para cada cluster
4. **Comparação de Modelos:** Tabela com métricas de performance
5. **Insights:** Padrões identificados e aplicações práticas

### 6. Dados Exibidos

#### 📁 Fontes de Dados:
- **`imdb_top250_with_clusters.csv`:** Dados dos filmes com clusters
- **`cluster_summary.csv`:** Resumo estatístico dos clusters
- **`model_comparison_summary.csv`:** Comparação de métricas dos modelos

#### 🔄 Atualização Automática:
- Os dados são carregados diretamente dos CSVs do GitHub
- Atualizações no repositório refletem automaticamente no dashboard
- Fallback para dados estáticos em caso de erro

### 7. Personalização

#### 🎨 Cores dos Clusters:
- **Cluster 0:** Vermelho (#FF6B6B) - Épicos de Fantasia e Guerra
- **Cluster 1:** Turquesa (#4ECDC4) - Dramas Intensos e Violência
- **Cluster 2:** Azul (#45B7D1) - Dramas Psicológicos Modernos
- **Cluster 3:** Verde (#96CEB4) - Sagas Familiares e Crime
- **Cluster 4:** Amarelo (#FFEAA7) - Dramas Clássicos e Morais

#### 📱 Responsividade:
- **Desktop:** Layout em grid com 2 colunas
- **Tablet:** Layout adaptativo
- **Mobile:** Layout em coluna única

### 8. URLs Importantes

#### 🔗 Links do Projeto:
- **GitHub:** [https://github.com/alansms/CP-1_2025_2_Front-End-.git](https://github.com/alansms/CP-1_2025_2_Front-End-.git)
- **IMDb Top 250:** [https://www.imdb.com/chart/top/?ref_=nv_mv_250](https://www.imdb.com/chart/top/?ref_=nv_mv_250)
- **Netlify Dashboard:** (será gerado após o deploy)

### 9. Troubleshooting

#### ❌ Problemas Comuns:
1. **Dados não carregam:** Verifique se os CSVs estão no GitHub
2. **Layout quebrado:** Verifique se o Bootstrap está carregando
3. **Gráficos não aparecem:** Verifique se o Chart.js está carregando

#### ✅ Soluções:
1. **Cache:** Limpe o cache do navegador
2. **Console:** Verifique o console do navegador para erros
3. **Rede:** Verifique a conexão com o GitHub

### 10. Próximos Passos

#### 🚀 Melhorias Futuras:
- [ ] Adicionar filtros interativos
- [ ] Implementar busca de filmes
- [ ] Adicionar mais visualizações
- [ ] Implementar modo escuro
- [ ] Adicionar animações CSS
- [ ] Implementar PWA (Progressive Web App)

---

**Desenvolvido por:** Alan de Souza Maximiano da Silva (RM: 557088)  
**Turma:** 2TIAPY-2025  
**Data:** 2025
