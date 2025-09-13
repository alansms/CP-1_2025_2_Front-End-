#!/usr/bin/env python3
"""
Script para limpar notebooks removendo ícones, emojis e mensagens de alerta
"""

import json
import re

def limpar_texto(texto):
    """
    Remove ícones, emojis e mensagens de alerta do texto
    """
    # Remover emojis e ícones comuns
    emojis = [
        '🔍', '✅', '⚠️', '🌐', '⏱️', '💾', '📊', '📋', '🚀', '🔧', '🆘',
        '🎯', '📈', '📉', '🎨', '🔬', '💡', '🎪', '🎭', '🎨', '🎯',
        '📝', '📄', '📑', '📊', '📈', '📉', '📋', '📌', '📍', '📎',
        '🔗', '🔒', '🔓', '🔑', '🔐', '🔏', '🔍', '🔎', '🔬', '🔭',
        '⚡', '🔥', '💥', '🌟', '⭐', '✨', '💫', '🌈', '☀️', '🌙',
        '🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍰', '🍕', '🍔', '🍟',
        '🚨', '🚩', '🚪', '🚪', '🚪', '🚪', '🚪', '🚪', '🚪', '🚪'
    ]
    
    for emoji in emojis:
        texto = texto.replace(emoji, '')
    
    # Remover mensagens de alerta comuns
    alertas = [
        'TESTE DE PRINT',
        'Se você vê esta mensagem',
        'os prints estão funcionando',
        'CONFIGURAÇÃO DE OUTPUT',
        'Agora os prints devem aparecer',
        'Se você não vê esta mensagem',
        'há um problema com a configuração',
        'DIAGNÓSTICO:',
        'TESTE SIMPLES',
        'VERSÃO ALTERNATIVA',
        'DISPLAY MELHORADO',
        'Soluções para Problemas',
        'Guia de Solução de Problemas',
        'CONFIGURAÇÃO AVANÇADA',
        'GARANTIR OUTPUT VISÍVEL'
    ]
    
    for alerta in alertas:
        texto = re.sub(f'.*{re.escape(alerta)}.*', '', texto, flags=re.IGNORECASE)
    
    # Remover linhas com apenas símbolos
    texto = re.sub(r'^[=*\-_#\s]+$', '', texto, flags=re.MULTILINE)
    
    # Remover linhas vazias extras
    texto = re.sub(r'\n\s*\n\s*\n', '\n\n', texto)
    
    return texto.strip()

def limpar_notebook(arquivo_notebook):
    """
    Limpa um notebook removendo ícones e mensagens de alerta
    """
    print(f"Limpando notebook: {arquivo_notebook}")
    
    # Ler o notebook
    with open(arquivo_notebook, 'r', encoding='utf-8') as f:
        notebook = json.load(f)
    
    celulas_removidas = 0
    celulas_modificadas = 0
    
    # Processar cada célula
    celulas_limpas = []
    for i, cell in enumerate(notebook['cells']):
        # Verificar se a célula deve ser removida
        if cell['cell_type'] == 'code':
            source = ''.join(cell['source'])
            
            # Remover células de diagnóstico e teste
            if any(palavra in source for palavra in [
                'DIAGNÓSTICO:', 'TESTE DE PRINT', 'TESTE SIMPLES', 
                'CONFIGURAÇÃO AVANÇADA', 'VERSÃO ALTERNATIVA',
                'print_and_display', 'display_df', 'OutputCapture'
            ]):
                print(f"  Removendo célula {i}: Célula de diagnóstico/teste")
                celulas_removidas += 1
                continue
        
        # Limpar o conteúdo da célula
        if 'source' in cell:
            source_original = ''.join(cell['source'])
            source_limpo = limpar_texto(source_original)
            
            if source_original != source_limpo:
                cell['source'] = [source_limpo] if source_limpo else ['']
                celulas_modificadas += 1
        
        celulas_limpas.append(cell)
    
    # Atualizar o notebook
    notebook['cells'] = celulas_limpas
    
    # Salvar o notebook limpo
    with open(arquivo_notebook, 'w', encoding='utf-8') as f:
        json.dump(notebook, f, indent=1, ensure_ascii=False)
    
    print(f"  Células removidas: {celulas_removidas}")
    print(f"  Células modificadas: {celulas_modificadas}")
    print(f"  Notebook limpo salvo!")

def main():
    """
    Função principal
    """
    notebooks = [
        'Notebook1_IMDb_WebScraping_KMeans.ipynb',
        'Notebook2_Modelo_Comparacao_Features.ipynb'
    ]
    
    print("=== LIMPEZA DE NOTEBOOKS ===\n")
    
    for notebook in notebooks:
        try:
            limpar_notebook(notebook)
            print()
        except Exception as e:
            print(f"Erro ao processar {notebook}: {e}\n")
    
    print("=== LIMPEZA CONCLUÍDA ===")
    print("Os notebooks foram limpos e estão prontos para uso profissional!")

if __name__ == "__main__":
    main()
