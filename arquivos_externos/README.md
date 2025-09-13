# Arquivos Externos - Projeto IMDb Clustering

Esta pasta contém todos os arquivos auxiliares e de dados gerados pelos notebooks principais.

## 📁 Estrutura dos Arquivos

### 📊 Arquivos de Dados (CSV)
- **`imdb_top250_enhanced.csv`** - Dataset principal com dados extraídos do IMDb Top 250
- **`imdb_top250_with_clusters.csv`** - Dataset com clusters do Notebook 1
- **`cluster_summary.csv`** - Resumo estatístico dos clusters do Notebook 1
- **`model_comparison_summary.csv`** - Comparação de métricas entre os dois modelos

### 🐍 Scripts Python
- **`corrigir_notebook_completo.py`** - Script para aplicar código de referência
- **`corrigir_tfidf.py`** - Script para corrigir parâmetros TF-IDF
- **`corrigir_web_scraping.py`** - Script para corrigir web scraping
- **`limpar_notebooks.py`** - Script para limpar notebooks
- **`testar_web_scraping.py`** - Script para testar web scraping

### 📋 Documentação
- **`GUIA_JUPYTER.md`** - Guia de uso do Jupyter
- **`RESUMO_IMPLEMENTACAO.md`** - Resumo da implementação
- **`RESUMO_LIMPEZA.md`** - Resumo do processo de limpeza

### 🔧 Utilitários
- **`iniciar_jupyter.sh`** - Script para iniciar Jupyter Lab

### 💾 Backups
- **`Notebook1_IMDb_WebScraping_KMeans_Backup.ipynb`** - Backup do Notebook 1
- **`Notebook2_Modelo_Comparacao_Features_Backup.ipynb`** - Backup do Notebook 2

## 🚀 Como Usar

1. **Para executar os notebooks principais:** Use os arquivos `.ipynb` no diretório raiz
2. **Para acessar os dados:** Os notebooks carregam automaticamente os CSVs desta pasta
3. **Para scripts auxiliares:** Execute os scripts Python conforme necessário

## 📝 Notas Importantes

- Os notebooks principais referenciam automaticamente os arquivos desta pasta
- Mantenha a estrutura de pastas para que os notebooks funcionem corretamente
- Os arquivos CSV são gerados automaticamente pelos notebooks
- Os scripts Python são utilitários para manutenção e correção

## 🔄 Fluxo de Dados

1. **Notebook 1** → Gera `imdb_top250_enhanced.csv` e `imdb_top250_with_clusters.csv`
2. **Notebook 2** → Carrega dados do Notebook 1 e gera `model_comparison_summary.csv`
3. **Scripts** → Auxiliam na manutenção e correção dos notebooks
