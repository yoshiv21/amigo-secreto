const nameInput = document.getElementById('nameInput');
const addButton = document.getElementById('addButton');
const sortButton = document.getElementById('sortButton');
const friendList = document.getElementById('friendList');
const resultDiv = document.getElementById('result');

let friends = [];

addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }
    friends.push(name);
    renderFriends();
    nameInput.value = '';
    nameInput.focus();
});

sortButton.addEventListener('click', () => {
    if (friends.length < 2) {
        alert('Debes agregar al menos dos amigos para poder sortear.');
        return;
    }

    sortButton.disabled = true;
    addButton.disabled = true;
    resultDiv.textContent = "Sorteando...";

    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * friends.length);
        resultDiv.textContent = friends[randomIndex];
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        const finalRandomIndex = Math.floor(Math.random() * friends.length);
        const secretFriend = friends[finalRandomIndex];
        resultDiv.textContent = `¡El amigo secreto es: ${secretFriend}! 🎉`;
        
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 }
        });
        
        sortButton.disabled = false;
        addButton.disabled = false;
    }, 3000);
});

nameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addButton.click();
    }
});

function renderFriends() {
    friendList.innerHTML = '';
    friends.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        friendList.appendChild(li);
    });
}