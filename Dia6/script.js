
const ELEMENTS = ['Fuego', 'Aire', 'Agua', 'Tierra'];
const CARDS = [
    { value: 1, element: 'Fuego' },
    { value: 2, element: 'Aire' },
    { value: 3, element: 'Agua' },
    { value: 4, element: 'Tierra' },
    { value: 5, element: 'Fuego' },
    { value: 6, element: 'Aire' },
    { value: 7, element: 'Agua' },
    { value: 8, element: 'Tierra' },
    { value: 9, element: 'Fuego' },
    { value: 10, element: 'Aire' }
];

let gameStarted = false;
let player1Deck = [];
let player2Deck = [];
let currentRound = 0;

// Elementos del DOM
const statusMessage = document.getElementById('statusMessage');
const startButton = document.getElementById('startButton');
const playRoundButton = document.getElementById('playRoundButton');
const player1Cards = document.getElementById('player1Cards');
const player2Cards = document.getElementById('player2Cards');
const roundResult = document.getElementById('roundResult');

// Función para mezclar las cartas de forma aleatoria
function shuffleDeck() {
    const shuffledDeck = [...CARDS];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}

// Función para repartir las cartas entre los jugadores
function startGame() {
    player1Deck = shuffleDeck().slice(0, 5);
    player2Deck = shuffleDeck().slice(0, 5);

    updateCardsDisplay(player1Deck, player2Deck);
    playRoundButton.disabled = false;
    startButton.disabled = true;
    statusMessage.textContent = "¡Comienza la batalla!";
    gameStarted = true;
    currentRound = 0;
    roundResult.textContent = '';
}

// Función para actualizar la vista de las cartas
function updateCardsDisplay(player1Deck, player2Deck) {
    player1Cards.innerHTML = '';
    player2Cards.innerHTML = '';

    player1Deck.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = `${card.value} - ${card.element}`;
        cardElement.onclick = () => selectCard(1, card);
        player1Cards.appendChild(cardElement);
    });

    player2Deck.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = `${card.value} - ${card.element}`;
        cardElement.onclick = () => selectCard(2, card);
        player2Cards.appendChild(cardElement);
    });
}

// Función para seleccionar una carta
let selectedCardPlayer1 = null;
let selectedCardPlayer2 = null;

function selectCard(player, card) {
    if (player === 1) {
        selectedCardPlayer1 = card;
    } else {
        selectedCardPlayer2 = card;
    }

    if (selectedCardPlayer1 && selectedCardPlayer2) {
        playRound();
    }
}

// Función para jugar una ronda
function playRound() {
    if (!selectedCardPlayer1 || !selectedCardPlayer2) return;

    const result = determineRoundWinner(selectedCardPlayer1, selectedCardPlayer2);
    updateRoundResult(result);

    // Eliminar las cartas jugadas
    player1Deck = player1Deck.filter(card => card !== selectedCardPlayer1);
    player2Deck = player2Deck.filter(card => card !== selectedCardPlayer2);

    // Actualizar las cartas visibles
    updateCardsDisplay(player1Deck, player2Deck);

    // Limpiar las selecciones
    selectedCardPlayer1 = null;
    selectedCardPlayer2 = null;

    // Revisar si alguien ha ganado
    if (player1Deck.length === 0 || player2Deck.length === 0) {
        playRoundButton.disabled = true;
        statusMessage.textContent = "¡El juego ha terminado!";
    }
}

// Función para determinar el ganador de la ronda
function determineRoundWinner(card1, card2) {
    if (card1.element === card2.element) {
        return card1.value > card2.value ? "Jugador 1" : "Jugador 2";
    }

    const elementRank = {
        Fuego: 'Aire',
        Aire: 'Agua',
        Agua: 'Tierra',
        Tierra: 'Fuego'
    };

    return elementRank[card1.element] === card2.element ? "Jugador 1" : "Jugador 2";
}

// Función para mostrar el resultado de la ronda
function updateRoundResult(winner) {
    roundResult.textContent = `${winner} gana la ronda.`;
}

// Eventos
startButton.addEventListener('click', startGame);
