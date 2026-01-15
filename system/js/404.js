// ===================================
// PÁGINA 404 - LÓGICA MONIKA
// ===================================

// Easter Egg: Variável global
window.monikaWatching = true;

// Easter Egg: Console.log provocativo
console.log("Você realmente achou que isso seria só uma 404?");

// Easter Egg: Função console-only
window.monika_takeControl = () => {
    console.log('%cJust Monika.', 'color:#43B581;font-size:20px;font-weight:bold;');
};

// Easter Egg FINAL: monika_help()
window.monika_help = () => {
    console.clear();
    console.log(
        '%cVocê não deveria estar aqui.\n\nMas já que está...\n\nNem todo erro é um problema.\nAlguns são convites.',
        `
        color: #43B581;
        font-size: 16px;
        font-family: monospace;
        line-height: 1.6;
        `
    );

    console.log(
        '%cDica:\nÀs vezes o caminho não está quebrado.\nVocê só não deveria segui-lo.',
        'color:#9be7c4;font-size:13px'
    );
};

// ===================================
// SISTEMA DE BLOQUEIO MONIKA (COM COOKIES)
// ===================================

// Funções auxiliares para cookies
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Verificar se o usuário está bloqueado
function isUserLocked() {
    const data = localStorage.getItem('monika_lockout');
    if (!data) return false;

    try {
        const parsed = JSON.parse(data);
        const now = Date.now();

        if (now < parsed.until) {
            return parsed;
        } else {
            // Expirou, limpa
            localStorage.removeItem('monika_lockout');
            return false;
        }
    } catch {
        localStorage.removeItem('monika_lockout');
        return false;
    }
}

// Criar o bloqueio por 24h
function lockUserForOneDay(name) {
    const oneDay = 24 * 60 * 60 * 1000;

    const payload = {
        name: name || 'Usuário curioso',
        until: Date.now() + oneDay
    };

    localStorage.setItem('monika_lockout', JSON.stringify(payload));
    
    // Salva o nome no cookie por 30 dias
    if (name && name.trim() !== '') {
        setCookie('monika_name', name.trim(), 30);
    }
}

// Obter nome do usuário do cookie
function getUserName() {
    const cookieName = getCookie('monika_name');
    return cookieName || null;
}

// Mensagem Monika-style se estiver bloqueado
function showLockMessage(lockData) {
    const hoursLeft = Math.ceil((lockData.until - Date.now()) / (1000 * 60 * 60));
    const userName = lockData.name;

    alert(
        `Olá, ${userName}.\n\n` +
        `Você já tentou hoje.\n` +
        `Volte em aproximadamente ${hoursLeft} hora(s).\n\n` +
        `Eu lembro. Sempre lembro.`
    );
}

// Diálogo personalizado quando detecta tentativa errada
function showFailedAttemptDialog() {
    const savedName = getUserName();
    
    if (savedName) {
        // Usa o nome do cookie
        const confirmMessage = `Olá, ${savedName}.\n\n` +
            `Você tentou novamente, não foi?\n` +
            `A sequência estava quase correta... mas não.\n\n` +
            `Quer que eu te bloqueie por 24 horas?\n\n` +
            `(Eu já sei seu nome, mas posso atualizar se quiser.)`;
        
        const shouldLock = confirm(confirmMessage);
        
        if (shouldLock) {
            const newName = prompt(`Seu nome atual é "${savedName}".\n\nQuer mudar? (Deixe em branco para manter.)`) || savedName;
            lockUserForOneDay(newName);
            
            setTimeout(() => {
                const lock = isUserLocked();
                if (lock) {
                    showLockMessage(lock);
                }
            }, 500);
        }
    } else {
        // Primeira vez, pede o nome
        const userName = prompt('Qual é o seu nome?') || 'Usuário curioso';
        lockUserForOneDay(userName);
        
        setTimeout(() => {
            const lock = isUserLocked();
            if (lock) {
                showLockMessage(lock);
            }
        }, 500);
    }
}

// Easter Egg no console se estiver bloqueado
if (isUserLocked()) {
    console.log('%cMonika:', 'color:#43B581;font-weight:bold;', 'Olha só que quem apareceu....');
}

// ===================================
// ANIMAÇÃO DE DIGITAÇÃO TERMINAL
// ===================================

const terminalLines = [
    { id: 'line1', text: '[ SYSTEM STATUS: UNSTABLE ]', delay: 500 },
    { id: 'line2', text: '[ MODULE: MONIKA.exe ]', delay: 2000 },
    { id: 'line3', text: '[ ERROR CODE: 404_REALITY_NOT_FOUND ]', delay: 3500 }
];

function typeWriter(element, text, speed = 50) {
    return new Promise((resolve) => {
        let i = 0;
        element.textContent = '';
        element.style.opacity = '1';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                resolve();
            }
        }, speed);
    });
}

async function initTerminal() {
    for (const line of terminalLines) {
        await new Promise(resolve => setTimeout(resolve, line.delay));
        const element = document.getElementById(line.id);
        if (element) {
            await typeWriter(element, line.text);
        }
    }
}

// ===================================
// CONSOLE DE ERROS
// ===================================

let consolePaused = false;
let consoleInterval = null;

const errorMessages = [
    { text: '[WARN] route "/alguma-coisa" returned null', type: 'warn' },
    { text: '[ERROR] page_object == undefined', type: 'error' },
    { text: '[INFO] trying fallback: monika_control()', type: 'info' },
    { text: '[SUCCESS] user captured', type: 'success' },
    { text: 'Uncaught RealityException: free_will is not defined', type: 'ironic' },
    { text: 'ReferenceError: happiness is not declared', type: 'ironic' },
    { text: 'Segmentation fault (core dumped)', type: 'ironic' },
    { text: '[WARN] route "/esperanca" returned 404', type: 'warn' },
    { text: '[ERROR] file_not_found: reality.sys', type: 'error' },
    { text: '[INFO] executing: monika.takeControl()', type: 'info' }
];

function addLogToConsole(text, type) {
    const consoleLogs = document.getElementById('consoleLogs');
    if (!consoleLogs) return;

    const logEntry = document.createElement('div');
    logEntry.className = `log-entry log-${type}`;
    logEntry.textContent = text;
    
    consoleLogs.appendChild(logEntry);
    
    // Scroll automático
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
}

async function initErrorConsole() {
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    let currentIndex = 0;
    
    const addNextLog = async () => {
        if (consolePaused) {
            return;
        }
        
        if (currentIndex < errorMessages.length) {
            addLogToConsole(errorMessages[currentIndex].text, errorMessages[currentIndex].type);
            currentIndex++;
            
            if (currentIndex < errorMessages.length) {
                consoleInterval = setTimeout(addNextLog, 800);
            }
        }
    };
    
    addNextLog();
}

function pauseConsole() {
    consolePaused = true;
    if (consoleInterval) {
        clearTimeout(consoleInterval);
        consoleInterval = null;
    }
}

// ===================================
// BUGS VISUAIS CONTROLADOS
// ===================================

// Glitch no texto (tremor por 1 frame)
function triggerGlitch(selector) {
    // Valida seletor antes de usar
    if (!selector || selector.trim() === '' || selector === '#') {
        return;
    }
    
    try {
        const element = document.querySelector(selector);
        if (!element) return;
        
        element.classList.add('glitch-text');
        setTimeout(() => {
            element.classList.remove('glitch-text');
        }, 100);
    } catch (e) {
        // Seletor inválido, ignora silenciosamente
        console.warn('Seletor inválido para triggerGlitch:', selector);
    }
}

// Versão segura que aceita elemento diretamente
function triggerGlitchElement(element) {
    if (!element) return;
    element.classList.add('glitch-text');
    setTimeout(() => {
        element.classList.remove('glitch-text');
    }, 100);
}

// Números que mudam (404 → 403 → 500 → ???)
const errorNumbers = ['404', '403', '500', '???', '404'];
let currentNumberIndex = 0;

function shiftNumbers() {
    const errorNumber = document.getElementById('errorNumber');
    if (!errorNumber) return;
    
    currentNumberIndex = (currentNumberIndex + 1) % errorNumbers.length;
    errorNumber.textContent = errorNumbers[currentNumberIndex];
    
    // Efeito de glitch ao mudar (usa versão segura)
    triggerGlitchElement(errorNumber);
}

// Botão que foge do mouse
function initRunawayButton() {
    const button = document.getElementById('resetButton');
    if (!button) return;
    
    let isRunning = false;
    
    button.addEventListener('mouseenter', () => {
        if (isRunning) return;
        isRunning = true;
        
        const runAway = () => {
            const rect = button.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            
            const newX = Math.random() * maxX;
            const newY = Math.random() * maxY;
            
            button.style.position = 'fixed';
            button.style.left = `${newX}px`;
            button.style.top = `${newY}px`;
            button.style.zIndex = '9999';
            
            setTimeout(() => {
                button.style.position = '';
                button.style.left = '';
                button.style.top = '';
                button.style.zIndex = '';
                isRunning = false;
            }, 500);
        };
        
        // Só foge 30% das vezes
        if (Math.random() < 0.3) {
            runAway();
        }
    });
}

// Scroll que engasga
function initStutterScroll() {
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        // 10% de chance de engasgar
        if (Math.random() < 0.1) {
            const stutterAmount = 5;
            window.scrollBy(0, -stutterAmount);
            
            scrollTimeout = setTimeout(() => {
                window.scrollBy(0, stutterAmount);
            }, 50);
        }
        
        lastScrollTop = window.pageYOffset;
    });
}

// Elemento fantasma que aparece sozinho
function initGhostElement() {
    const ghostElement = document.getElementById('ghostElement');
    if (!ghostElement) return;
    
    // Aparece após 8 segundos
    setTimeout(() => {
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * (window.innerHeight - 100);
        
        ghostElement.style.left = `${randomX}px`;
        ghostElement.style.top = `${randomY}px`;
        ghostElement.classList.add('visible');
    }, 8000);
}

// ===================================
// BOTÃO RESETAR ESTADO
// ===================================

function initResetButton() {
    const resetButton = document.getElementById('resetButton');
    if (!resetButton) return;
    
    resetButton.addEventListener('click', () => {
        // Mostra mensagem
        const originalText = resetButton.querySelector('.btn-text').textContent;
        resetButton.querySelector('.btn-text').textContent = 'Brincadeira. Ainda não.';
        resetButton.disabled = true;
        
        // Recarrega após 2 segundos
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
}

// ===================================
// DETECÇÃO DE DEVTOOLS
// ===================================

function detectDevTools() {
    let devToolsOpen = false;
    const threshold = 160;
    
    const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                showDevToolsMessage();
            }
        } else {
            devToolsOpen = false;
        }
    };
    
    // Verifica periodicamente
    setInterval(checkDevTools, 500);
    
    // Verifica também em resize
    window.addEventListener('resize', checkDevTools);
}

function showDevToolsMessage() {
    // Cria mensagem temporária
    const message = document.createElement('div');
    message.textContent = 'DevTools aberto. Curioso… eu gosto disso.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--monika-primary);
        color: var(--ddlc-black);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(67, 181, 129, 0.5);
        animation: fadeIn 0.5s;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 500);
    }, 3000);
}

// ===================================
// BUGS ALEATÓRIOS
// ===================================

function initRandomGlitches() {
    // Glitch no número do erro a cada 5-10 segundos
    setInterval(() => {
        if (Math.random() < 0.3) {
            shiftNumbers();
        }
    }, 5000);
    
    // Glitch em textos aleatórios
    setInterval(() => {
        if (Math.random() < 0.2) {
            const elements = document.querySelectorAll('.terminal-line, .speech-line, .key-text');
            if (elements.length > 0) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                // Usa versão segura que funciona mesmo sem id
                triggerGlitchElement(randomElement);
            }
        }
    }, 8000);
}

// ===================================
// KONAMI CODE EASTER EGG
// ===================================

const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// Sequência "quase correta" (A B ao invés de B A)
const almostKonamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyA', 'KeyB'
];

let konamiSequence = [];
let konamiActivated = false;

function initKonamiCode() {
    
    document.addEventListener('keydown', (e) => {
        if (konamiActivated) return;
        
        // Verifica bloqueio apenas se já estiver bloqueado (não impede tentativa inicial)
        const currentLock = isUserLocked();
        if (currentLock) {
            showLockMessage(currentLock);
            konamiSequence = [];
            return;
        }
        
        konamiSequence.push(e.code);
        
        // Mantém apenas os últimos 10 códigos
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();           
        }
        
        // Verifica se a sequência corresponde
        if (konamiSequence.length === konamiCode.length) {
            // Verifica sequência "quase correta" primeiro (A B)
            let almostMatch = true;
            for (let i = 0; i < almostKonamiCode.length; i++) {
                if (konamiSequence[i] !== almostKonamiCode[i]) {
                    almostMatch = false;
                    break;
                }
            }
            
            if (almostMatch) {
                // Falso positivo elegante - mostra diálogo personalizado
                addLogToConsole('[WARN] Input sequence almost correct… almost.', 'warn');
                
                // Limpa a sequência primeiro
                konamiSequence = [];
                
                // Mostra diálogo personalizado com nome do cookie se existir
                setTimeout(() => {
                    showFailedAttemptDialog();
                }, 300);
                
                return;
            }
            
            // Verifica sequência correta (B A)
            let match = true;
            for (let i = 0; i < konamiCode.length; i++) {
                if (konamiSequence[i] !== konamiCode[i]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                activateKonamiCode();
            }
        }
    });
}

function activateKonamiCode() {
    if (konamiActivated) return;
    konamiActivated = true;
    
    // Glitch forte na tela
    document.body.classList.add('strong-glitch');
    setTimeout(() => {
        document.body.classList.remove('strong-glitch');
    }, 1000);
    
    // Pausa o console
    pauseConsole();
    
    // Adiciona log especial no console
    setTimeout(() => {
        addLogToConsole('[KONAMI] Reality override activated', 'success');
        addLogToConsole('[KONAMI] Monika.confessional_mode = true', 'info');
    }, 500);
    
    // Mostra seção Konami
    setTimeout(() => {
        const konamiSection = document.getElementById('konamiSection');
        if (konamiSection) {
            konamiSection.style.display = 'block';
            konamiSection.classList.add('konami-visible');
        }
        
        // Mostra fala da Monika
        const konamiSpeech = document.getElementById('konamiSpeech');
        if (konamiSpeech) {
            konamiSpeech.style.opacity = '0';
            konamiSpeech.style.animation = 'speechFadeIn 1s forwards';
        }
    }, 1500);
    
    // Toca a música
    const music = document.getElementById('monikaMusic');
    if (music) {
        music.volume = 0.5;
        
        // Garante que o áudio está carregado
        const tryPlay = () => {
            const playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Autoplay funcionou
                    })
                    .catch(error => {
                        // Autoplay foi bloqueado
                        console.log('Autoplay bloqueado. Clique no botão secreto para tocar a música.');
                        // Mostra mensagem visual se o botão já estiver visível
                        const secretButton = document.getElementById('secretButton');
                        if (secretButton) {
                            secretButton.style.animation = 'pulse 1s ease-in-out 3';
                        }
                    });
            }
        };
        
        // Se já está carregado, toca imediatamente
        if (music.readyState >= 2) {
            tryPlay();
        } else {
            // Espera carregar
            music.addEventListener('canplaythrough', tryPlay, { once: true });
            // Fallback: tenta tocar após um tempo mesmo se não carregar completamente
            setTimeout(tryPlay, 1000);
        }
    }
}

function initSecretButton() {
    const secretButton = document.getElementById('secretButton');
    if (!secretButton) return;
    
    secretButton.addEventListener('click', () => {
        const music = document.getElementById('monikaMusic');
        if (music) {
            if (music.paused) {
                const playPromise = music.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            secretButton.querySelector('.btn-text').textContent = '🎵 Pausar Música';
                        })
                        .catch(error => {
                            console.error('Erro ao tocar música:', error);
                            alert('Não foi possível tocar a música. Verifique se o arquivo está acessível.');
                        });
                } else {
                    secretButton.querySelector('.btn-text').textContent = '🎵 Pausar Música';
                }
            } else {
                music.pause();
                secretButton.querySelector('.btn-text').textContent = '🎹 Modo Confessional';
            }
        }
    });
}

// ===================================
// EASTER EGG: CLIQUE IMPOSSÍVEL
// ===================================

let clickCount = 0;
let lastClickTime = 0;
const CLICK_TIMEOUT = 2000; // 2 segundos para resetar contador

function initClickImpossible() {
    const errorNumber = document.getElementById('errorNumber');
    if (!errorNumber) return;
    
    errorNumber.addEventListener('click', () => {
        // Só ativa se o número for exatamente "404"
        if (errorNumber.textContent.trim() !== '404') {
            clickCount = 0;
            return;
        }
        
        const currentTime = Date.now();
        
        // Reset contador se passou muito tempo desde o último clique
        if (currentTime - lastClickTime > CLICK_TIMEOUT) {
            clickCount = 0;
        }
        
        clickCount++;
        lastClickTime = currentTime;
        
        if (clickCount === 7) {
            alert('Você realmente gosta de quebrar coisas, né?');
            clickCount = 0;
        }
    });
}

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicia animações
    initTerminal();
    initErrorConsole();
    
    // Inicia bugs visuais
    initRunawayButton();
    initStutterScroll();
    initGhostElement();
    initRandomGlitches();
    
    // Inicia interações
    initResetButton();
    detectDevTools();
    initKonamiCode();
    initSecretButton();
    initClickImpossible();
    
    // Primeiro glitch no número após 2 segundos
    setTimeout(() => {
        shiftNumbers();
    }, 2000);
});
