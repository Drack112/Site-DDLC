/**
 * Sistema de carregamento e renderização dinâmica de dados do Sites_v2.json
 * Estrutura escalonável e otimizada para performance
 */

// Estado global da aplicação
const AppState = {
    data: null,
    loaded: false
  };
  
  /**
   * Carrega os dados do arquivo JSON
   * @returns {Promise<Object>} Os dados carregados
   */
  async function loadData() {
    try {
      const response = await fetch('/system/data/Sites_v2.json');
      
      if (!response.ok) {
        throw new Error(`Erro ao carregar dados: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      AppState.data = data;
      AppState.loaded = true;
      
      return data;
    } catch (error) {
      console.error('Erro ao carregar dados do JSON:', error);
      throw error;
    }
  }
  
  /**
   * Cria o HTML de um item/mod
   * @param {Object} mod - Objeto do mod com todos os dados
   * @returns {HTMLElement} Elemento HTML do item
   */
  function createItemTemplate(mod) {
    const item = document.createElement('div');
    item.className = 'mod-item';
    item.setAttribute('data-id', mod.id);
    item.setAttribute('data-title', mod.title.toLowerCase());
    
    // Imagem de capa
    const imageUrl = mod.images?.og || mod.images?.cover || '';
    const imageSrc = imageUrl.startsWith('http') ? imageUrl : `/${imageUrl}`;
    
    // Categorias
    const categoriesHtml = mod.category && mod.category.length > 0
      ? mod.category.map(cat => `<span class="category-tag">${cat}</span>`).join('')
      : '';
    
    // Downloads
    const downloadsHtml = mod.downloads && mod.downloads.length > 0
      ? mod.downloads.map(download => 
          `<a href="${download.url}" class="download-link" target="_blank" rel="noopener noreferrer">${download.label}</a>`
        ).join('')
      : '';
    
    // Botão + info (redireciona para página legacy)
    const infoButtonHtml = mod.legacy?.page
      ? `<a href="${mod.legacy.page}" class="info-button" target="_blank" rel="noopener noreferrer">+ info</a>`
      : '';
    
    // Informações adicionais
    const infoItems = [];
    if (mod.duration) infoItems.push(`<li>Duração: ${mod.duration}</li>`);
    if (mod.status) infoItems.push(`<li>Status: ${mod.status}</li>`);
    if (mod.developer) infoItems.push(`<li>Desenvolvedor: ${mod.developer}</li>`);
    if (mod.mobile) infoItems.push(`<li>Mobile: ${mod.mobile}</li>`);
    
    const infoHtml = infoItems.length > 0 ? `<ul class="mod-info">${infoItems.join('')}</ul>` : '';
    
    // Título com link (se tiver página legacy)
    const titleHtml = mod.legacy?.page
      ? `<h3 class="mod-title"><a href="${mod.legacy.page}" target="_blank">${mod.title}</a></h3>`
      : `<h3 class="mod-title">${mod.title}</h3>`;
    
    // Descrição curta
    const descriptionHtml = mod.description?.short
      ? `<p class="mod-description">${mod.description.short}</p>`
      : '';
    
    // Template HTML
    item.innerHTML = `
      <div class="mod-image-container">
        ${imageUrl ? `<img src="${imageSrc}" alt="${mod.title}" class="mod-image" loading="lazy">` : ''}
      </div>
      <div class="mod-content">
        ${titleHtml}
        ${descriptionHtml}
        <div class="mod-categories">${categoriesHtml}</div>
        ${infoHtml}
        ${downloadsHtml ? `<div class="mod-downloads">${downloadsHtml}</div>` : ''}
        ${infoButtonHtml}
      </div>
    `;
    
    return item;
  }
  
  /**
   * Renderiza uma lista de itens em uma seção do DOM
   * @param {Array} items - Array de itens para renderizar
   * @param {string} sectionSelector - Seletor CSS da seção onde renderizar
   * @param {Function} itemTemplateFn - Função para criar o template de cada item
   */
  function renderSection(items, sectionSelector, itemTemplateFn = createItemTemplate) {
    const section = document.querySelector(sectionSelector);
    
    if (!section) {
      console.warn(`Seção não encontrada: ${sectionSelector}`);
      return;
    }
    
    if (!items || items.length === 0) {
      section.innerHTML = '<p class="no-items">Nenhum item encontrado.</p>';
      return;
    }
    
    // Usar DocumentFragment para melhor performance
    const fragment = document.createDocumentFragment();
    const container = document.createElement('div');
    container.className = 'items-container';
    
    items.forEach(item => {
      const itemElement = itemTemplateFn(item);
      container.appendChild(itemElement);
    });
    
    fragment.appendChild(container);
    section.innerHTML = '';
    section.appendChild(fragment);
  }
  
  /**
   * Renderiza os mods na seção lista-de-mods
   */
  function renderMods() {
    if (!AppState.loaded || !AppState.data || !AppState.data["system/html"]) {
      console.warn('Dados não carregados ainda');
      return;
    }
    
    renderSection(AppState.data["system/html"], '.lista-de-mods', createItemTemplate);
  }
  
  /**
   * Inicializa a aplicação
   */
  async function init() {
    try {
      // Aguardar o DOM estar pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
      }
      
      // Carregar dados
      await loadData();
      
      // Renderizar mods
      renderMods();
      
    } catch (error) {
      console.error('Erro ao inicializar aplicação:', error);
      const section = document.querySelector('.lista-de-mods');
      if (section) {
        section.innerHTML = '<p class="error-message">Erro ao carregar os dados. Tente recarregar a página.</p>';
      }
    }
  }
  
  // Inicializar quando o script for carregado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }