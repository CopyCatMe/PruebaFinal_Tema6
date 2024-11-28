import { quitModal, openModal } from './modal.js';

export function mostrarCartas() {
    const pair = document.getElementById('pair').value;
}

// Ejecutar la funcion cuando el DOM este cargado, y poder abrir y cerrar el modal.
document.addEventListener('DOMContentLoaded', quitModal);
document.addEventListener('DOMContentLoaded', openModal);
