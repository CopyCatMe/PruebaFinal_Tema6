export function quitModal() {
    const modal = document.getElementById('modal');
    const generateBoton = document.getElementById('generate');
    
    generateBoton.addEventListener('click', () => {
        modal.classList.add('modal-quit');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('modal-quit');
        }, 300); 
    });
}
