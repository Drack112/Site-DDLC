#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para remover os scripts JavaScript e botões dos HTMLs da pasta system/html
"""

import os
import re
from pathlib import Path

# Caminho da pasta system/html
HTML_DIR = Path('system/html')

# Scripts que devem ser removidos
SCRIPTS_TO_REMOVE = [
    r'<script\s+src="../../system/js/pesquisa\.js"></script>',
    r'<script\s+src="../../system/js/botoes\.js"></script>',
    r'<script\s+src="\.\./\.\./system/js/pesquisa\.js"></script>',
    r'<script\s+src="\.\./\.\./system/js/botoes\.js"></script>',
]

# Padrão para o header com botões
HEADER_PATTERN = re.compile(
    r'<header\s+class="site-header">.*?</header>\s*',
    re.DOTALL
)


def remove_scripts(html_content):
    """Remove os scripts de pesquisa e botões"""
    changes = []
    original_content = html_content
    
    for script_pattern in SCRIPTS_TO_REMOVE:
        pattern = re.compile(script_pattern, re.IGNORECASE)
        if pattern.search(html_content):
            html_content = pattern.sub('', html_content)
            changes.append("Script removido")
    
    # Remover linhas vazias extras que podem ter ficado
    html_content = re.sub(r'\n\s*\n\s*\n+', '\n\n', html_content)
    
    return html_content, len(changes) > 0, changes


def remove_header_with_buttons(html_content):
    """Remove o header com os botões"""
    if HEADER_PATTERN.search(html_content):
        html_content = HEADER_PATTERN.sub('', html_content)
        # Remover linhas vazias extras
        html_content = re.sub(r'\n\s*\n\s*\n+', '\n\n', html_content)
        return html_content, True
    return html_content, False


def process_html_file(file_path):
    """Processa um arquivo HTML"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes_made = []
        
        # Remover scripts
        content, scripts_removed, script_changes = remove_scripts(content)
        if scripts_removed:
            changes_made.extend(script_changes)
        
        # Remover header com botões
        content, header_removed = remove_header_with_buttons(content)
        if header_removed:
            changes_made.append("Header com botões removido")
        
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
