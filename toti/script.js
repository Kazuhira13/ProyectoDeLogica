// Selección de elementos del DOM
const celdas = document.querySelectorAll('.cell');
const elementoVictoriasX = document.getElementById('x-wins');
const elementoVictoriasO = document.getElementById('o-wins');
const botonReiniciar = document.getElementById('reset-game');
const botonCambiarBando = document.getElementById('change-side');

// Inicialización de variables
let tablero = Array(9).fill(null); // Representación del tablero
let jugadorActual = 'X'; // Jugador actual
let bandoJugador = 'X'; // Bando del jugador
let puntuaciones = { 'X': 0, 'O': 0 }; // Marcador de puntuaciones

// Combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Manejar el evento de clic en una celda
function manejarClick(e) {
    const indice = e.target.dataset.index; // Índice de la celda
    if (tablero[indice] || verificarGanador()) return; // Si la celda ya está ocupada o hay un ganador, salir
    tablero[indice] = jugadorActual; // Marcar la celda con el jugador actual
    e.target.textContent = jugadorActual; // Actualizar el contenido de la celda
    if (verificarGanador()) { // Verificar si hay un ganador
        puntuaciones[jugadorActual]++; // Incrementar la puntuación del jugador actual
        actualizarMarcador(); // Actualizar el marcador
        alert(`${jugadorActual} ha ganado!`); // Mostrar mensaje de ganador
        return;
    }
    if (!tablero.includes(null)) { // Verificar si hay empate
        alert('¡Empate!');
        return;
    }
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X'; // Cambiar el jugador actual
    if (jugadorActual !== bandoJugador) { // Si es el turno de la máquina
        realizarMovimiento(); // Realizar el movimiento de la máquina
    }
}

// Realizar el movimiento de la máquina
function realizarMovimiento() {
    let celdasDisponibles = tablero.map((celda, indice) => celda === null ? indice : null).filter(val => val !== null); // Obtener celdas disponibles
    let movimientoAleatorio = celdasDisponibles[Math.floor(Math.random() * celdasDisponibles.length)]; // Seleccionar un movimiento aleatorio
    tablero[movimientoAleatorio] = jugadorActual; // Marcar la celda con el jugador actual
    celdas[movimientoAleatorio].textContent = jugadorActual; // Actualizar el contenido de la celda
    if (verificarGanador()) { // Verificar si hay un ganador
        puntuaciones[jugadorActual]++; // Incrementar la puntuación del jugador actual
        actualizarMarcador(); // Actualizar el marcador
        alert(`${jugadorActual} ha ganado!`); // Mostrar mensaje de ganador
        return;
    }
    if (!tablero.includes(null)) { // Verificar si hay empate
        alert('¡Empate!');
        return;
    }
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X'; // Cambiar el jugador actual
}

// Verificar si hay un ganador
function verificarGanador() {
    return combinacionesGanadoras.some(combinacion => {
        const [a, b, c] = combinacion;
        return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
    });
}

// Reiniciar el juego
function reiniciarJuego() {
    tablero = Array(9).fill(null); // Vaciar el tablero
    celdas.forEach(celda => celda.textContent = ''); // Limpiar el contenido de las celdas
    jugadorActual = bandoJugador; // Restablecer el jugador actual
    if (jugadorActual !== bandoJugador) { // Si es el turno de la máquina
        realizarMovimiento(); // Realizar el movimiento de la máquina
    }
}

// Cambiar el bando del jugador
function cambiarBando() {
    bandoJugador = bandoJugador === 'X' ? 'O' : 'X'; // Cambiar el bando del jugador
    reiniciarJuego(); // Reiniciar el juego
}

// Actualizar el marcador
function actualizarMarcador() {
    elementoVictoriasX.textContent = puntuaciones['X']; // Actualizar el marcador de X
    elementoVictoriasO.textContent = puntuaciones['O']; // Actualizar el marcador de O
}

// Añadir los event listeners a las celdas y botones
celdas.forEach(celda => celda.addEventListener('click', manejarClick));
botonReiniciar.addEventListener('click', reiniciarJuego);
botonCambiarBando.addEventListener('click', cambiarBando);

// Iniciar el juego
if (jugadorActual !== bandoJugador) {
    realizarMovimiento();
}
