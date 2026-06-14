// mecanismo de pesquisa que retorna os resultados da pesquisa por nome do jogo caso aja "#" pesquisa pela tag do jogo

let gamesData = [];

// Carregar dados do JSON
async function loadGamesData() {
  try {
    const response = await fetch('/system/data/Sites_v2.json');
    const data = await response.json();
    gamesData = data['system/html'] || [];
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

// Função de pesquisa
function searchGames(query) {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.trim();
  
  // Verifica se a pesquisa começa com "#" (pesquisa por tags)
  if (searchTerm.startsWith('#')) {
    // Remove o "#" e divide por vírgulas para múltiplas tags
    const tags = searchTerm.substring(1).split(',').map(tag => tag.trim().toLowerCase());
    
    return gamesData.filter(game => {
      // Verifica se o jogo tem todas as tags pesquisadas
      const gameCategories = (game.category || []).map(cat => cat.toLowerCase());
      return tags.every(tag => 
        gameCategories.some(category => category.includes(tag))
      );
    });
  } else {
    // Pesquisa por nome/título
    const searchLower = searchTerm.toLowerCase();
    return gamesData.filter(game => {
      const title = (game.title || '').toLowerCase();
      const description = (game.description?.short || '').toLowerCase();
      return title.includes(searchLower) || description.includes(searchLower);
    });
  }
}

// Função para criar o HTML de um resultado
function createGameCard(game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  
  const imageUrl = game.images?.cover || game.images?.og || '';
  const imagePath = imageUrl.startsWith('http') ? imageUrl : `/${imageUrl}`;
  
  const tags = (game.category || []).map(tag => `<span class="tag">${tag}</span>`).join('');
  
  card.innerHTML = `
    <div class="game-card-content">
      <img src="${imagePath}" alt="${game.title || ''}" class="game-thumbnail" onerror="this.src='system/html/img/default.jpg'">
      <div class="game-info">
        <h3 class="game-title">${game.title || 'Sem título'}</h3>
        <div class="game-tags">${tags}</div>
      </div>
    </div>
  `;
  
  // Adicionar evento de clique para navegar para a página do jogo
  if (game.legacy?.page) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.location.href = `/${game.legacy.page}`;
    });
  }
  
  return card;
}

// Função para remover a div de resultados
function removeResultsContainer(containerId = 'search-results') {
  const container = document.getElementById(containerId);
  if (container) {
    container.remove();
  }
}

// Função para exibir resultados
function displayResults(results, containerId = 'search-results') {
  // Se não houver resultados, remover o container
  if (!results || results.length === 0) {
    removeResultsContainer(containerId);
    return;
  }
  
  let container = document.getElementById(containerId);
  
  // Criar container se não existir
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'search-results-container';
    
    // Inserir após o header ou em outro local apropriado
    const main = document.querySelector('main');
    if (main) {
      main.insertBefore(container, main.firstChild);
    } else {
      document.body.appendChild(container);
    }
  }
  
  // Limpar resultados anteriores e adicionar botão de fechar
  container.innerHTML = '';
  
  // Adicionar botão de fechar
  const closeButton = document.createElement('button');
  closeButton.className = 'close-results-button';
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.setAttribute('aria-label', 'Fechar resultados');
  closeButton.addEventListener('click', () => {
    removeResultsContainer(containerId);
    // Limpar o campo de pesquisa também
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = '';
    }
  });
  container.appendChild(closeButton);
  
  // Criar cards para cada resultado
  results.forEach(game => {
    const card = createGameCard(game);
    container.appendChild(card);
  });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', async () => {
  await loadGamesData();
  
  // Encontrar o formulário de pesquisa
  const searchForm = document.querySelector('.search-container');
  const searchInput = document.querySelector('.search-input');
  
  if (searchForm && searchInput) {
    // Pesquisa ao enviar o formulário
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value;
      if (!query || query.trim() === '') {
        removeResultsContainer();
        return;
      }
      const results = searchGames(query);
      displayResults(results);
    });
    
    // Remover resultados quando o campo estiver limpo
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (!query || query.trim() === '') {
        removeResultsContainer();
      }
    });
    
    // Detectar quando o botão "X" nativo do input search é clicado
    searchInput.addEventListener('search', (e) => {
      const query = e.target.value;
      if (!query || query.trim() === '') {
        removeResultsContainer();
      }
    });
    
    // Também verificar quando o campo perde o foco e está vazio
    searchInput.addEventListener('blur', (e) => {
      const query = e.target.value;
      if (!query || query.trim() === '') {
        removeResultsContainer();
      }
    });
    
    // Pesquisa em tempo real (opcional - descomente se quiser)
    // searchInput.addEventListener('input', (e) => {
    //   const query = e.target.value;
    //   if (query.length >= 2) {
    //     const results = searchGames(query);
    //     displayResults(results);
    //   } else {
    //     removeResultsContainer();
    //   }
    // });
  }
});
