// Funcionalidade dos botões de navegação (voltar e home)

document.addEventListener('DOMContentLoaded', () => {
  // Botão de voltar - volta para a página anterior
  const backButton = document.querySelector('.back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      // Verifica se há histórico para voltar
      if (window.history.length > 1) {
        window.history.back();
      } else {
        // Se não houver histórico, vai para o index
        window.location.href = '/index.html';
      }
    });
  }

  // Botão de home - vai direto para o index
  const homeButton = document.querySelector('.home-button');
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      window.location.href = '/index.html';
    });
  }
});
