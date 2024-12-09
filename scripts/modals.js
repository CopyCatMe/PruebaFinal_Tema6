// import { mostrarCartas } from './main.js';

const temporizadorReloj = document.getElementById('temporizador');
const generateBoton = document.getElementById('generate');
const modal = document.getElementById('modal');
const cards = document.getElementById('cards');

// Funcion para cerrar el modal
export function quitModal() {
    generateBoton.addEventListener('click', () => {
        modal.classList.add('modal-quit');
        temporizadorReloj.style.display = 'flex';
        cards.style.display = 'flex';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('modal-quit');
            // mostrarCartas();
        }, 300);
    });
}

// Funcion para abrir el modal
export function openModal() {
    modal.style.display = 'flex';
}

// Funcion para que se abra el modal cuando se haya ganado
export function winModal() {
    const winModal = document.getElementById('winModal');
    winModal.style.display = 'flex';
    winModal.style.zIndex = '2';
    const quitBoton = document.getElementById('quit');
    quitBoton.addEventListener('click', () => {
        winModal.style.display = 'none';
        temporizadorReloj.style.display = 'none';
        const card = document.getElementById('card');
        card.innerHTML = '';
        openModal();
    });
}


