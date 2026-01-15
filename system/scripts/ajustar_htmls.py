#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para ajustar todos os HTMLs da pasta system/html
Garante que todos tenham os scripts de pesquisa e botões corretos
"""

import os
import re
from pathlib import Path

# Caminho da pasta system/html
HTML_DIR = Path('system/html')

# Scripts que devem estar presentes
REQUIRED_SCRIPTS = [
    '../../system/js/pesquisa.js',
    '../../system/js/botoes.js'
]

# Estrutura do header que deve existir
HEADER_PATTERN = re.compile(
    r'<header\s+class="site-header">.*?</header>',
    re.DOTALL
)

# Padrão para encontrar os scripts antes do </body> ou </footer>
SCRIPT_PATTERN = re.compile(
    r'(<script\s+src="../../system/js/(?:pesquisa|botoes)\.js"></script>)',
    re.IGNORECASE
)


def has_header_with_buttons(html_content):
    """Verifica se o HTML tem o header com os botões"""
    header_match = HEADER_PATTERN.search(html_content)
    if not header_match:
        return False
    
    header_content = header_match.group(0)
    return 'back-button' in header_content and 'home-button' in header_content


def has_required_scripts(html_content):
    """Verifica se o HTML tem os scripts necessários"""
    for script in REQUIRED_SCRIPTS:
        if script not in html_content:
            return False
    return True


def add_header_if_missing(html_content):
    """Adiciona o header com botões se não existir"""
    if has_header_with_buttons(html_content):
        return html_content, False
    
    # Template do header
    header_template = '''<header class="site-header">
  <div class="container">
    <button class="back-button">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button class="home-button">
      <i class="fas fa-home"></i>
    </button>
  </div>
</header>

'''
    
    # Tenta inserir após o <body>
    body_match = re.search(r'<body[^>]*>', html_content, re.IGNORECASE)
    if body_match:
        insert_pos = body_match.end()
        html_content = html_content[:insert_pos] + '\n' + header_template + html_content[insert_pos:]
        return html_content, True
    
    return html_content, False


def add_scripts_if_missing(html_content):
    """Adiciona os scripts necessários se não existirem"""
    if has_required_scripts(html_content):
        return html_content, False
    
    # Template dos scripts
    scripts_template = '''<script src="../../system/js/pesquisa.js"></script>
<script src="../../system/js/botoes.js"></script>
'''
    
    # Tenta encontrar </body> ou </footer> para inserir antes
    body_end_match = re.search(r'</body>', html_content, re.IGNORECASE)
    footer_match = re.search(r'<footer[^>]*>', html_content, re.IGNORECASE)
    
    if body_end_match:
        insert_pos = body_end_match.start()
        html_content = html_content[:insert_pos] + '\n' + scripts_template + html_content[insert_pos:]
        return html_content, True
    elif footer_match:
        insert_pos = footer_match.start()
        html_content = html_content[:insert_pos] + '\n' + scripts_template + html_content[insert_pos:]
        return html_content, True
    
    return html_content, False


def ensure_font_awesome(html_content):
    """Garante que o Font Awesome está incluído"""
    if 'font-awesome' in html_content.lower() or 'fontawesome' in html_content.lower():
        return html_content, False
    
    font_awesome_link = '''  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
'''
    
    # Tenta inserir antes do </head>
    head_end_match = re.search(r'</head>', html_content, re.IGNORECASE)
    if head_end_match:
        insert_pos = head_end_match.start()
        html_content = html_content[:insert_pos] + font_awesome_link + '\n' + html_content[insert_pos:]
        return html_content, True
    
    return html_content, False


def process_html_file(file_path):
    """Processa um arquivo HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = []
        
        # Verificar e adicionar Font Awesome
        content, changed = ensure_font_awesome(content)
        if changed:
            changes_made.append("Font Awesome adicionado")
        
        # Verificar e adicionar header
        content, changed = add_header_if_missing(content)
        if changed:
            changes_made.append("Header com botões adicionado")
        
        # Verificar e adicionar scripts
        content, changed = add_scripts_if_missing(content)
        if changed:
            changes_made.append("Scripts adicionados")
        
        # Salvar se houver mudanças
        if changes_made:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, changes_made
        
        return False, []
    
    except Exception as e:
        return None, [f"Erro: {str(e)}"]


def main():
    """Função principal"""
    if not HTML_DIR.exists():
        print(f"❌ Pasta {HTML_DIR} não encontrada!")
        return
    
    html_files = list(HTML_DIR.glob('*.html'))
    
    if not html_files:
        print(f"❌ Nenhum arquivo HTML encontrado em {HTML_DIR}")
        return
    
    print(f"📁 Encontrados {len(html_files)} arquivos HTML\n")
    
    updated_count = 0
    error_count = 0
    unchanged_count = 0
    
    for html_file in sorted(html_files):
        result, changes = process_html_file(html_file)
        
        if result is None:
            print(f"❌ {html_file.name}: {', '.join(changes)}")
            error_count += 1
        elif result:
            print(f"✅ {html_file.name}")
            for change in changes:
                print(f"   • {change}")
            updated_count += 1
        else:
            unchanged_count += 1
    
    print(f"\n{'='*60}")
    print(f"📊 Resumo:")
    print(f"   ✅ Atualizados: {updated_count}")
    print(f"   ⚠️  Sem mudanças: {unchanged_count}")
    print(f"   ❌ Erros: {error_count}")
    print(f"{'='*60}")


if __name__ == '__main__':
    main()
