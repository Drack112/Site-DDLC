# 🎀 Sistema de Cores DDLC — Guia Completo

## 📋 Índice

1. 🎨 Visão Geral
2. 🌈 Variáveis CSS
3. 💗💜💖💚 Paletas das Dokis
4. 🏷️ Classes e Componentes
5. 🔗 Uso com Metadados
6. 💡 Exemplos
7. ✅ Boas Práticas

---

## 🎨 Visão Geral

Este sistema de cores transforma cada personagem (Doki) em uma ferramenta visual funcional. Não é apenas estética — é UX semântico.

### Filosofia de Design
- **Sayori** = Leveza, avisos suaves, conteúdo "reconfortante"
- **Yuri** = Intensidade, profundidade, conteúdo maduro
- **Natsuki** = Impacto visual, comédia, conteúdo curto
- **Monika** = Destaques, recomendações, controle
- **DDLC Core** = Background, glitch, atmosfera do jogo original

---

## 🎨 Variáveis CSS

O sistema utiliza **CSS Custom Properties (Variáveis CSS)** definidas no arquivo `system/css/sub_sites.css` e `system/css/index.css`. Todas as cores das Dokis estão disponíveis como variáveis globais.

### Acessando as Variáveis

```css
/* Uso básico */
.elemento {
    color: var(--sayori-primary);
    background: var(--monika-primary);
    border-color: var(--yuri-primary);
}

/* Uso em gradientes */
.gradiente {
    background: linear-gradient(135deg, var(--monika-primary) 0%, var(--monika-secondary) 100%);
}

/* Uso em sombras */
.sombra {
    box-shadow: 0 4px 15px rgba(67, 181, 129, 0.3); /* Usando valores das variáveis */
}
```

---

## 🌈 Paletas das Dokis

### 💗 Sayori — Alegria Frágil
**Conceito:** Cores quentes, céu de manhã, sorriso que tenta ser sol

| Variável | Hex | Uso |
|----------|-----|-----|
| `--sayori-primary` | `#FF8FA3` | Rosa salmão — cor primária |
| `--sayori-secondary` | `#FFAEC0` | Rosa claro — hover, gradientes |
| `--sayori-accent` | `#FFD1DC` | Rosa pastel — highlights sutis |
| `--sayori-neutral` | `#FFF5F7` | Quase branco rosado — backgrounds |

**Uso ideal:**
- ✅ Avisos suaves
- ✅ Mods slice of life
- ✅ Status "Em tradução"
- ✅ Tags "Leve", "Reconfortante"

---

### 💜 Yuri — Profundidade e Obsessão
**Conceito:** Elegância escura, vinho, silêncio pesado

| Variável | Hex | Uso |
|----------|-----|-----|
| `--yuri-primary` | `#7B4A8E` | Roxo profundo — cor primária |
| `--yuri-secondary` | `#9B6BB3` | Roxo médio — hover, gradientes |
| `--yuri-accent` | `#C7A4D8` | Lavanda — highlights |
| `--yuri-dark` | `#2E1A36` | Quase preto roxeado — backgrounds |

**Uso ideal:**
- ✅ Conteúdo psicológico
- ✅ Mods de terror/horror
- ✅ Conteúdo intenso e maduro
- ✅ Bordas e destaques

---

### 💗💖 Natsuki — Impacto e Contraste
**Conceito:** Doce por fora, ácido por dentro

| Variável | Hex | Uso |
|----------|-----|-----|
| `--natsuki-primary` | `#F49AC2` | Rosa chiclete — cor primária |
| `--natsuki-secondary` | `#FFB6C1` | Rosa claro — hover, gradientes |
| `--natsuki-white` | `#FFFFFF` | Branco puro — contraste máximo |
| `--natsuki-contrast` | `#444444` | Cinza escuro — texto/bordas |

**Uso ideal:**
- ✅ Mods curtos
- ✅ Comédia
- ✅ Badges chamativos
- ✅ Call-to-actions fortes

---

### 💚 Monika — Controle e Clareza
**Conceito:** Equilíbrio, presença, foco

| Variável | Hex | Uso |
|----------|-----|-----|
| `--monika-primary` | `#43B581` | Verde esmeralda — cor primária |
| `--monika-secondary` | `#6ED3A6` | Verde claro — hover, gradientes |
| `--monika-accent` | `#E8FFF3` | Verde pastel — backgrounds |
| `--monika-dark` | `#1F6F4A` | Verde escuro — contraste |

**Uso ideal:**
- ✅ Destaques importantes
- ✅ Mods completos e polidos
- ✅ Botões principais (CTA)
- ✅ Badge "Recomendado"
- ✅ Botões de download

---

### 🖤 DDLC Core — O Jogo em Si
**Conceito:** Quando o site quer sussurrar "algo está errado"

| Variável | Hex | Uso |
|----------|-----|-----|
| `--ddlc-black` | `#0E0E10` | Preto profundo — backgrounds |
| `--ddlc-gray` | `#1C1C22` | Cinza escuro — cards, containers |
| `--ddlc-white` | `#F2F2F2` | Branco envelhecido — texto |
| `--ddlc-red` | `#C92A2A` | Vermelho alarme — erros, glitch |

**Uso ideal:**
- ✅ Background geral do site
- ✅ Efeitos glitch
- ✅ Hover estranho/perturbador
- ✅ Transições psicológicas
- ✅ Estrutura base do layout

---

## 🏷️ Classes e Componentes Disponíveis

### 1. Tags de Categoria (Category Tags)

As tags de categoria são renderizadas dinamicamente via JavaScript e usam as cores das Dokis em sequência rotativa.

**Uso no HTML gerado:**
```html
<div class="mod-categories">
  <span class="category-tag">Drama</span>
  <span class="category-tag">Mistério</span>
  <span class="category-tag">Comédia</span>
</div>
```

**CSS aplicado:**
- Tags alternam entre cores das Dokis automaticamente
- Gradientes suaves para cada cor
- Hover com scale e sombra aumentada

---

### 2. Botão de Download

Botão principal de download usando as cores da Monika (verde esmeralda).

```html
<a href="https://..." class="btn-download">⬇ Download</a>
```

**Características:**
- Gradiente verde esmeralda (Monika)
- Efeito de shimmer no hover
- Sombra com cor temática
- Animação suave de elevação

**Cores usadas:**
- Background: `linear-gradient(135deg, var(--monika-primary) 0%, var(--monika-secondary) 100%)`
- Hover: Inverte o gradiente
- Sombra: `rgba(67, 181, 129, 0.3)` (Monika primary com opacidade)

---

### 3. Botão + Info

Botão de informações adicionais usando as cores da Yuri (roxo profundo).

```html
<a href="..." class="info-button">+ info</a>
```

**Características:**
- Gradiente roxo (Yuri)
- Ícone ℹ automático
- Hover com inversão de gradiente

**Cores usadas:**
- Background: `linear-gradient(135deg, var(--yuri-primary) 0%, var(--yuri-secondary) 100%)`

---

### 4. Cards de Mod (Index Page)

Cards de mod na página principal com design responsivo.

```html
<div class="mod-item">
  <div class="mod-image-container">
    <img src="..." class="mod-image" alt="...">
  </div>
  <div class="mod-content">
    <h3 class="mod-title">Título do Mod</h3>
    <p class="mod-description">Descrição...</p>
    <div class="mod-categories">...</div>
    <div class="mod-downloads">...</div>
  </div>
</div>
```

**Características:**
- Hover com elevação
- Imagem com zoom no hover
- Layout flexível e responsivo

---

### 5. Páginas de Mod Individual (Sub Sites)

Layout completo para páginas de mod individuais usando tema DDLC Core.

```html
<main class="mod-page">
  <section class="mod-hero">
    <img src="..." alt="...">
  </section>
  <section class="mod-info">
    <h1>Título do Mod</h1>
    <p class="mod-description">Descrição completa...</p>
    <ul class="mod-meta">
      <li><strong>Duração:</strong> Curta</li>
      <li><strong>Categoria:</strong> Drama</li>
    </ul>
    <a href="..." class="btn-download">⬇ Download</a>
  </section>
</main>
```

**Características:**
- Background gradiente DDLC (preto para cinza)
- Hero image com borda Yuri
- Seção de info com gradiente sutil
- Título com gradiente Monika
- Meta info com fundo Yuri translúcido

---

## 🔗 Uso no Sistema de Metadados

O sistema de cores se integra com o sistema de metadados JSON (`system/data/Sites_v2.json`) através do JavaScript (`system/js/index.js`).

### Renderização Dinâmica

As categorias do JSON são automaticamente convertidas em tags visuais:

```json
{
  "category": ["Drama", "Mistério", "Comédia"]
}
```

```javascript
// Em index.js - createItemTemplate()
const categoriesHtml = mod.category && mod.category.length > 0
  ? mod.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
  : '';
```

As tags são automaticamente coloridas em sequência usando as cores das Dokis.

---

## 💡 Exemplos Práticos

### Exemplo 1: Card de Mod na Página Principal

```html
<div class="mod-item">
  <div class="mod-image-container">
    <img src="/system/html/img/mod.jpg" alt="Mod Example" class="mod-image">
  </div>
  <div class="mod-content">
    <h3 class="mod-title">
      <a href="/system/html/Mod-Example.html">Mod Example</a>
    </h3>
    <p class="mod-description">Descrição curta do mod...</p>
    <div class="mod-categories">
      <span class="category-tag">Drama</span>
      <span class="category-tag">Mistério</span>
    </div>
    <ul class="mod-info">
      <li>Duração: Curta</li>
      <li>Status: Ativo</li>
    </ul>
    <div class="mod-downloads">
      <a href="..." class="download-link">PC</a>
    </div>
    <a href="/system/html/Mod-Example.html" class="info-button">+ info</a>
  </div>
</div>
```

---

### Exemplo 2: Página Individual de Mod

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <link rel="stylesheet" href="../../system/css/sub_sites.css">
</head>
<body>
  <main class="mod-page">
    <section class="mod-hero">
      <img src="img/mod-hero.jpg" alt="Mod Hero">
    </section>
    
    <section class="mod-info">
      <h1>Nome do Mod</h1>
      
      <p class="mod-description">
        Descrição completa do mod aqui...
      </p>
      
      <ul class="mod-meta">
        <li><strong>Duração:</strong> Longa</li>
        <li><strong>Categoria:</strong> Drama, Mistério</li>
        <li><strong>Status:</strong> Ativo</li>
        <li><strong>Desenvolvedor:</strong> Dev Name</li>
        <li><strong>Tradutor:</strong> Translator Name</li>
      </ul>
      
      <a href="download.zip" class="btn-download">⬇ Download</a>
    </section>
  </main>
  
  <footer class="site-footer">
    <p>Projeto comunitário — Mirai Translations®</p>
  </footer>
</body>
</html>
```

---

### Exemplo 3: Uso de Variáveis CSS Custom

```css
/* Criar um componente customizado usando as variáveis */
.meu-componente {
    /* Usar cor Sayori */
    background: var(--sayori-primary);
    color: white;
    border: 2px solid var(--sayori-secondary);
}

.meu-componente:hover {
    background: var(--sayori-secondary);
    box-shadow: 0 4px 15px rgba(255, 143, 163, 0.3);
}

/* Criar um botão temático Yuri */
.btn-yuri-theme {
    background: linear-gradient(135deg, var(--yuri-primary) 0%, var(--yuri-secondary) 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 20px;
    transition: all var(--transition-normal);
}

.btn-yuri-theme:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(123, 74, 142, 0.4);
}
```

---

## ✅ Boas Práticas

### 1. Consistência Visual
- Use a cor da Doki **dominante** do mod (personagem principal)
- Se for um mod multi-personagem, use Monika (verde) como neutro
- Para conteúdo sem personagem específico, use DDLC Core (preto/cinza)

### 2. Hierarquia de Cores
Ordem recomendada:
1. **Monika (verde)** - Ações primárias, downloads, destaques
2. **Yuri (roxo)** - Informações, bordas, elementos estruturais
3. **Sayori (rosa salmão)** - Conteúdo suave, avisos gentis
4. **Natsuki (rosa chiclete)** - Elementos chamativos, comédia
5. **DDLC Core (preto/cinza)** - Backgrounds, estrutura base

### 3. Uso de Variáveis CSS
- ✅ **SEMPRE** use variáveis CSS em vez de valores hardcoded
- ✅ Mantenha consistência usando `var(--nome-da-variavel)`
- ❌ Evite cores hex diretas quando houver variável correspondente

```css
/* ✅ BOM */
.elemento {
    background: var(--monika-primary);
}

/* ❌ EVITAR */
.elemento {
    background: #43B581; /* Use a variável! */
}
```

### 4. Acessibilidade
- Todas as combinações de cores têm contraste adequado (WCAG AA)
- Os componentes incluem estados de foco visível
- Animações respeitam `prefers-reduced-motion`
- Texto sempre legível sobre backgrounds coloridos

### 5. Performance
- Animações usam `transform` e `opacity` (GPU-accelerated)
- Transições suaves com `var(--transition-normal)` (0.3s)
- Imagens com `loading="lazy"` para melhor performance
- Uso eficiente de gradientes CSS

### 6. Responsividade
- Todos os componentes são responsivos
- Espaçamentos usando variáveis (`--spacing-*`)
- Breakpoints definidos para mobile, tablet e desktop
- Tamanhos de fonte usando `clamp()` para escalabilidade

---

## 🎯 Decisões de Design por Caso de Uso

### Botão de Download Principal
- **Cor:** Monika (verde esmeralda) — indica ação positiva e confiável
- **Efeito:** Shimmer no hover para chamar atenção
- **Localização:** Sempre destacado, fácil acesso

### Tags de Categoria
- **Cor:** Rotativa entre todas as Dokis
- **Uso:** Identificação visual rápida do tipo de conteúdo
- **Estilo:** Badges arredondadas com gradiente

### Bordas e Destaques
- **Cor:** Yuri (roxo) — elegante e profissional
- **Uso:** Separadores, bordas de cards, destaques estruturais

### Background Principal
- **Cor:** DDLC Core (preto/cinza) — atmosfera do jogo original
- **Efeito:** Gradiente sutil para profundidade

---

## 📦 Arquivos do Sistema

```
system/
├── css/
│   ├── index.css          ← Estilos da página principal (usa cores Dokis)
│   └── sub_sites.css      ← Estilos das páginas individuais (variáveis + componentes)
├── js/
│   └── index.js          ← Renderização dinâmica com cores integradas
├── data/
│   └── Sites_v2.json     ← Metadados (categorias renderizadas como tags)
└── DOKS/
    └── GUIA-CORES-DOKIS.md  ← Este guia
```

---

## 🔧 Variáveis Adicionais do Sistema

Além das cores das Dokis, o sistema inclui variáveis auxiliares:

### Cores de Texto
- `--text-primary`: `#F2F2F2` - Texto principal
- `--text-secondary`: `#B8B8B8` - Texto secundário
- `--text-muted`: `#888888` - Texto desativado

### Espaçamentos
- `--spacing-xs`: `8px`
- `--spacing-sm`: `16px`
- `--spacing-md`: `24px`
- `--spacing-lg`: `32px`
- `--spacing-xl`: `48px`
- `--spacing-2xl`: `64px`

### Bordas
- `--border-radius-sm`: `8px`
- `--border-radius-md`: `12px`
- `--border-radius-lg`: `20px`
- `--border-radius-full`: `50px`

### Transições
- `--transition-fast`: `0.2s ease`
- `--transition-normal`: `0.3s ease`
- `--transition-slow`: `0.5s ease`

### Sombras
- `--shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.3)`
- `--shadow-md`: `0 4px 15px rgba(0, 0, 0, 0.4)`
- `--shadow-lg`: `0 8px 30px rgba(0, 0, 0, 0.5)`

---

## 🎨 Créditos

Sistema criado com base nas personalidades e cores oficiais de **Doki Doki Literature Club**.

- 💗 Sayori: Rosa salmão — alegria frágil
- 💜 Yuri: Roxo profundo — profundidade e obsessão
- 💖 Natsuki: Rosa chiclete — impacto e contraste
- 💚 Monika: Verde esmeralda — controle e clareza
- 🖤 DDLC: Preto e glitch — o jogo em si
- 🤖 Documentaçao criada por IA (Sou preguiçozo e odeio essa parte)

---

**Just Monika. Just colors. Just perfect.** 💚
