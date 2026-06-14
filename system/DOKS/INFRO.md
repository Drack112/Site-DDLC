# Informações do Projeto

## ⚠️ Aviso Importante

**Este projeto inicial não é de minha autoria.** Apenas realizei alterações e adaptações para uma forma que me agrada melhor, reformulando a estrutura e o design conforme minhas necessidades.

---

## 📋 Principais Alterações Realizadas

### 1. Estrutura de Dados e Metadados

- **Artes (Imagens)** e **Banners**: Todas as imagens foram extraídas e organizadas como metadados
- **Links para Download**: Todos os links de download foram convertidos em metadados estruturados
- **Sistema de Metadados**: Todas essas informações foram consolidadas no arquivo `system/data/Sites_v2.json`
- **Carregamento Dinâmico**: O arquivo `system/js/index.js` é responsável por carregar e processar todos esses metadados de forma dinâmica

**Estrutura dos Metadados:**
```json
{
  "id": "identificador-unico",
  "title": "Título do Mod",
  "images": {
    "cover": "caminho/para/imagem",
    "og": "url-da-imagem-og"
  },
  "downloads": [
    {
      "label": "PC",
      "url": "link-para-download"
    }
  ],
  "description": {
    "short": "Descrição curta",
    "long": "Descrição completa"
  }
}
```

### 2. Páginas HTML Reestruturadas

- **Pasta `system/html`**: Todos os arquivos HTML dentro desta pasta foram **copiados do projeto original** e **ajustados para um novo layout completamente independente**
- **Layout Independente**: O novo layout não depende do sistema antigo e foi desenvolvido do zero
- **Design Moderno**: Interface redesenhada com foco em usabilidade e responsividade

### 3. Conteúdo +18

- **Totalmente Ignorado**: Todo e qualquer conteúdo classificado como +18 foi completamente removido e ignorado durante o processo de migração
- **Filtros Aplicados**: O sistema não inclui, processa ou exibe conteúdo adulto

### 4. Código e Estrutura

- **Reescrita Independente**: O código atual foi reescrito de forma independente, sem reaproveitamento direto da base de código antiga
- **Nova Arquitetura**: Todas as alterações foram desenvolvidas criando uma nova base de código do zero, focada em modernização e organização

---

## 🔄 Versões do Projeto

O projeto sempre manterá **duas versões distintas**:

### Versão Pura (Static)
- HTML estático puro
- Sem necessidade de servidor
- Pode ser hospedado em qualquer serviço de hosting estático
- Ideal para uso básico e simples

### Versão com Server
- Inclui funcionalidades de servidor
- Permite interações mais complexas
- Suporte a recursos dinâmicos
- Ideal para recursos avançados e funcionalidades interativas

---

## 📁 Estrutura de Arquivos

```
Site-DDLC/
├── system/
│   ├── data/
│   │   └── Sites_v2.json          # Metadados (artes, banners, links, etc.)
│   ├── js/
│   │   └── index.js               # Carregamento dinâmico dos metadados
│   ├── html/                      # Páginas HTML (copiadas e ajustadas)
│   │   ├── *.html                 # Layout independente e moderno
│   └── DOKS/
│       └── INFRO.md               # Este arquivo
├── index.html                     # Página principal
└── README.md                      # Documentação principal
```

---

## 🎯 Objetivo das Alterações

As alterações foram realizadas com o objetivo de:
- Modernizar a estrutura do projeto
- Melhorar a organização e manutenibilidade
- Criar um sistema mais escalável e fácil de atualizar
- Separar dados (JSON) da apresentação (HTML/CSS/JS)
- Facilitar futuras expansões e melhorias

---

## 📝 Notas Importantes

- Este projeto é uma reformulação do projeto original
- Todos os dados visuais (artes, banners) são mantidos apenas como metadados
- O sistema foi completamente redesenhado do zero
- O foco está em manter uma base de código limpa e organizada

---

## 🎨 Sistema de Cores e Design

O projeto utiliza um sistema de cores baseado nos personagens de Doki Doki Literature Club, documentado em [`GUIA-CORES-DOKIS.md`](GUIA-CORES-DOKIS.md).

### Resumo do Sistema

O guia apresenta um **sistema completo de cores semânticas** onde cada personagem (Doki) representa uma ferramenta visual funcional:

- **💗 Sayori** (Rosa salmão) - Leveza, avisos suaves, conteúdo reconfortante
- **💜 Yuri** (Roxo profundo) - Intensidade, profundidade, conteúdo maduro  
- **💖 Natsuki** (Rosa chiclete) - Impacto visual, comédia, conteúdo curto
- **💚 Monika** (Verde esmeralda) - Destaques, recomendações, controle
- **🖤 DDLC Core** (Preto/Cinza) - Background, glitch, atmosfera do jogo original

O sistema inclui classes CSS pré-definidas para:
- Tags de personagens
- Badges especiais (recomendado, completo, NSFW, etc.)
- Botões temáticos
- Cards de mods
- Backgrounds e efeitos de hover
- Efeitos glitch para elementos especiais

Para mais detalhes, exemplos de uso e boas práticas, consulte o arquivo completo: [`GUIA-CORES-DOKIS.md`](GUIA-CORES-DOKIS.md)
