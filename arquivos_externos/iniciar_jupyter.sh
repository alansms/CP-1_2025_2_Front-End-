#!/bin/bash

# Script para iniciar o Jupyter Lab
# Criado para facilitar o acesso aos notebooks

echo "🚀 Iniciando Jupyter Lab..."
echo "📁 Diretório: $(pwd)"
echo "🌐 URL: http://localhost:8888"
echo ""

# Verificar se o Jupyter já está rodando
if pgrep -f "jupyter-lab" > /dev/null; then
    echo "⚠️  Jupyter já está rodando!"
    echo "🌐 Acesse: http://localhost:8888"
    echo ""
    echo "Para parar o Jupyter, pressione Ctrl+C"
    echo "Para ver o token, execute: jupyter server list"
else
    echo "🔄 Iniciando Jupyter Lab..."
    jupyter lab --no-browser --port=8888
fi

