#!/usr/bin/env python3
"""
Script para corrigir o erro do TF-IDF no notebook
"""

import json
import re

def corrigir_tfidf_no_notebook(arquivo_notebook):
    """
    Corrige os parâmetros do TF-IDF no notebook
    """
    # Ler o notebook
    with open(arquivo_notebook, 'r', encoding='utf-8') as f:
        notebook = json.load(f)
    
    # Procurar e corrigir os parâmetros do TF-IDF
    for cell in notebook['cells']:
        if cell['cell_type'] == 'code':
            source = ''.join(cell['source'])
            
            # Corrigir min_df=2 para min_df=1
            if 'min_df=2' in source:
                cell['source'] = [line.replace('min_df=2', 'min_df=1') for line in cell['source']]
                print("Corrigido: min_df=2 -> min_df=1")
            
            # Corrigir max_df=0.8 para max_df=0.95
            if 'max_df=0.8' in source:
                cell['source'] = [line.replace('max_df=0.8', 'max_df=0.95') for line in cell['source']]
                print("Corrigido: max_df=0.8 -> max_df=0.95")
    
    # Salvar o notebook corrigido
    with open(arquivo_notebook, 'w', encoding='utf-8') as f:
        json.dump(notebook, f, indent=1, ensure_ascii=False)
    
    print(f"Notebook {arquivo_notebook} corrigido com sucesso!")

if __name__ == "__main__":
    # Corrigir o notebook principal
    corrigir_tfidf_no_notebook('Notebook1_IMDb_WebScraping_KMeans.ipynb')
    
    print("\nCorreções aplicadas:")
    print("- min_df=2 -> min_df=1")
    print("- max_df=0.8 -> max_df=0.95")
    print("\nAgora você pode executar o notebook sem o erro do TF-IDF!")
