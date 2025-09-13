# 🚀 Guia Completo do Jupyter - Instalação e Uso

## ✅ Instalação Concluída!

O Jupyter foi instalado com sucesso no seu sistema! Aqui está tudo que você precisa saber:

## 📋 O que foi instalado:

- **Jupyter Notebook** - Interface clássica
- **Jupyter Lab** - Interface moderna e mais avançada
- **IPython** - Kernel Python interativo
- **Todas as bibliotecas necessárias** para os notebooks de clusterização

## 🚀 Como Iniciar o Jupyter:

### **Opção 1: Jupyter Lab (Recomendado)**
```bash
jupyter lab
```

### **Opção 2: Jupyter Notebook (Clássico)**
```bash
jupyter notebook
```

### **Opção 3: Iniciar em porta específica**
```bash
jupyter lab --port=8889
```

## 🌐 Acessando o Jupyter:

1. **Abra seu navegador** (Chrome, Firefox, Safari)
2. **Digite na barra de endereços:**
   - `http://localhost:8888` (porta padrão)
   - `http://localhost:8889` (se você especificou outra porta)

3. **Se pedir token/senha:**
   - Copie o token que aparece no terminal
   - Cole no navegador

## 📁 Estrutura dos Arquivos:

```
/Users/alansms/Documents/FIAP/2025/2 SEMESTRE/CP1-Front_End/
├── Notebook1_IMDb_WebScraping_KMeans.ipynb
├── Notebook2_Modelo_Comparacao_Features.ipynb
├── Clusterizacao_ImdbMovies_PyCaret.ipynb
├── Clusterizacao_ImdbMovies_Completo.ipynb
├── TimeSeries_parte1.ipynb
└── GUIA_JUPYTER.md
```

## 🎯 Como Usar os Notebooks:

### **1. Abrir um Notebook:**
- Clique duas vezes no arquivo `.ipynb`
- O notebook abrirá em uma nova aba

### **2. Executar Células:**
- **Shift + Enter**: Executa célula e vai para próxima
- **Ctrl + Enter**: Executa célula e fica na mesma
- **Alt + Enter**: Executa célula e cria nova abaixo

### **3. Tipos de Células:**
- **Code**: Código Python
- **Markdown**: Texto formatado
- **Raw**: Texto simples

## 🔧 Solução de Problemas:

### **Problema: Não consigo ver os prints**
**Soluções:**
1. Reinicie o kernel: `Kernel` → `Restart & Clear Output`
2. Use as funções `print_and_display()` nos notebooks
3. Execute uma célula por vez

### **Problema: Erro de importação**
**Soluções:**
1. Verifique se está no kernel correto (Python 3)
2. Execute: `!pip install [nome_da_biblioteca]`
3. Reinicie o kernel após instalação

### **Problema: Jupyter não abre**
**Soluções:**
1. Verifique se o terminal está rodando
2. Tente uma porta diferente: `jupyter lab --port=8889`
3. Reinicie o terminal e execute novamente

## 📚 Comandos Úteis:

### **No Terminal:**
```bash
# Iniciar Jupyter Lab
jupyter lab

# Iniciar em porta específica
jupyter lab --port=8889

# Parar o Jupyter
Ctrl + C (no terminal)

# Ver versão
jupyter --version

# Listar kernels
jupyter kernelspec list
```

### **No Notebook:**
```python
# Verificar versões
import sys
print(sys.version)

# Instalar biblioteca
!pip install nome_da_biblioteca

# Ver diretório atual
!pwd

# Listar arquivos
!ls
```

## 🎨 Dicas de Uso:

### **1. Organização:**
- Use células de markdown para títulos e explicações
- Mantenha o código organizado em células pequenas
- Comente seu código

### **2. Performance:**
- Execute células uma por vez
- Use `%time` para medir tempo de execução
- Reinicie o kernel se o notebook ficar lento

### **3. Visualização:**
- Use `plt.show()` para gráficos matplotlib
- Use `display()` para DataFrames
- Use as funções `print_and_display()` dos notebooks

## 🔗 Links Úteis:

- **Documentação Jupyter**: https://jupyter.org/documentation
- **Jupyter Lab**: https://jupyterlab.readthedocs.io/
- **Pandas**: https://pandas.pydata.org/docs/
- **Matplotlib**: https://matplotlib.org/stable/

## 🆘 Suporte:

Se encontrar problemas:
1. Verifique este guia
2. Consulte a documentação oficial
3. Reinicie o kernel e tente novamente
4. Verifique se todas as bibliotecas estão instaladas

---

## 🎉 Pronto para Começar!

Agora você pode:
1. Abrir o Jupyter Lab
2. Carregar os notebooks de clusterização
3. Executar o código e ver os resultados
4. Fazer suas análises de dados!

**Boa sorte com seu projeto de clusterização! 🚀**

