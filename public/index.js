const socket = io();

let username = localStorage.getItem('username') || prompt('Enter your username:');
if (!username) {
    username = 'Anonymous';
}
localStorage.setItem('username', username);

// Notify server of new user connection
socket.emit('user connected', username);

const form = document.createElement('form');
form.id = 'form';
const input = document.createElement('input');
input.id = 'input';
input.setAttribute('autocomplete', 'off');
const button = document.createElement('button');
button.textContent = 'Send';
form.appendChild(input);
form.appendChild(button);

const messages = document.createElement('ul');
messages.id = 'messages';

const changeUsernameBtn = document.createElement('button');
changeUsernameBtn.id = 'change-username';
changeUsernameBtn.textContent = 'Change Username';

document.body.appendChild(messages);
document.body.appendChild(form);
document.body.appendChild(changeUsernameBtn);

const script = document.createElement('script');
script.src = '/socket.io/socket.io.js';
document.head.appendChild(script);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', { username: username, message: input.value });
        input.value = '';
    }
});

socket.on('chat message', (data) => {
    const item = document.createElement('li');
    item.textContent = `${data.timestamp} - ${data.username}: ${data.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('chat history', (history) => {
    history.forEach((data) => {
        const item = document.createElement('li');
        item.textContent = `${data.timestamp} - ${data.username}: ${data.message}`;
        messages.appendChild(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
});

changeUsernameBtn.addEventListener('click', () => {
    username = prompt('Enter your new username:');
    if (username) {
        localStorage.setItem('username', username);
    }
});