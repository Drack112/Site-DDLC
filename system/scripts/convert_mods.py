#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para converter arquivos HTML da pasta Mods para o template padronizado.
"""

import os
import re
from pathlib import Path
from html.parser import HTMLParser
from html import escape

class ModDataExtractor(HTMLParser):
    """Parser para extrair dados dos arquivos HTML antigos."""
    
    def __init__(self):
        super().__init__()
        self.title = ""
        self.description = ""
        self.image = ""
        self.metadata = []
        self.download_link = ""
        
        self.in_title = False
        self.in_description = False
        self.in_metadata = False
        self.in_download = False
        self.current_metadata_label = ""
        self.current_metadata_value = ""
        self.in_span = False
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Título
        if tag == 'h3' and 'class' in attrs_dict and 'anime__details__title' in attrs_dict['class']:
            self.in_title = True
        elif tag == 'title':
            self.in_title = True
            
        # Descrição
        if tag == 'div' and 'class' in attrs_dict and 'anime__details__text' in attrs_dict['class']:
            self.in_description = True
        elif self.in_description and tag == 'p':
            self.in_description = True
            
        # Imagem
        if tag == 'div' and 'class' in attrs_dict and 'anime__details__pic' in attrs_dict.get('class', ''):
            if 'data-setbg' in attrs_dict:
                self.image = attrs_dict['data-setbg']
        elif tag == 'img' and 'src' in attrs_dict and not self.image:
            self.image = attrs_dict['src']
            
        # Metadados
        if tag == 'div' and 'class' in attrs_dict and 'anime__details__widget' in attrs_dict.get('class', ''):
            self.in_metadata = True
        elif self.in_metadata and tag == 'li':
            self.current_metadata_label = ""
            self.current_metadata_value = ""
        elif self.in_metadata and tag == 'span':
            self.in_span = True
            
        # Download
        if tag == 'a' and 'class' in attrs_dict and 'watch-btn' in attrs_dict['class']:
            if 'href' in attrs_dict:
                self.download_link = attrs_dict['href']
                
    def handle_endtag(self, tag):
        if tag == 'h3' or tag == 'title':
            self.in_title = False
        elif tag == 'p' and self.in_description:
            self.in_description = False
        elif tag == 'li' and self.in_metadata:
            if self.current_metadata_label and self.current_metadata_value:
                self.metadata.append({
                    'label': self.current_metadata_label.strip(),
                    'value': self.current_metadata_value.strip()
                })
            self.current_metadata_label = ""
            self.current_metadata_value = ""
        elif tag == 'span':
            self.in_span = False
            
    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()
        elif self.in_description and not self.description:
            # Pega apenas o primeiro parágrafo da descrição
            if data.strip():
                self.description = data.strip()
        elif self.in_metadata and self.in_span:
            self.current_metadata_label = data.strip()
        elif self.in_metadata and not self.in_span and self.current_metadata_label:
            # Valor do metadata (pode ter links dentro)
            if data.strip():
                self.current_metadata_value += data.strip() + " "


def extract_data_from_html(file_path):
    """Extrai dados de um arquivo HTML antigo."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Usar regex como fallback se o parser não funcionar bem
        extractor = ModDataExtractor()
        extractor.feed(content)
        
        # Fallback para regex se o parser não capturou tudo
        if not extractor.title:
            title_match = re.search(r'<h3[^>]*>([^<]+)</h3>', content)
            if title_match:
                extractor.title = title_match.group(1).strip()
            else:
                title_match = re.search(r'<title>([^<]+)</title>', content)
                if title_match:
                    extractor.title = title_match.group(1).strip()
        
        if not extractor.description or extractor.description == extractor.title:
            # Buscar a seção anime__details__text completa
            text_section_match = re.search(
                r'<div[^>]*class="[^"]*anime__details__text[^"]*"[^>]*>(.*?)</div>\s*</div>',
                content,
                re.DOTALL
            )
            if text_section_match:
                text_content = text_section_match.group(1)
                # Buscar todos os parágrafos <p> que vêm depois do rating
                # Primeiro, encontrar onde termina o rating
                rating_end = text_content.find('</div>', text_content.find('anime__details__rating'))
                if rating_end > 0:
                    text_after_rating = text_content[rating_end:]
                    # Buscar todos os parágrafos <p>
                    p_matches = re.findall(r'<p[^>]*>(.*?)</p>', text_after_rating, re.DOTALL)
                    descriptions = []
                    for p_text in p_matches:
                        # Remove tags HTML
                        p_text = re.sub(r'<strong[^>]*>', '', p_text)
                        p_text = re.sub(r'</strong>', '', p_text)
                        p_text = re.sub(r'<[^>]+>', '', p_text)
                        p_text = re.sub(r'\s+', ' ', p_text).strip()
                        if p_text and len(p_text) > 5 and p_text not in descriptions:
                            descriptions.append(p_text)
                    
                    if descriptions:
                        # Juntar todos os parágrafos
                        extractor.description = ' '.join(descriptions)
            
            # Se ainda não tem descrição, tentar buscar do meta description
            if not extractor.description or extractor.description == extractor.title:
                meta_desc_match = re.search(
                    r'<meta[^>]*name="description"[^>]*content="([^"]+)"',
                    content
                )
                if meta_desc_match:
                    meta_desc = meta_desc_match.group(1).strip()
                    if meta_desc and len(meta_desc) > 10:
                        extractor.description = meta_desc
        
        if not extractor.image:
            # Buscar data-setbg
            img_match = re.search(r'data-setbg="([^"]+)"', content)
            if img_match:
                extractor.image = img_match.group(1)
            else:
                # Buscar src em img dentro de anime__details__pic
                img_match = re.search(
                    r'<div[^>]*class="[^"]*anime__details__pic[^"]*"[^>]*>.*?<img[^>]*src="([^"]+)"',
                    content,
                    re.DOTALL
                )
                if img_match:
                    extractor.image = img_match.group(1)
        
        if not extractor.metadata:
            # Extrair metadados usando regex
            widget_match = re.search(
                r'<div[^>]*class="[^"]*anime__details__widget[^"]*"[^>]*>.*?<ul[^>]*>(.*?)</ul>',
                content,
                re.DOTALL
            )
            if widget_match:
                ul_content = widget_match.group(1)
                li_matches = re.finditer(r'<li[^>]*>(.*?)</li>', ul_content, re.DOTALL)
                for li_match in li_matches:
                    li_text = li_match.group(1)
                    # Extrair label e valor
                    span_match = re.search(r'<span[^>]*>([^<]+)</span>', li_text)
                    if span_match:
                        label = span_match.group(1).strip()
                        # Remover o span do texto para pegar o valor
                        value_text = li_text.replace(span_match.group(0), '')
                        # Remover tags HTML e links
                        value_text = re.sub(r'<a[^>]*>', '', value_text)
                        value_text = re.sub(r'</a>', '', value_text)
                        value_text = re.sub(r'<[^>]+>', '', value_text)
                        value_text = re.sub(r'\s+', ' ', value_text).strip()
                    if label and value_text:
                        # Remover dois pontos do label se existirem
                        label = label.rstrip(':').strip()
                        # Se o label termina com espaço e dois pontos, remover
                        label = re.sub(r'\s*:\s*$', '', label)
                        extractor.metadata.append({
                            'label': label,
                            'value': value_text
                        })
        
        if not extractor.download_link:
            # Buscar link de download
            download_match = re.search(
                r'<a[^>]*class="[^"]*watch-btn[^"]*"[^>]*href="([^"]+)"',
                content
            )
            if download_match:
                extractor.download_link = download_match.group(1)
        
        return extractor
        
    except Exception as e:
        print(f"Erro ao processar {file_path}: {e}")
        return None


def adapt_image_path(image_path):
    """Adapta caminho de imagem para formato absoluto."""
    if not image_path:
        return ""
    
    # Se já é URL absoluta, manter
    if image_path.startswith('http://') or image_path.startswith('https://'):
        return image_path
    
    # Converter caminhos relativos para absolutos
    image_path = image_path.replace('../lista/img/', '/lista/img/')
    image_path = image_path.replace('../../lista/img/', '/lista/img/')
    image_path = image_path.replace('../lista/', '/lista/')
    image_path = image_path.replace('../../lista/', '/lista/')
    
    # Se não começa com /, adicionar /lista/img/
    if not image_path.startswith('/'):
        if 'lista/img/' in image_path:
            image_path = '/' + image_path
        else:
            image_path = '/lista/img/' + image_path
    
    return image_path


def sanitize_filename(filename):
    """Sanitiza nome de arquivo removendo espaços e caracteres especiais."""
    # Remove extensão
    name = os.path.splitext(filename)[0]
    
    # Substitui espaços por hífens
    name = name.replace(' ', '-')
    
    # Remove caracteres especiais (mantém apenas letras, números, hífens e underscores)
    name = re.sub(r'[^a-zA-Z0-9\-_]', '', name)
    
    # Remove múltiplos hífens consecutivos
    name = re.sub(r'-+', '-', name)
    
    # Remove hífens no início e fim
    name = name.strip('-')
    
    return name + '.html'


def short_description(text, max_len=120):
    """Limita e simplifica descrição para exibição."""
    if not text:
        return ""
    # Normaliza espaços
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) <= max_len:
        return text
    # Corta no último espaço antes do limite para não quebrar palavras
    return text[:max_len].rsplit(' ', 1)[0] + '...'


def generate_html(data):
    """Gera HTML seguindo o template."""
    
    # Whitelist de metadados permitidos (em ordem fixa)
    ALLOWED_META = [
        "Duração",
        "Categoria",
        "Status",
        "Desenvolvedor",
        "Tradutor",
        "Revisor",
    ]
    
    # Filtrar e ordenar metadados
    filtered = {}
    for meta in data.metadata:
        label = meta["label"].strip()
        value = meta["value"].strip()
        # Normalizar label (remover dois pontos e espaços extras)
        label = re.sub(r'\s*:\s*$', '', label)
        if label in ALLOWED_META:
            # Evitar duplicados, manter o primeiro encontrado
            if label not in filtered:
                filtered[label] = value
    
    # Construir HTML de metadados na ordem fixa
    metadata_html = ""
    for label in ALLOWED_META:
        if label in filtered:
            metadata_html += (
                f'      <li><strong>{escape(label)}:</strong> '
                f'{escape(filtered[label])}</li>\n'
            )
    
    # Limitar apenas meta description, descrição visível sem limite
    visible_description = data.description if data.description else ""
    # Normalizar espaços na descrição visível
    if visible_description:
        visible_description = re.sub(r'\s+', ' ', visible_description).strip()
    meta_description = short_description(data.description, max_len=60)
    
    html_template = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>{escape(data.title)} — Mirai Translations</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- SEO básico -->
  <meta name="description" content="{escape(meta_description)}">
  <meta name="author" content="Projeto comunitário — Mirai Translations">

  <!-- CSS único -->
  <link rel="stylesheet" href="../../system/css/sub_sites.css">

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body>

<header class="site-header">
  <div class="container">
    <button class="back-button">
      <i class="fas fa-arrow-left"></i>
    </button>
    <button class="home-button">
      <i class="fas fa-home"></i>
    </button>
  </div>
</header>

<main class="mod-page">
  <section class="mod-hero">
    <img src="{escape(adapt_image_path(data.image))}" alt="">
  </section>

  <section class="mod-info">
    <h1>{escape(data.title)}</h1>

    <p class="mod-description">
      {escape(visible_description)}
    </p>

    <ul class="mod-meta">
{metadata_html}    </ul>

    <a class="btn-download" href="{escape(data.download_link)}">
      ⬇ Download
    </a>
  </section>
</main>

<footer class="site-footer">
  <p>
    Projeto comunitário — Mirai Translations®<br>
  </p>
</footer>

</body>
</html>"""
    
    return html_template


def main():
    """Função principal."""
    mods_dir = Path('Mods')
    output_dir = Path('system/html')
    
    # Criar diretório de saída se não existir
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Listar arquivos HTML (exceto Teste.html)
    html_files = [f for f in mods_dir.glob('*.html') if f.name != 'Teste.html']
    
    print(f"Encontrados {len(html_files)} arquivos para processar...")
    
    processed = 0
    errors = []
    
    for html_file in html_files:
        print(f"Processando: {html_file.name}")
        
        # Extrair dados
        data = extract_data_from_html(html_file)
        
        if not data:
            errors.append(f"{html_file.name}: Erro na extração de dados")
            continue
        
        # Validar dados mínimos
        if not data.title:
            errors.append(f"{html_file.name}: Título não encontrado")
            continue
        
        # Gerar HTML
        try:
            html_content = generate_html(data)
            
            # Sanitizar nome do arquivo
            new_filename = sanitize_filename(html_file.name)
            output_path = output_dir / new_filename
            
            # Salvar arquivo
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            processed += 1
            print(f"  ✓ Convertido: {new_filename}")
            
        except Exception as e:
            errors.append(f"{html_file.name}: {e}")
            print(f"  ✗ Erro: {e}")
    
    print(f"\n{'='*50}")
    print(f"Processamento concluído!")
    print(f"Arquivos processados: {processed}/{len(html_files)}")
    
    if errors:
        print(f"\nErros encontrados ({len(errors)}):")
        for error in errors:
            print(f"  - {error}")
    else:
        print("Nenhum erro encontrado!")


if __name__ == '__main__':
    main()
