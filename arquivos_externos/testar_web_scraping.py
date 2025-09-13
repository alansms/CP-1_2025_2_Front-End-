#!/usr/bin/env python3
"""
Script para testar o web scraping do IMDb
"""

import requests
from bs4 import BeautifulSoup
import time

def testar_web_scraping():
    """
    Testa o web scraping do IMDb
    """
    url = "https://www.imdb.com/chart/top/?ref_=nv_mv_250"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
    }
    
    try:
        print("Testando conexão com IMDb...")
        response = requests.get(url, headers=headers, timeout=15)
        print(f"Status da resposta: {response.status_code}")
        
        if response.status_code == 200:
            print("Conexão bem-sucedida!")
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Tentar diferentes seletores
            selectors = [
                'tbody.lister-list',
                'table.chart tbody',
                '.lister-list',
                'tbody[class*="lister"]'
            ]
            
            for selector in selectors:
                table = soup.select_one(selector)
                if table:
                    print(f"Tabela encontrada com seletor: {selector}")
                    rows = table.find_all('tr')
                    print(f"Número de linhas encontradas: {len(rows)}")
                    
                    # Testar extração de dados
                    if rows:
                        first_row = rows[0]
                        title_cell = first_row.find('td', class_='titleColumn')
                        if title_cell:
                            title_link = title_cell.find('a')
                            title = title_link.get_text(strip=True) if title_link else "N/A"
                            print(f"Primeiro filme encontrado: {title}")
                            return True
                    break
            
            # Método alternativo: procurar por links de filmes
            print("Tentando método alternativo...")
            movie_links = soup.find_all('a', href=lambda x: x and '/title/tt' in x)
            if movie_links:
                print(f"Encontrados {len(movie_links)} links de filmes")
                if movie_links:
                    title = movie_links[0].get_text(strip=True)
                    print(f"Primeiro filme encontrado (método alternativo): {title}")
                    return True
            
            print("Nenhuma tabela ou link de filme encontrado!")
            return False
            
        else:
            print(f"Erro na conexão: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"Erro ao testar web scraping: {str(e)}")
        return False

if __name__ == "__main__":
    print("=== TESTE DE WEB SCRAPING IMDb ===\n")
    
    sucesso = testar_web_scraping()
    
    if sucesso:
        print("\nWeb scraping funcionando! Você pode executar o notebook.")
    else:
        print("\nWeb scraping não funcionou. O notebook usará dados alternativos.")
        print("Isso não afetará a análise de clusterização.")
