import { quitModal, winModal } from "./modals.js";

// Ejecutar la funcion cuando el DOM este cargado
document.addEventListener("DOMContentLoaded", () => {
  quitModal();

  let cardDuplicates = [];
  let reverseCards = [];
  let allCardsSelected = [];
  let temporizadorId = 0;
  let segundos = 0;
  let minutos = 0;


  const generateButton = document.getElementById("generate");
  const card = document.getElementById("card");
  const temporizadorReloj = document.getElementById("temporizador");

  // --- Funciones principales del juego ---

  // Funcion para mostrar las cartas en reverso
  function mostrarCartasReverso(pair) {
    cambiarBackgroundColor();

    for (let i = 0; i < pair; i++) {
      for (let j = 0; j < 2; j++) {
        const imagen = tratarImagenes(
          `imagenes/Magic-the-gathering-dorso-1.jpg`
        );
        reverseCards.push(imagen);
      }
    }
  }

  // Funcion para mostrar las cartas
  async function mostrarCartas(pair) {
    let cardsAPI = [];
    temporizadorReloj.textContent = "00:00";
    const data = await api(pair);
    const { cards: cartas } = await data.json();
    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach((carta) => cardsAPI.push(carta));

    cardDuplicates = [...cardsAPI, ...cardsAPI];
    cardDuplicates.sort(() => Math.random() - 0.5);

    cardDuplicates.forEach((carta) => {
      tratarImagenes(`${carta.images.png}`);
    });
  }

  // Funcion para voltear las cartas
  function voltearCartas() {
    const cards = document.querySelectorAll(".imagen");
    let cardSelected = [];

    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        if (
          cardSelected.length >= 2 ||
          card.classList.contains("cartaVolteada")
        ) {
          return; // Detiene la ejecución para el caso que no quiero
        }

        card.src = `${cardDuplicates[index].images.png}`;
        card.classList.add("cartaVolteada");
        cardSelected.push({ card, index });

        if (cardSelected.length === 2) {
          setTimeout(() => {
            compararCartas(
              cardSelected[0].card,
              cardSelected[0].index,
              cardSelected[1].card,
              cardSelected[1].index
            );
            cardSelected = [];
          }, 1000);
        }
      });
    });
  }

  // Función para comparar las cartas seleccionadas
  function compararCartas(card1, index1, card2, index2) {
    //console.log(cardDuplicates[index1]);
    //console.log(cardDuplicates[index2]);
    if (cardDuplicates[index1] === cardDuplicates[index2]) {
      // console.log("Pareja encontrada");
      allCardsSelected.push(card1, card2);
      // console.log(reverseCards);
      // console.log(allCardsSelected);
      if (reverseCards.length === allCardsSelected.length) {
        clearInterval(temporizadorId); // Que cierre antes del setTimeout porque si no avanza 1 segundo más
        setTimeout(() => {
          // console.log("Juego terminado");
          terminarJuego();
        }, 1000);
      }
    } else {
      // console.log("No es la carta correcta");
      setTimeout(() => {
        card1.src = `imagenes/Magic-the-gathering-dorso-1.jpg`;
        card2.src = `imagenes/Magic-the-gathering-dorso-1.jpg`;
        card1.classList.remove("cartaVolteada");
        card2.classList.remove("cartaVolteada");
      }, 1000);
    }
  }

  // Funcion para terminar el juego
  function terminarJuego() {
    cardDuplicates = [];
    reverseCards = [];
    allCardsSelected = [];
    winModal();
    const winTime = document.getElementById("winTime");
    winTime.textContent = `¡Ganaste en un tiempo de ${
      minutos < 10 ? "0" + minutos : minutos
    }:${segundos < 10 ? "0" + segundos : segundos}!`;
  }

  // --- Funciones auxiliares ---

  function tratarImagenes(src) {
    const imagen = document.createElement("img");
    imagen.src = src;
    imagen.classList.add("imagen");
    imagen.alt = "carta";
    card.appendChild(imagen);
    return imagen;
  }

  // Funcion para obtener las cartas de la api
  async function api(pair) {
    return fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=" + pair);
  }

  // Funcion para cambiar el color de fondo
  function cambiarBackgroundColor() {
    const body = document.body;
    body.style.transition = "background-color 2s ease-in-out";
    body.classList.add("bodyColor");
    body.classList.remove("bodyBackground");
    setTimeout(() => {
      body.style.transition = "";
    }, 2000);
  }

  // Funcion temporizador
  function temporizador() {
    temporizadorReloj.style.display = "flex";
    temporizadorId = setInterval(() => {
      segundos++;
      if (segundos > 59) {
        segundos = 0;
        minutos++;
      }
      temporizadorReloj.textContent = `${
        minutos < 10 ? "0" + minutos : minutos
      }:${segundos < 10 ? "0" + segundos : segundos}`;
    }, 1000);
    return temporizadorId;
  }

  // --- Eventos y configuración inicial ---

  // Evento para generar las cartas en reverso cuando mostrarCartas se ha visto
  // 3 segundos pero que no se vea mostrarCartas.
  generateButton.addEventListener("click", () => {
    const pair = document.getElementById("pair").value;
    mostrarCartas(pair);
    cambiarBackgroundColor();
    setTimeout(() => {
      segundos = 0;
      minutos = 0;
      document.getElementById("card").innerHTML = "";
      mostrarCartasReverso(pair);
      voltearCartas();
      temporizador();
      // console.log(cardDuplicates);
      // console.log(reverseCards);
    }, 3000);
  });
});