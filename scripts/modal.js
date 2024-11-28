// import { mostrarCartas } from './main.js';

export function quitModal() {
    const modal = document.getElementById('modal');
    const cards = document.getElementById('cards');
    const generateBoton = document.getElementById('generate');
    
    generateBoton.addEventListener('click', () => {
        modal.classList.add('modal-quit');
        cards.style.display = 'grid';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('modal-quit');
            // mostrarCartas();
        }, 300); 
    });
}

export function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}
