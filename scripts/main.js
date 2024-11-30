import { quitModal, openModal } from './modal.js';

const generateButton = document.getElementById('generate');


export function mostrarCartas() {
    const pair = document.getElementById('pair').value;
    const cards = document.getElementById('cards');

    for (let i = 0; i < pair; i++) {
        const card = document.getElementById('card');

        for (let j = 0; j < 2; j++) {
            const imagen = document.createElement('img');
            imagen.classList.add('imagen');
            imagen.src = `imagenes/Magic-the-gathering-dorso-1.jpg`;
            imagen.alt = 'proof';
            card.appendChild(imagen);
        }

        cards.appendChild(card);
    }
}


// Ejecutar la funcion cuando el DOM este cargado, y poder abrir y cerrar el modal.
document.addEventListener('DOMContentLoaded', quitModal);
document.addEventListener('DOMContentLoaded', openModal);

// Evento para generar las cartas.
generateButton.addEventListener('click', mostrarCartas);

  