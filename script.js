const apiUrl = 'http://localhost:8080/api/personagens';
const form = document.getElementById('starForm');
const container = document.getElementById('cards-container');

// Carregar personagens ao abrir a página
document.addEventListener('DOMContentLoaded', fetchPersonagens);

// Evento de cadastro
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const personagem = {
        nome: document.getElementById('nome').value,
        ladoDaForca: document.getElementById('lado').value,
        ocupacao: document.getElementById('ocupacao').value
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(personagem)
        });

        if (response.ok) {
            form.reset();
            fetchPersonagens(); // Recarrega a lista
        } else {
            alert('Erro ao cadastrar na galáxia.');
        }
    } catch (error) {
        console.error('Erro de comunicação:', error);
    }
});

// Buscar e Renderizar
async function fetchPersonagens() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderCards(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

function renderCards(personagens) {
    container.innerHTML = ''; // Limpa antes de renderizar

    personagens.forEach(p => {
        // Define a cor da borda baseada na força
        let borderClass = 'border-cinza';
        if (p.ladoDaForca === 'Luz') borderClass = 'border-luz';
        if (p.ladoDaForca === 'Sombrio') borderClass = 'border-sombrio';

        const card = document.createElement('div');
        card.classList.add('card', borderClass);
        
        card.innerHTML = `
            <h3>${p.nome}</h3>
            <p><strong>Lado:</strong> ${p.ladoDaForca}</p>
            <p><strong>Ocupação:</strong> ${p.ocupacao}</p>
        `;
        container.appendChild(card);
    });
}