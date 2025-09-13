# CP1 - Front End: Análise de Clusterização de Filmes IMDb

## 📋 Informações do Projeto

**Disciplina:** Front End  
**Período:** 2º Semestre 2025  
**Participante:** Alan de Souza Maximiano da Silva  
**RM:** 557088  
**Turma:** 2TIAPY-2025  

## 🎯 Objetivo

Este projeto implementa técnicas de **Web Scraping** e **Clusterização KMeans** para análise dos 250 melhores filmes do IMDb, comparando diferentes abordagens de modelagem e extraindo insights sobre padrões cinematográficos.

## 📊 Escopo do Projeto

### Notebook 1: Web Scraping e Clusterização KMeans
- ✅ **Web Scraping Aprimorado:** Extração de dados dos 250 filmes do [IMDb Top 250](https://www.imdb.com/chart/top/?ref_=nv_mv_250)
- ✅ **Modelo KMeans (k=5):** Clusterização baseada em sinopses vetorizadas com TF-IDF
- ✅ **Análise de Clusters:** Identificação de padrões e características dos grupos de filmes
- ✅ **Insights Detalhados:** Comentários e análises sobre os resultados obtidos

### Notebook 2: Comparação de Modelos
- ✅ **Modelo 1:** KMeans utilizando apenas sinopses vetorizadas (TF-IDF)
- ✅ **Modelo 2:** KMeans utilizando todas as features (ano, rating, gênero, sinopse)
- ✅ **Comparação de Métricas:** Silhouette Score, Calinski-Harabasz Score, Davies-Bouldin Score
- ✅ **Escolha do Melhor Modelo:** Justificativa baseada em performance e aplicabilidade

## 🏗️ Estrutura do Projeto

```
CP1-Front_End/
├── README.md                                    # Este arquivo
├── Notebook1_IMDb_WebScraping_KMeans.ipynb     # Notebook principal 1
├── Notebook2_Modelo_Comparacao_Features.ipynb  # Notebook principal 2
├── Clusterizacao_ImdbMovies_Completo.ipynb     # Notebook de referência
├── Clusterizacao_ImdbMovies_PyCaret.ipynb      # Notebook de referência
├── TimeSeries_parte1.ipynb                     # Notebook adicional
└── arquivos_externos/                          # Arquivos auxiliares
    ├── README.md                               # Documentação dos arquivos
    ├── *.csv                                   # Datasets gerados
    ├── *.py                                    # Scripts auxiliares
    └── *.md                                    # Documentação adicional
```

## 🚀 Como Executar

### Pré-requisitos
```bash
pip install pandas numpy matplotlib seaborn plotly wordcloud scikit-learn nltk requests beautifulsoup4
```

### Execução dos Notebooks
1. **Notebook 1:** Execute as células sequencialmente para web scraping e clusterização
2. **Notebook 2:** Execute as células sequencialmente para comparação de modelos

### Estrutura de Dados
- **Entrada:** Web scraping do IMDb Top 250
- **Processamento:** Limpeza, pré-processamento de texto, vetorização TF-IDF
- **Saída:** Clusters identificados e métricas de avaliação

## 📈 Resultados Principais

### Análise dos Clusters (Notebook 1)

| Cluster | Nome | Filmes | Rating Médio | Características |
|---------|------|--------|--------------|-----------------|
| 0 | Épicos de Fantasia e Guerra | 5 | 8.88 | Narrativas épicas, temas de guerra e poder |
| 1 | Dramas Intensos e Violência | 6 | 8.82 | Histórias de crime, violência e redenção |
| 2 | Dramas Psicológicos Modernos | 3 | 8.73 | Narrativas complexas sobre identidade |
| 3 | Sagas Familiares e Crime | 7 | 8.87 | Histórias de poder, família e transformação |
| 4 | Dramas Clássicos e Morais | 4 | 8.70 | Temas morais, justiça e valores humanos |

### Comparação de Modelos (Notebook 2)

| Métrica | Modelo 1 (TF-IDF) | Modelo 2 (Todas Features) | Melhor |
|---------|-------------------|---------------------------|--------|
| Silhouette Score | 0.037 | 0.319 | Modelo 2 |
| Calinski-Harabasz Score | 1.612 | 24.536 | Modelo 2 |
| Davies-Bouldin Score | 2.450 | 0.934 | Modelo 2 |

**🏆 Modelo Vencedor:** Modelo 2 (Todas as Features) - Melhor performance em todas as métricas

## 🔍 Insights e Conclusões

### Padrões Identificados
- **Distribuição Temporal:** Filmes recentes (1990-2010) vs clássicos (1950-1980)
- **Qualidade Consistente:** Todos os clusters mantêm ratings altos (8.70-8.88)
- **Gêneros Dominantes:** Action Epic e Epic aparecem em múltiplos clusters
- **Temas Distintos:** Cada cluster apresenta narrativas únicas e específicas

### Aplicações Práticas
- **Recomendação de Filmes:** Baseada em similaridade de conteúdo e características
- **Análise de Tendências:** Identificação de padrões narrativos preferidos
- **Segmentação de Audiência:** Diferentes clusters atraem diferentes espectadores
- **Descoberta de Conteúdo:** Usuários podem encontrar filmes com temas similares

## 🛠️ Tecnologias Utilizadas

- **Python 3.13+**
- **Pandas:** Manipulação de dados
- **NumPy:** Computação numérica
- **Scikit-learn:** Machine Learning (KMeans, TF-IDF, métricas)
- **BeautifulSoup:** Web scraping
- **NLTK:** Processamento de linguagem natural
- **Matplotlib/Seaborn:** Visualização de dados
- **Jupyter Notebook:** Ambiente de desenvolvimento

## 📚 Metodologia

1. **Coleta de Dados:** Web scraping automatizado do IMDb
2. **Pré-processamento:** Limpeza, normalização e vetorização de texto
3. **Modelagem:** Implementação de KMeans com diferentes configurações
4. **Avaliação:** Métricas de qualidade de clusterização
5. **Análise:** Interpretação dos resultados e extração de insights

## 📁 Arquivos Gerados

- `imdb_top250_enhanced.csv`: Dataset principal com dados extraídos
- `imdb_top250_with_clusters.csv`: Dataset com clusters do Notebook 1
- `cluster_summary.csv`: Resumo estatístico dos clusters
- `model_comparison_summary.csv`: Comparação de métricas entre modelos

## 🎓 Aprendizados

- **Web Scraping:** Técnicas avançadas de extração de dados web
- **Processamento de Texto:** Vetorização TF-IDF e remoção de stopwords
- **Clusterização:** Implementação e avaliação de algoritmos KMeans
- **Análise Comparativa:** Avaliação de diferentes abordagens de modelagem
- **Interpretação de Resultados:** Extração de insights de dados não estruturados

## 🔗 Links Úteis

- [IMDb Top 250](https://www.imdb.com/chart/top/?ref_=nv_mv_250)
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [BeautifulSoup Documentation](https://www.crummy.com/software/BeautifulSoup/)

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso de Front End da FIAP.

---

**Desenvolvido por:** Alan de Souza Maximiano da Silva (RM: 557088)  
**Data:** 2025  
**Instituição:** FIAP - Faculdade de Informática e Administração Paulista
